import React from "react";
import { useFind } from 'react-pouchdb';

export function ProgramList() {
  const programs = useFind({
    selector: {},
  });

  programs.forEach((p) => p["key"] = "" + p["program_id"]);
  console.log(programs);

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
          <tr key={program._id}>
            <td>{rank + 1}</td>
            <td>{program.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}