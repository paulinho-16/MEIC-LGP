import React, { Component } from "react";
import moment from "moment";

import './ProjectTimeline.css'

import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker
} from 'react-calendar-timeline'

export default class App extends Component {



  itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const color = itemContext.selected ? "#4490ba" : item.color;
    const backgroundColor = itemContext.selected ? "transparent" : item.bgColor;
    const borderColor = itemContext.selected ? "#4490ba" : item.color;

    const borderBottomWidth = itemContext.selected ? 1 : 0;
    const borderTopWidth = itemContext.selected ? 1 : 0;
    const borderLeftWidth = itemContext.selected ? 1 : 4;
    const borderRightWidth = itemContext.selected ? 1 : 0;

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color,
            borderColor,
            borderStyle: "solid",
            borderBottomWidth,
            borderTopWidth,
            borderLeftWidth,
            borderRightWidth

          },
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  render() {
    let options = this.props.options
    let programs = this.props.programs
    let groups = this.props.groups
    let items = this.props.items

    var filteredArray = []

    for (let option of options) {
      for (let prog of programs) {
        if (option.label === prog.name) {
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
        minZoom={60 * 60 * 1000 * 24 * 25}
        itemRenderer={this.itemRenderer}
        canMove={false}
        canResize={false}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              const rootProps = getRootProps();
              rootProps.style = {
                ...rootProps.style,
                backgroundColor: "#4490ba",
              };
              return <div {...rootProps}></div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" style={{ backgroundColor: "#4490ba" }} />
          <DateHeader />
        </TimelineHeaders>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </Timeline>
    );
  }
}
