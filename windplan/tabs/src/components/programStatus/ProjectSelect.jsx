

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import ProjectTimeline from './ProjectTimeline';

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
      var groups = []
      var options = []
      var items2 = []
      var progs = []

      const programs = (await db.rel.find('program'))
      const items = programs.items

      for (let program of programs.programs) {
        options.push({
          value: program.id,
          label: program.name,
        })

        progs.push(program)
      }

      for (let item of items) {

        groups.push({
          id: item.id,
          title: item.name,
          items: item.items,
          stackItems: true,
        })

        let milestones = (await db.rel.find('item', item.id))
        if (milestones['milestones'] === undefined) 
          continue
        
        milestones = milestones['milestones']
        
        for (let milestone of milestones) {
          var start_time = `${milestone.plannedFinishedDate} 22:30`
          var end_time = `${milestone.plannedFinishedDate} 22:31`

          items2.push({
            id: item.id + milestone.name,
            group: item.id,
            title: milestone.name,
            start_time: moment(start_time),
            end_time: moment(end_time).add(3, 'months'),
            color: 'rgb(0, 0, 0)',
            selectedBgColor: 'rgba(255, 255, 255,0)',
            bgColor: 'rgba(255, 255, 255,0)',
          })
        }
      }

      setState({
        options: options,
        groups: groups,
        items: items2,
        progs: progs
      })
    } loadPrograms();
  }, [db])

  function handleChange(event) {
    let options = event
    const groups = state.groups
    const items = state.items
    const progs = state.progs
    render(<ProjectTimeline
      groups={groups} items={items} options={options} programs={progs}>

    </ProjectTimeline>, document.getElementById("timeline"))
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