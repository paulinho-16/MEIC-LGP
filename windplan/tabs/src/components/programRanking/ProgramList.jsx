import React, { useContext } from "react";
import { Table } from '@fluentui/react-northstar';
import { ProgramsContext } from "../../context/programs";

export function ProgramList({costPerHour}) {
  const programs = useContext(ProgramsContext)

  if (programs.length === 0) {
    return (
<div>No programs in tool! Please upload data and click the 'Apply Changes' button on the navbar!</div>    )
  }

  let rows = [];

  programs.sort((a, b) => b["score"] - a["score"]).forEach((program, i) => {
    const cost = program["cost"] + program["hours"] * costPerHour
    rows.push({ key: i + 1, items: [i + 1, program["name"], program["score"].toFixed(2), cost.toFixed(2)] })
  });

  const header = {
    items: ['Rank', 'Name', 'Score', 'Cost'],
  }

  return (
    <Table header={header} rows={rows} aria-label="Program Ranking" />
  );
}