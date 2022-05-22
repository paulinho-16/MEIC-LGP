import React, { useContext, useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { DbContext } from "../../context/db";

export function StackGraph() {

  const db = useContext(DbContext)
  const [state, setState] = useState([])
  var data=[]

  console.log("here")
  useEffect(() => {
    async function loadPrograms() {
      const programs = (await db.rel.find('program')).programs
      var months=[]
      
      programs.forEach(async (program, i) =>{
 
        var program_months= new Map()
        const newItems = (await db.rel.find('item', program.items)).items

        await newItems.forEach(async (item, i) =>{
          const newProjects = (await db.rel.find('project', item.projects)).projects

          await newProjects.forEach(async (project, i) =>{
            const newMonths = (await db.rel.find('month', project.months)).months

            await newMonths.forEach(async (month, i) =>{
              if(!program_months.has(month["month"]))
              {
                program_months.set(month["month"],month["cost"])
              }
              else program_months.set(month["month"],program_months.get(month["month"])+month["cost"])
            })          
            
          })

        })   
        months.push(program_months)
      })
      setState({
        programs: programs,
        months_costs: months,
      })
    }
    
    loadPrograms();
  }, [db])

  
  
  var months_name=["january","february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  var hours=[];
  for (var i = 0; i < 12; i++) hours[i] = 0;

  if (state.length === 0) {
    return (
      <div>Loading Programs...</div>
    )
  }



  state.programs.forEach((program, i) =>{
    var months=[];
    var costs=[];
 
    if(state.months_costs[i]!==undefined)
    {

      state.months_costs[i].forEach(async (cost, month) =>{
        if(month.toString().split("-")[0]==="2022")
        {
          
          console.log(months_name[parseInt(month.toString().split("-")[1])-1])
          months.push(months_name[parseInt(month.toString().split("-")[1])-1])
          costs.push(cost)  
        }

      })
      data[i]={
        x: months,
        y: costs,
        name: program["name"],
        type: "bar"
      }

    }
 
  });

  //horas 
/*   var k=0;
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
 
  
  return(
  <Plot
        data={data}
        layout={{height:400, barmode:'stack', title: 'Program Costs'}}
      />
  )
}