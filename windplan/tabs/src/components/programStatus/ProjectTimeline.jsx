import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from 'react-calendar-timeline'

import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { DbContext } from "../../context/db";
import React, { useContext, useEffect, useState } from "react";

import './ProjectTimeline.css'

export function ProjectTimeline({ groups, items, options, programs }) {

  var filteredArray = []

  for (let option of options) {
    for (let prog of programs) {
      if (option.label == prog.name) {
        filteredArray.push(prog)
      }
    }
  }

  var selectedGroups = []
  var selectedItems = []

  for (let selection of filteredArray) {

    for (let group of groups) {

      if (selection.items.includes(group.id)) {
        selectedGroups.push(group)
      }

    }
    for (let item of items) {

      if (selection.items.includes(item.group)) {
        selectedItems.push(item)
      }
    }
  }

  return (
    <Timeline
      groups={selectedGroups}
      items={selectedItems}
      defaultTimeStart={moment().add(-2, 'months')}
      defaultTimeEnd={moment().add(1, 'year')}
      sidebarWidth={250}
      minZoom={60 * 60 * 1000}
    >      
      <TimelineMarkers>
          <TodayMarker />
      </TimelineMarkers>
    </Timeline>

  )
}