import React, { createContext, useState } from "react";

const ProgramsContext = createContext();

const ProgramsDispatchContext = createContext();

function ProgramsProvider({ children }) {
  const [programs, setPrograms] = useState([]);

  return (
    <ProgramsContext.Provider value={programs}>
      <ProgramsDispatchContext.Provider value={setPrograms}>
        {children}
      </ProgramsDispatchContext.Provider>
    </ProgramsContext.Provider>
  );
}

export { ProgramsProvider, ProgramsContext, ProgramsDispatchContext };
