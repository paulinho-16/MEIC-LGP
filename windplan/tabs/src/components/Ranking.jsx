
async function aggregateProgramData(db) {
	let programs = []
	let programData = (await db.rel.find('program', 1))
	let id = 1;

	while (programData.programs.length !== 0) {
		// Cost and Hours
		let cost = 0, hours = 0

		programData.months.forEach((month) => {
			cost += month["cost"] ? parseFloat(month["cost"]) : 0

			if (month["booking"]) hours += parseFloat(month["booking"])
			else if (month["demand"]) hours += parseFloat(month["demand"])
		})

		// Save parsed program
		const program = { ...programData.programs[0], cost, hours }

		// Milestones
		if (programData["milestones"]) {

			// Items that contain WTG or Onshore
			const validItems = programData.items.filter(item => ["wtg", "onshore"].some(word => item.name.toLowerCase().includes(word)))

			// Valid Milestones
			const validMilestones = []
			validItems.forEach(item => validMilestones.push(...item.milestones))

			const finishedMilestones = programData["milestones"]
				.filter(milestone => validMilestones.includes(milestone["id"]))
				.filter(milestone => milestone["actualFinishedDate"] !== null)
				.filter(milestone => milestone["searchField"] === "GATE")
				.sort((a, b) => new Date(b["actualFinishedDate"]) - new Date(a["actualFinishedDate"]))
				.map(milestone => milestone.name)

			if (finishedMilestones[0]) {
				const { groups: { gate } } = /(Gate |Project |^)(?<gate>\d|Mandate|Appraisal)/.exec(finishedMilestones[0])
				program["gate"] = gate
				programs.push(program)
			}
		}

		programData = (await db.rel.find('program', ++id))
	}

	return programs
}

function calculateEffort(settings, hours, cost) {
	let hoursRating = 0, costRating = 0

	// Hours in thousands
	const kHours = hours / 1000.0
	// Hours Rating
	if (kHours > 2000) hoursRating = 7
	else if (kHours > 1000) hoursRating = 6
	else if (kHours > 500) hoursRating = 5
	else if (kHours > 250) hoursRating = 4
	else if (kHours > 100) hoursRating = 3
	else if (kHours > 50) hoursRating = 2
	else if (kHours > 0) hoursRating = 1

	// Cost in millions
	const mCost = cost / 1000000.0
	// Hours Rating
	if (mCost > 200) costRating = 7
	else if (mCost > 100) costRating = 6
	else if (mCost > 50) costRating = 5
	else if (mCost > 25) costRating = 4
	else if (mCost > 10) costRating = 3
	else if (mCost > 5) costRating = 2
	else if (mCost > 0) costRating = 1

	return { 
		effortRatings: { hoursRating, costRating },
		effort: settings.VPS_HOURS * hoursRating + settings.RD_COST * costRating
	}
}

function calculateValue(settings, yVolume, cmNew, cmUpside) {
	let yVolumeRating = 0, cmNewRating = 0, cmUpsideRating = 0

	if (!yVolume || !cmNew || !cmUpside) {
		console.log("Missing external factors for formula!")
		return { 
			valueRatings: { yVolumeRating, cmNewRating, cmUpsideRating },
			value: 1
		}
	}

	// Year Volume in MW
	if (yVolume > 3500) yVolumeRating = 5
	else if (yVolume > 2000) yVolumeRating = 4
	else if (yVolume > 1000) yVolumeRating = 3
	else if (yVolume > 500) yVolumeRating = 2
	else if (yVolume > 0) yVolumeRating = 1

	// CM New Volume Percentage (%)
	if (cmNew > 22) cmNewRating = 5
	else if (cmNew > 20) cmNewRating = 4
	else if (cmNew > 18) cmNewRating = 3
	else if (cmNew > 15) cmNewRating = 2
	else if (cmNew > 0) cmNewRating = 1

	// CM Upside Percentage (%)
	if (cmUpside > 5) cmUpsideRating = 5
	else if (cmUpside > 2.5) cmUpsideRating = 4
	else if (cmUpside > 1) cmUpsideRating = 3
	else if (cmUpside > 0.5) cmUpsideRating = 2
	else if (cmUpside > 0) cmUpsideRating = 1

	return { 
		valueRatings: { yVolumeRating, cmNewRating, cmUpsideRating },
		value: yVolumeRating * (settings.CM_WEIGHT * cmNewRating + cmUpsideRating)
	}
}

function calculateGate(gate) {
	let gateRating = 0

	if (!gate) {
		console.log("Missing Gate!")
		return gateRating
	}

	if (gate === "Appraisal") gateRating = 1
	else if (gate === "Mandate") gateRating = 1.5
	else if (parseInt(gate) === 1) gateRating = 2
	else if (parseInt(gate) === 2) gateRating = 5
	else if (parseInt(gate) === 3) gateRating = 6
	else if (parseInt(gate) === 4) gateRating = 7
	else if (parseInt(gate) >= 5) gateRating = 10

	return gateRating
}

function calculatePLPeriod(plPeriod) {
	let plPeriodRating = 0

	if (!plPeriod) {
		console.log("Missing P&L Period!")
		return plPeriodRating
	}

	const currentYear = new Date().getFullYear()
	plPeriod = Math.round(plPeriod)

	if (plPeriod === currentYear + 1) plPeriodRating = 10
	else if (plPeriod === currentYear + 2) plPeriodRating = 8
	else if (plPeriod === currentYear + 3) plPeriodRating = 6
	else if (plPeriod === currentYear + 4) plPeriodRating = 4
	else if (plPeriod === currentYear + 5) plPeriodRating = 2
	else if (plPeriod === currentYear + 6) plPeriodRating = 1

	return plPeriodRating
}

function rankPrograms(settings, programs) {

	programs = programs.map(program => {

		const { effortRatings, effort } = calculateEffort(settings, program["hours"], program["cost"])
		const { valueRatings, value } = calculateValue(settings, program["yearVolume"], program["cmNew"], program["cmUpside"])
		const gateRating = calculateGate(program["gate"])
		const plPeriodRating = calculatePLPeriod(program["plPeriod"])

		const score = settings.VALUE_EFFORT * (value / effort) + settings.GATE * gateRating + settings.PL_PERIOD * plPeriodRating

		return { ...program, effort, value, score, ratings: { ...effortRatings, ...valueRatings, gateRating, plPeriodRating } }

	})
	
	return programs
}

export { aggregateProgramData, rankPrograms }