import React, { useContext, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { DbContext } from "../../context/db";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export function StackGraph() {
  const db = useContext(DbContext)
  const [state, setState] = useState({
    programs: [],
    months_costs: [],
    years: []
  })

  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program')).programs
      let months_costs = []
      let program_years = []

      for (let program of programs) {
        const items = (await db.rel.find('item', program.items)).items

        let program_months = new Map()
        for (let item of items) {
          const projects = (await db.rel.find('project', item.projects)).projects

          for (let project of projects) {
            const months = (await db.rel.find('month', project.months)).months

            months.forEach((month) => {
              program_years.push(month["month"].split("-")[0])
              if (!program_months.has(month["month"]))
                program_months.set(month["month"], month["cost"])
              else
                program_months.set(month["month"], program_months.get(month["month"]) + month["cost"])
            })
          }
        }

        months_costs.push(program_months)
      }
      let unique = [...new Set(program_years)]
      setState({
        programs: programs,
        months_costs: months_costs,
        years: unique
      })
    }

    loadPrograms();
  }, [db])

  console.log(state.years)
  let months_name = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  var costs_name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  if (state.programs.length === 0) {
    return (
      <div>Loading Programs...</div>
    )
  }

  let data = []
     data.push({
      x: months_name,
      y: costs_name,
      name: "",
      type: "bar" 
    }) 
  state.programs.forEach((program, i) => {
    let months = [];
    let costs = [];

    if (state.months_costs[i] !== undefined) {

      state.months_costs[i].forEach((cost, month) => {
        if (month.toString().split("-")[0] === state.years[0]) {

          // console.log(months_name[parseInt(month.toString().split("-")[1])-1])
          months.push(months_name[parseInt(month.toString().split("-")[1])-1])
          costs.push(cost)
        }
        

      })

      data.push({
        x: months,
        y: costs,
        name: program["name"],
        type: "bar"
      })

    }
  });

  //horas 
  /*   let k=0;
    while (k<12)
    {
      hours[k]=hours[k]*(1+Math.random()/5)
      k++;
    }
  
    data[state.length]=
    {
      x: months,
      y: hours,
      name: "hours",
      type: "scatter"
    } */

  return (
    <div>

      <Dropdown options={state.years} /* onChange={this._onSelect} */ value={state.years[0]} placeholder="Select an option" />
      <Plot
        data={data}
        layout={{ height: 400, barmode: 'stack', title: 'Program Costs' }}
      />
    </div>

  )
}