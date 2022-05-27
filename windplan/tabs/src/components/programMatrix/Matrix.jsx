import React from "react";
import Plot from 'react-plotly.js';
import { useFind } from 'react-pouchdb';
import { savePDFbutton } from '../../utils/Buttons';

export function MatrixPlot() {
  const programs = useFind({
    selector: {},
  });

  let data = []

  programs.forEach((program, i) => {
    data[i] = {
      x: Math.ceil(Math.random() * 10),
      y: Math.ceil(Math.random() * 100) + 20,
      name: program["name"],
      type: "scatter",
      mode: 'markers',
      marker: { color: 'red' }
    }

  });

  let trace1 = [{
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  }, { type: 'bar' }];

  let config = {
    displaylogo: false,
    modeBarButtons: [
      ['toImage', savePDFbutton('Save matrix as PDF', 'matrix')],
      ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
    ]
  }

  return (
    <Plot
      data={trace1}
      layout={{ height: 400, width: 400, title: 'Program Matrix' }}
      config={config}
    />
  )
}