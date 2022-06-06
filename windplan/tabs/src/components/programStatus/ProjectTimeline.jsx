import Timeline from 'react-calendar-timeline'

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";

export function ProjectTimeline({groups,items,options}) {

  console.log(groups)
  console.log(items)
  console.log(options)

  var selectedGroups = []
  var selectedItems = []

  return (

    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment()}
      defaultTimeEnd={moment().add(1, 'year')}
      minZoom={24*60*60*1000}
    />

  )
}