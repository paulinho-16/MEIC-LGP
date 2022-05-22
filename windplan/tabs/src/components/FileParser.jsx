import { read, utils } from "xlsx";

async function processRows(db, rows) {
  let programs = {}
  let items = {}
  let projects = {}

  let promises = rows.map(row => {
    if (!programs.hasOwnProperty(row["Program Name"])) {
      programs[row["Program Name"]] = {
        id: Object.keys(programs).length + 1,
        name: row["Program Name"],
        items: new Set()
      }
    }

    programs[row["Program Name"]].items.add(row["Item Number"])

    if (!items.hasOwnProperty(row["Item Number"])) {
      items[row["Item Number"]] = {
        id: row["Item Number"],
        name: row["Item Name"],
        projects: new Set()
      }
    }

    items[row["Item Number"]].projects.add(row["Project Number"])

    if (!projects.hasOwnProperty(row["Project Number"])) {
      projects[row["Project Number"]] = {
        id: row["Project Number"],
        name: row["Project Name"],
        months: new Set()
      }
    }

    const monthId = row["Year Month"] + "-" + row["Project Number"]

    projects[row["Project Number"]].months.add(monthId)

    return db.rel.save('month', {
      id: monthId,
      month: row["Year Month"],
      demand: row["Demand_LGP"],
      booking: row["Booking_LGP"],
      cost: row["Cost_LGP"],
    })
  })

  // Add Programs to DB
  console.log(programs)
  Object.values(programs).forEach(program => db.rel.save('program', {...program, items: [...program.items]}))

  // Add Items to DB
  console.log(items)
  Object.values(items).forEach(item => db.rel.save('item', {...item, projects: [...item.projects]}))

  // Add projects to DB
  console.log(projects)
  Object.values(projects).forEach(project => db.rel.save('project', {...project, months: [...project.months]}))

  console.log(promises)
  await Promise.all(promises)

  return
}

async function processExcel(db, data) {
  const workbook = read(data, {type: 'binary'});
  const firstSheet = workbook.SheetNames[0];
  const excelRows = utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
  
  await processRows(db, excelRows)

  console.log("Finished parsing!")
}

export async function parseFile(db, file) {
  if (typeof (FileReader) !== 'undefined') {
    const reader = new FileReader();

    if (reader.readAsBinaryString) {
      reader.onload = (e) => {
        processExcel(db, reader.result);
      };

      reader.readAsBinaryString(file);
    }

  } else {
    console.log("This browser does not support HTML5.");
  }
}