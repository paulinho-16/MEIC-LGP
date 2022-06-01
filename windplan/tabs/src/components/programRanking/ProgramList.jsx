import React, { useContext, useEffect, useState } from "react";
import { DbContext } from "../../context/db";
import { Table } from '@fluentui/react-northstar';

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
  var ranking=0;
  var table=[];

  state.forEach((p) =>{
    p["key"] = "" + p["program_id"];
    table[ranking]={key: ranking+1, items: [ranking+1,p["name"]]};
    ranking=ranking+1;
  });

  
  const header={
    items:['Rank', 'Name'],
  }
  const rows=table
  return (
    <Table header={header} rows={rows} aria-label="Program Ranking"></Table>
  );
}