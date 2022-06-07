

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import  ProjectTimeline  from './ProjectTimeline';

import { render } from 'react-dom';

export function ProjectSelect() {

  let seloptions = []
    
  const [state, setState] = useState({
    options: [],
    groups: [],
    items: [],
    progs: []
  })
  
  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {

      var groups= []
      var options= []
      var items = []
      var progs = []

      const programs = (await db.rel.find('program')).programs

      const projs = (await db.rel.find('item')).items
    

      for(let program of programs){
        options.push({
          value:program.id,
          label:program.name,
        })

        progs.push(program)
      }
 
      for (let proj of projs) {

            groups.push({
              id:proj.id,
              title:proj.name,
              items: proj.items,
              stackItems: true,
            })

            for(let milestone of proj.milestones){
                var start_time = `${milestone.plannedFinishedDate} 22:30`
                var end_time = `${milestone.plannedFinishedDate} 22:31`

               /*  items.push({
                    id: proj.id + milestone.milestoneName,
                    group: proj.id,
                    title: milestone.milestoneName.replaceAll(" ","."),
                    start_time: moment(start_time),
                    end_time: moment(end_time)
                }) */
                items.push({
                  id: proj.id + milestone.milestoneName,
                  group: proj.id,
                  title: milestone.milestoneName,
                  start_time: moment(start_time),
                  end_time: moment(end_time).add(3,'months'),
                  color: 'rgb(0, 0, 0)',
                  selectedBgColor: 'rgba(255, 255, 255,0)',
                  bgColor : 'rgba(255, 255, 255,0)',
              })
            }

      }

      setState({
        options:options,
        groups:groups,
        items:items,
        progs:progs
      })
      console.log("finish")
    }    loadPrograms();
  }, [db])
  

  
  
  function handleChange(event) {
    let options = event
    console.log("hello")
    const groups = state.groups
    const items = state.items
    const progs = state.progs
    render(<ProjectTimeline 
      groups={groups} items={items} options={options} programs={progs}>

     </ProjectTimeline> , document.getElementById("timeline"))
  }

  return (
    <div id="projects">
      <Select
        isMulti
        name="colors"
        options={state.options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        />
        <div id="timeline">

        </div>
    </div>
  )
}