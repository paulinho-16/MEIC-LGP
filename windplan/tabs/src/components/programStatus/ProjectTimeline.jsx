import Timeline from 'react-calendar-timeline'

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";

export function ProjectTimeline({groups,items,options}) {

  var selectedGroups = []
  var selectedItems = []

  for(let selection of options){
    for(let group of groups){
      if(group.id == selection.value){
        selectedGroups.push(group)
        break
      }
    }
    for(let item of items){
      if(item.group == selection.value){
        selectedItems.push(item)
      }
    }
  }

  console.log(selectedGroups)
  console.log(selectedItems)

  return (

    <Timeline
      groups={selectedGroups}
      items={selectedItems}
      defaultTimeStart={moment()}
      defaultTimeEnd={moment().add(1, 'year')}
      minZoom={60*60*1000}
    />

  )
}