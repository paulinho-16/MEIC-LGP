import Timeline from 'react-calendar-timeline'

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";

export function ProjectTimeline() {

  const [state, setState] = useState({
    groups: [],
    items: []
  })
  
  const db = useContext(DbContext)

  useEffect(() => {
    async function loadPrograms() {
      var groups=[]
      var items=[]

      const programs = (await db.rel.find('item')).items

      console.log(programs)
 
      for (let program of programs) {
        groups.push({
          id:program.id,
          title:program.name,
          height: 30
        })
        for(let milestone of program.milestones){
            items.push({
                id: program.id + milestone.milestoneName,
                group: program.id,
                title: milestone.phase,
                start_time: moment(milestone.plannedFinishedDate),
                end_time: moment(milestone.plannedFinishedDate),
            })
        }
      }
      console.log(items)
      setState({
        groups:groups,
        items:items
      })
    }    loadPrograms();
  }, [db])
  
  /*const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

  const items = [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment(),
      end_time: moment().add(1, 'hour')
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour')
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour')
    }
  ]*/

  return (

    <Timeline
      groups={state.groups}
      items={state.items}
      defaultTimeStart={moment().add(1, 'day')}
      defaultTimeEnd={moment().add(31, 'day')}
      minZoom={30*24*60*60*1000}
    />

  )
}