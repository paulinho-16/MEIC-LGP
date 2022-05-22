import React from "react";
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import { jsPDF } from "jspdf";
import { useFind } from 'react-pouchdb';

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

  data[programs.length] =
  {
    x: months,
    y: hours,
    name: "hours",
    type: "scatter"
  }

  let savePDFicon = {
    'width': 1000,
    'height': 1000,
    'path': 'm518 386q0 8-5 13t-13 5q-37 0-63-27t-26-63q0-8 5-13t13-5 12 5 5 13q0 23 16 38t38 16q8 0 13 5t5 13z m125-73q0-59-42-101t-101-42-101 42-42 101 42 101 101 42 101-42 42-101z m-572-320h858v71h-858v-71z m643 320q0 89-62 152t-152 62-151-62-63-152 63-151 151-63 152 63 62 151z m-571 358h214v72h-214v-72z m-72-107h858v143h-462l-36-71h-360v-72z m929 143v-714q0-30-21-51t-50-21h-858q-29 0-50 21t-21 51v714q0 30 21 51t50 21h858q29 0 50-21t21-51z',
    'transform': 'matrix(1 0 0 -1 0 850)'
  }

  let savePDFbutton = {
    name: 'Save plot as PDF',
    icon: savePDFicon,
    direction: 'up',
    click: function (gd) {
      Plotly.toImage(gd, { format: 'png', height: gd._fullLayout.height, width: gd._fullLayout.width }).then(function (img) {
        const pdf = new jsPDF({
          orientation: 'landscape',
        });
        const imgProps = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("program_costs.pdf");
      })
    }
  }

  let config = {
    displaylogo: false,
    modeBarButtons: [
      ['toImage', savePDFbutton],
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
