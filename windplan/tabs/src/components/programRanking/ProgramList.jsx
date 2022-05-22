import React, { useContext, useEffect, useState } from "react";
import { DbContext } from "../../context/db";

export function ProgramList() {
  const db = useContext(DbContext)
  const [state, setState] = useState([])

  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program')).programs
  
      setState(programs)
    }
    
    loadPrograms();
  }, [db])

  
  if (state.length === 0) {
    return (
      <div>Loading Programs...</div>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
        {
          state.map((program, rank) => (
            <tr key={program.id}>
              <td>{rank + 1}</td>
              <td>{program.name}</td>
            </tr>
          )) 
        }
        </tbody>
      </table>
    </div>
  );
}