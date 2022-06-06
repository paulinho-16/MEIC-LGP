import Timeline from 'react-calendar-timeline'

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import { ProjectTimeline } from './ProjectTimeline';

import { render } from 'react-dom';

export function ProjectSelect() {

  let seloptions = []
    
  const [state, setState] = useState({
    options: [],
    groups: [],
    items: []
  })
  
  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {
      var groups= []
      var options= []
      var items = []

      const programs = (await db.rel.find('item')).items
    

      console.log(programs)
 
      for (let program of programs) {
        options.push({
          value:program.id,
          label:program.name,
        })

            groups.push({
              id:program.id,
              title:program.name,
              height: 30
            })

            for(let milestone of program.milestones){
                var start_time = `${milestone.plannedFinishedDate} 00:00`
                var end_time = `${milestone.plannedFinishedDate} 24:00`
                
                items.push({
                    id: program.id + milestone.milestoneName,
                    group: program.id,
                    title: milestone.phase,
                    start_time: moment(start_time),
                    end_time: moment(end_time),
                })
            }

      }

      setState({
        options:options,
        groups:groups,
        items:items
      })
      console.log("finish")
    }    loadPrograms();
  }, [db])
  
  function handleChange(event) {
    let options = event

    const groups = state.groups
    const items = state.items

    render(<ProjectTimeline groups={groups} items={items} options={options}/>, document.getElementById("timeline"))
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