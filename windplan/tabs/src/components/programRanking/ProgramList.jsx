import React from "react";
import { useFind } from 'react-pouchdb';
import { Table } from '@fluentui/react-northstar'

export function ProgramList() {
  const programs = useFind({
    selector: {},
  });

  var ranking=0;
  var table=[];

  programs.forEach((p) =>{
    p["key"] = "" + p["program_id"];
    table[ranking]={key: ranking+1, items: [ranking+1,p["name"]]};
    ranking=ranking+1;
  });

  console.log(programs)
  const header={
    items:['Rank', 'Name'],
  }
  const rows=table
  return (
    <Table header={header} rows={rows} aria-label="Program Ranking"></Table>
  );
}