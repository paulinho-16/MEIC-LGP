import React, { createContext, useState } from "react";

import PouchDb from "pouchdb";
PouchDb.plugin(require('relational-pouch').default)
PouchDb.plugin(require('pouchdb-find').default)

const DbContext = createContext();

const DbDispatchContext = createContext();

const dbSchema = [
  {
    singular: "program", 
    plural: "programs", 
    relations: { 
      items: { hasMany: "item" }
    }
  },
  {
    singular: "item", 
    plural: "items", 
    relations: { 
      program: { belongsTo: "program" },
      projects: { hasMany: "project" }
    }
  },
  {
    singular: "project", 
    plural: "projects", 
    relations: { 
      item: { belongsTo: "item" },
      months: { hasMany: "month" }
    }
  },
  {
    singular: "team", 
    plural: "teams", 
    relations: { 
      subTeams: { hasMany: "team" },
      months: { hasMany: "month" }
    }
  },
  {
    singular: "month", 
    plural: "months",
    relations: { 
      item: { belongsTo: "item" },
    }
  },
]

function DbProvider({ children }) {
  const database = new PouchDb("WindPlan")
  database.setSchema(dbSchema)

  const [db, setDb] = useState(database);

  const resetDb = () => {
    db.destroy().then(() => {
      const database = new PouchDb("WindPlan")
      database.setSchema(dbSchema)
      setDb(database)
    })
  }

  return (
    <DbContext.Provider value={db}>
      <DbDispatchContext.Provider value={resetDb}>
        {children}
      </DbDispatchContext.Provider>
    </DbContext.Provider>
  );
}

export { DbProvider, DbContext, DbDispatchContext };