import { useContext, useState } from 'react';
import { DbContext } from '../../context/db';
import { Table } from '@fluentui/react-northstar';

export default function ProjectOverview({ overviewType, doc, items, projects, months }) {
  const db = useContext(DbContext)

  var rows=[]

  var programItems=[]
  var programProjects=[]
  var programMonths=[]

  var test=[]

  for(let item of items){
    if(doc.items.includes(item.id)){
        programItems.push(item)
    }
  }

  for(let item of programItems){
    for(let project of projects){
        if(item.projects.includes(project.id)){
            programProjects.push(project)
        }
    }
  }

  var id = 1

  for(let project of programProjects){
    var sum = 0
    for(let month of months){
        if(project.months.includes(month.id)){
            programMonths.push(month)
            var valueParsed = 0
            if (overviewType == "cost"){
                valueParsed = parseFloat(month.cost)
            } else if (overviewType == "capacity"){
                valueParsed = parseFloat(month.demand)
            }
            if (!isNaN(valueParsed)) {
                sum += valueParsed
            }
        }
    }
    rows.push({items:[id, project.name, sum.toFixed(2)]})
    id++
  }
  
  const header={
    items:['ID', 'Name', 'Value'],
  }

  return (
    <div className='overview-section'>
        <h2>{overviewType == 'cost' ?  "Cost Overview" : "Capacity Overview"}</h2>
        <div className='overview-table'>
            <Table header={header} rows={rows} aria-label="Program Cost/Capacity Overview"></Table>
        </div>
        <p></p>
    </div>
  );
}