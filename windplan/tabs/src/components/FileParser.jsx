import { read, utils } from "xlsx";

const rowProperties = {
  project_dem_book_cost: [
    "Program Name",
    "Item Name",
    "Item Number",
    "Project Name",
    "Project Number",
    "Demand_LGP",
    "Booking_LGP",
    "Year Month",
    "Cost_LGP",
  ],
  timelines: [
    "Program Name",
    "Item Name",
    "Item Number",
    "Phase",
    "Milestone Name",
    "Milestone Search Field",
    "Current Planned Finish Date",
    "Actual Finish Date",
  ],
  rbs_ava_book_dem: [
    "Department Structure - RBS2",
    "Department Structure - RBS3",
    "Department Structure - RBS4",
    "Department Structure - RBS5",
    "Availability_LGP",
    "Year Month",
  ],
  rbs_book_dem: [
    "Department Structure - RBS2",
    "Department Structure - RBS3",
    "Department Structure - RBS4",
    "Department Structure - RBS5",
    "Department Structure - RBS6",
    "Department Structure - RBS7",
    "Department Structure - RBS8",
    "Program Name",
    "Item Name",
    "Item Number",
    "Project Name",
    "Project Number",
    "Demand_LGP",
    "Booking_LGP",
    "Year Month",
  ],
};

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

async function processRows(db, rows, progress, setProgress) {
  const properties = Object.keys(rows[0]);

  if (equals(properties, rowProperties.project_dem_book_cost))
    projectDemBookCost(db, rows, progress, setProgress);
  else if (equals(properties, rowProperties.timelines))
    timelines(db, rows, progress, setProgress);
  else if (equals(properties, rowProperties.rbs_ava_book_dem))
    rbsAvaBookDem(db, rows, progress, setProgress);
  else if (equals(properties, rowProperties.rbs_book_dem))
    rbsDemBook(db, rows, progress, setProgress);
}

async function promisesProgress(promises, progress, setProgress) {
  await Promise.all(
    promises.map((promise) => {
      return Promise.resolve(promise).then(() => setProgress((++progress / promises.length) * 100));
    })
  );
  setProgress(0);
}

async function projectDemBookCost(db, rows, progress, setProgress) {
  let programs = {};
  let items = {};
  let projects = {};

  let promises = rows.map((row) => {
    if (!programs.hasOwnProperty(row["Program Name"])) {
      programs[row["Program Name"]] = {
        id: Object.keys(programs).length + 1,
        name: row["Program Name"],
        items: new Set(),
      };
    }

    programs[row["Program Name"]].items.add(row["Item Number"]);

    if (!items.hasOwnProperty(row["Item Number"])) {
      items[row["Item Number"]] = {
        id: row["Item Number"],
        name: row["Item Name"],
        projects: new Set(),
      };
    }

    items[row["Item Number"]].projects.add(row["Project Number"]);

    if (!projects.hasOwnProperty(row["Project Number"])) {
      projects[row["Project Number"]] = {
        id: row["Project Number"],
        name: row["Project Name"],
        months: new Set(),
      };
    }

    const monthId =
      row["Year Month"] +
      "-" +
      row["Project Number"] +
      "-" +
      row["Item Number"];

    projects[row["Project Number"]].months.add(monthId);

    return db.rel.save("month", {
      id: monthId,
      name: row["Year Month"],
      demand: row["Demand_LGP"],
      booking: row["Booking_LGP"],
      cost: row["Cost_LGP"],
    });
  });

  // Add Programs to DB
  console.log(programs);
  Object.values(programs).forEach((program) =>
    promises.push(
      db.rel.save("program", { ...program, items: [...program.items] })
    )
  );

  // Add Items to DB
  console.log(items);
  Object.values(items).forEach((item) =>
    promises.push(
      db.rel.save("item", { ...item, projects: [...item.projects] })
    )
  );

  // Add projects to DB
  console.log(projects);
  Object.values(projects).forEach((project) =>
    promises.push(
      db.rel.save("project", { ...project, months: [...project.months] })
    )
  );

  promisesProgress(promises, progress, setProgress);
}

