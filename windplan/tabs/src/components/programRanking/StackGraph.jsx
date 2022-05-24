import React from "react";
import Plot from 'react-plotly.js';
import { useFind } from 'react-pouchdb';
import { savePDFbutton } from '../../utils/Buttons';

export function StackGraph() {

  const programs = useFind({
    selector: {},
  });
  let data = []
  let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  let hours = [];
  for (let i = 0; i < 12; i++) hours[i] = 0;

  // Costs
  programs.forEach((program, i) => {
    let costs = [];
    let k = 0;

    while (k < 12) {
      costs[k] = Math.ceil(Math.random() * 10)
      hours[k] = hours[k] + costs[k]
      k++;
    }

    data[i] = {
      x: months,
      y: costs,
      name: program["name"],
      type: "bar"
    }

  });

  // Hours
  let k = 0;
  while (k < 12) {
    hours[k] = hours[k] * (1 + Math.random() / 5)
    k++;
  }

  data[programs.length] = {
    x: months,
    y: hours,
    name: "hours",
    type: "scatter"
  }

  let config = {
    displaylogo: false,
    modeBarButtons: [
      ['toImage', savePDFbutton('Save plot as PDF', 'program_costs')],
      ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
    ]
  }

  return (
    <Plot
      data={data}
      layout={{ height: 400, barmode: 'stack', title: 'Program Costs' }}
      config={config}
    />
  )
}
