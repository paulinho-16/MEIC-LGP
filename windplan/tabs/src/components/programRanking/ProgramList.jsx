import React from "react";

import { programs } from "./MockProjects";

programs.forEach((p) => p["key"] = "" + p["program_id"]);
console.log(programs)

export function ProgramList() {
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
        {programs.map((program, rank) => (
          <tr key={program["key"]}>
            <td>{rank + 1}</td>
            <td>{program["program_name"]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}