import React, { useContext, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { DbContext } from "../../context/db";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export function StackGraph() {
  var data = []
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
      let months_years = []
      for (let program of programs) {
        const items = (await db.rel.find('item', program.items)).items

        let program_months = []

        for (let item of items) {
          const projects = (await db.rel.find('project', item.projects)).projects

          for (let project of projects) {
            const months = (await db.rel.find('month', project.months)).months

            months.forEach((month) => {
              let year_parsed = parseInt(month["month"].split("-")[0])
              let month_parsed = parseInt(month["month"].split("-")[1])
              program_years.push(year_parsed)

              if(program_months[year_parsed]===undefined)
                program_months[year_parsed]=[]
              if(program_months[year_parsed][month_parsed]===undefined)
                program_months[year_parsed][month_parsed]=0
              program_months[year_parsed][month_parsed]=program_months[year_parsed][month_parsed]+month["cost"]
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

  
  let months_name = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  var costs_name = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  if (state.programs.length === 0) {
    return (
      <div>Loading Programs...</div>
    )
  }

  
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
     
      state.months_costs[i].forEach((month, year) => {
      
        month.forEach((cost, index) => {
          if(months[year]===undefined)
            months[year]=[]

          months[year].push(months_name[index])
          
          if(costs[year]===undefined)
            costs[year]=[]

          costs[year].push(cost)
        })
      })
      data.push({
        x: months[state.years[0]],
        y: costs[state.years[0]],
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

/* function changeYear(a)
{
  data = []
  data.push({
    x: months_name,
    y: costs_name,
    name: "",
    type: "bar"
  })

  console.log("loading")
  state.programs.forEach((program, i) => {
    let months = [];
    let costs = [];

    if (state.months_costs[i] !== undefined) {
     
      state.months_costs[i].forEach((month, year) => {
      
        month.forEach((cost, index) => {
          if(months[year]===undefined)
            months[year]=[]

          months[year].push(months_name[index])
          
          if(costs[year]===undefined)
            costs[year]=[]

          costs[year].push(cost)
        })
      })
      data.push({
        x: months[state.years[a.value]],
        y: costs[state.years[a.value]],
        name: program["name"],
        type: "bar"
      })

    }
  });

  console.log("done")

} */

  return (
    <div>

      <Dropdown options={state.years}  /* onChange={changeYear} */  value={state.years[0].toString()} placeholder="Select an option" />
      <Plot
        data={data}
        layout={{ height: 400, barmode: 'stack', title: 'Program Costs' }}
      />
    </div>

  )
}