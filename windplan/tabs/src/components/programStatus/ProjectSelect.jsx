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
            })

            for(let milestone of proj.milestones){
                var start_time = `${milestone.plannedFinishedDate} 00:00`
                var end_time = `${milestone.plannedFinishedDate} 23:59`

                items.push({
                    id: proj.id + milestone.milestoneName,
                    group: proj.id,
                    title: proj.name + " (" + milestone.phase + ")",
                    start_time: moment(start_time),
                    end_time: moment(end_time),
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

    const groups = state.groups
    const items = state.items
    const progs = state.progs

    render(<ProjectTimeline groups={groups} items={items} options={options} programs={progs}/>, document.getElementById("timeline"))
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