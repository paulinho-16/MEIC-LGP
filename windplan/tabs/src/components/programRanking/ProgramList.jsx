import React from "react";
import { useAllDocs } from 'react-pouchdb';

export function ProgramList() {
  const programs = useAllDocs({
    include_docs: true,
  });

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
          <tr key={program.id}>
            <td>{rank + 1}</td>
            <td>{program.doc.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}