async function timelines(db, rows, progress, setProgress) {
  let programs = new Set();
  const programsData = (await db.rel.find("program")).programs;
  programsData.forEach((program) => programs.add(program.name));

  let items = {};
  const itemsData = (await db.rel.find("item")).items;
  console.log(itemsData);
  itemsData.forEach((item) => {
    items[item.id] = {
      name: item.name,
      projects: [...item.projects],
      id: item.id,
      milestones: [],
      rev: item.rev,
    };
  });

  const milestonesPromises = rows
    .filter((row) => programs.has(row["Program Name"]) && items.hasOwnProperty(row["Item Number"]))
    .map((row) => {
      const id = row["Item Number"] + "-" + row["Milestone Name"]

      const milestone = {
        id: id,
        name: row["Milestone Name"],
        phase: row["Phase"],
        searchField: row["Milestone Search Field"],
        plannedFinishedDate: row["Current Planned Finish Date"],
        actualFinishedDate: row["Actual Finish Date"],
      }

      items[row["Item Number"]].milestones.push(id);

      return db.rel.save('milestone', milestone)
    });

  const itemsPromises = Object.values(items).map((item) =>
    db.rel.save("item", {
      ...item,
      projects: [...item.projects],
      milestones: [...item.milestones],
    })
  )

  promisesProgress([...milestonesPromises, ...itemsPromises], progress, setProgress);
}

let addTeam = (teams, name, parentTeam = null) => {
  if (!teams.hasOwnProperty(name)) {
    let teamId = "team" + Object.keys(teams).length;

    teams[name] = {
      id: teamId,
      name: name,
      subTeams: [],
      months: [],
      projects: [],
    };

    if (parentTeam) teams[parentTeam].subTeams.push(teamId);
  }
};

async function rbsAvaBookDem(db, rows, progress, setProgress) {
  let teams = {};

  let months = rows.map((row) => {
    let teamName;

    // RBS5 Team
    if (!row["Department Structure - RBS5"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS5"] + "-RBS5";
      addTeam(teams, teamName, row["Department Structure - RBS4"] + "-RBS4");
    }
    // RBS4 Team
    else if (!row["Department Structure - RBS4"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS4"] + "-RBS4";
      addTeam(teams, teamName, row["Department Structure - RBS3"] + "-RBS3");
    }
    // RBS3 Team
    else if (!row["Department Structure - RBS3"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS3"] + "-RBS3";
      addTeam(teams, teamName, row["Department Structure - RBS2"] + "-RBS2");
    }
    // RBS2 Team
    else {
      teamName = row["Department Structure - RBS2"] + "-RBS2";
      addTeam(teams, teamName);
    }

    const monthId = row["Year Month"] + "-" + teams[teamName].id;

    teams[teamName].months.push(monthId);

    return {
      id: monthId,
      name: row["Year Month"],
      availability: row["Availability_LGP"],
    };
  });

  let promises = Object.values(teams).map((team) => {
    return db.rel.save("team", team);
  });
  months.forEach((month) => {
    promises.push(db.rel.save("month", month));
  });
  promisesProgress(promises, progress, setProgress);
}

async function rbsDemBook(db, rows, progress, setProgress) {
  const teamsData = (await db.rel.find("team")).teams;

  const teams = {};
  teamsData.forEach((team) => (teams[team.name] = { ...team }));
  console.log(teams);

  rows.forEach((row) => {
    let teamName;

    // RBS7 & 8 always match regex, starts in RBS6
    if (!row["Department Structure - RBS6"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS6"] + "-RBS6";
      if (!teams.hasOwnProperty(teamName)) {
        addTeam(teams, teamName, row["Department Structure - RBS5"] + "-RBS5");
      }

      // all bellow have been created in previous file upload
    } else if (!row["Department Structure - RBS5"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS5"] + "-RBS5";
    } else if (!row["Department Structure - RBS4"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS4"] + "-RBS4";
    } else if (!row["Department Structure - RBS3"].match(/^\((.|\n)+\)$/)) {
      teamName = row["Department Structure - RBS3"] + "-RBS3";
    } else {
      teamName = row["Department Structure - RBS2"] + "-RBS2";
    }

    if (teams.hasOwnProperty(teamName)) {
      teams[teamName].projects.push(row["Project Number"]);
    }
  });

  let teamsPromises = Object.keys(teams).map((key) => {
    return db.rel.save("team", teams[key]);
  });

  promisesProgress(teamsPromises, progress, setProgress);

  console.log("Parsed teams and projects association!");
}

async function processExcel(db, data, progress, setProgress) {
  const workbook = read(data, { type: "binary" });
  const firstSheet = workbook.SheetNames[0];
  const excelRows = utils.sheet_to_row_object_array(
    workbook.Sheets[firstSheet],
    { defval: null, raw: false }
  );

  await processRows(db, excelRows, progress, setProgress);

  console.log("Finished parsing!");
}

export async function parseFile(db, file, progress, setProgress) {
  if (typeof FileReader !== "undefined") {
    const reader = new FileReader();

    if (reader.readAsBinaryString) {
      reader.onload = (e) => {
        // Start the loading screen
        setProgress(1);      
        processExcel(db, reader.result, progress, setProgress);
      };

      reader.readAsBinaryString(file);
    }
  } else {
    console.log("This browser does not support HTML5.");
  }
}
