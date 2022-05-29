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
};

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

async function processRows(db, rows) {
  const properties = Object.keys(rows[0]);

  if (equals(properties, rowProperties.project_dem_book_cost))
    projectDemBookCost(db, rows);
  else if (equals(properties, rowProperties.timelines)) timelines(db, rows);
}

async function projectDemBookCost(db, rows) {
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

    const monthId = row["Year Month"] + "-" + row["Project Number"];

    projects[row["Project Number"]].months.add(monthId);

    return db.rel.save("month", {
      id: monthId,
      month: row["Year Month"],
      demand: row["Demand_LGP"],
      booking: row["Booking_LGP"],
      cost: row["Cost_LGP"],
    });
  });

  // Add Programs to DB
  console.log(programs);
  Object.values(programs).forEach((program) =>
    db.rel.save("program", { ...program, items: [...program.items] })
  );

  // Add Items to DB
  console.log(items);
  Object.values(items).forEach((item) =>
    db.rel.save("item", { ...item, projects: [...item.projects] })
  );

  // Add projects to DB
  console.log(projects);
  Object.values(projects).forEach((project) =>
    db.rel.save("project", { ...project, months: [...project.months] })
  );

  console.log(promises);
  await Promise.all(promises);

  return;
}

async function timelines(db, rows) {
  let programs = new Set();
  const programsData = (await db.rel.find("program")).programs;
  programsData.forEach((program) => programs.add(program.name));

  let items = {};
  const itemsData = (await db.rel.find("item")).items;
  console.log(itemsData)
  itemsData.forEach((item) => {
    items[item.id] = {
      name: item.name,
      projects: [...item.projects],
      id: item.id,
    };
  });

  rows.forEach((row) => {
    const programName = row["Program Name"];
    const itemNumber = row["Item Number"];

    if (
      !programs.has(programName) ||
      !items.hasOwnProperty(itemNumber)
    )
      return;

    items[itemNumber].phase = row["Phase"];
    items[itemNumber].milestoneName = row["Milestone Name"];
    items[itemNumber].milestoneSearchField = row["Milestone Search Field"];
    items[itemNumber].plannedFinishedDate = row["Current Planned Finish Date"];
    items[itemNumber].actualFinishedDate = row["Actual Finish Date"];
  });

  // Add Items to DB
  console.log(items);

  console.log("first", await db.rel.find("program"));

  const itemPromises = Object.values(items).map((item) =>
    db.rel.save("item", { ...item, projects: [...item.projects] })
  );

  await Promise.all(itemPromises);
  console.log("second", await db.rel.find("program"));
  return;
}

async function processExcel(db, data) {
  const workbook = read(data, { type: "binary" });
  const firstSheet = workbook.SheetNames[0];
  const excelRows = utils.sheet_to_row_object_array(
    workbook.Sheets[firstSheet],
    { defval: null }
  );

  await processRows(db, excelRows);

  console.log("Finished parsing!");
}

export async function parseFile(db, file) {
  if (typeof FileReader !== "undefined") {
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
