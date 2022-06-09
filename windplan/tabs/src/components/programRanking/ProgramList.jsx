import React, { useContext } from "react";
import { ExclamationTriangleIcon, Table, Text, Tooltip } from '@fluentui/react-northstar';
import { ProgramsContext } from "../../context/programs";

export function ProgramList({costPerHour}) {
  const programs = useContext(ProgramsContext)

  if (programs.length === 0) {
    return (
      <div>No programs in tool! Please upload data and click the 'Run' button under the Input tab!</div>
    )
  }

  let rows = [];

  const rankComponent = (rank, strategic) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text content={rank} />
      { strategic && <Tooltip trigger={<ExclamationTriangleIcon />} content="Strategic" style={{ marginLeft: "0.5em" }} />}
    </div>
  )

  programs.sort((a, b) => b["score"] - a["score"]).forEach((program, i) => {
    const cost = program["cost"] + program["hours"] * costPerHour
    rows.push({ 
      key: i + 1, 
      items: [
        rankComponent(i + 1, program["strategic"]),
        program["name"],
        program["score"].toFixed(2),
        cost.toFixed(2)
      ]
    })
  });

  const header = {
    items: ['Rank', 'Name', 'Score', 'Cost'],
  }

  return (
    <Table header={header} rows={rows} aria-label="Program Ranking" />
  );
}