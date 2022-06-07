import React, { Component } from "react";
import moment from "moment";

import Timeline, {
    TimelineMarkers,
    CustomMarker,
    TodayMarker,
    CursorMarker
  } from 'react-calendar-timeline'
  



export default class App extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  
  itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item.selectedBgColor) : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: "solid",
            borderWidth: 0,
            borderLeftWidth: 4,
            borderRightWidth: 0

          },
          onMouseDown: () => {
            console.log("on item click", item);
          }
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
    
    let options=this.props.options
    let programs=this.props.programs
    let groups = this.props.groups
    let items=this.props.items

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
      itemRenderer={this.itemRenderer}
    >
      <TimelineMarkers>
        <TodayMarker />
      </TimelineMarkers>
    </Timeline>


        
 
    );
  }
}
