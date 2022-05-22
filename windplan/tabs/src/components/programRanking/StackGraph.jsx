import React from "react";
import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js';
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

  // Custos
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

  // Horas 
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

  let config = {
    modeBarButtonsToAdd: [
      // {
      //   name: 'color toggler',
      //   icon: icon1,
      //   click: function(gd) {
      //     let newColor = colors[Math.floor(3 * Math.random())]
      //     Plotly.restyle(gd, 'line.color', newColor)
      //   }},
      // {
      //   name: 'button1',
      //   icon: Plotly.Icons.pencil,
      //   direction: 'up',
      //   click: function(gd) {alert('button1')
      // }},
      {
        name: 'Save plot as PDF',
        icon: savePDFicon,
        direction: 'up',
        click: function (gd) {
          // gd.attr("src", url);
          //   Plotly.downloadImage(gd, {format:'png', height:400, width:400}).then(function(dataUrl) {
          //     console.log('aquii')
          // });
          var doc = new jsPDF({ options });

          // add image
          doc.addImage(gd, 'JPEG');

          // Save document
          doc.save('charts.pdf');
        }
      }],
    // modeBarButtonsToRemove: ['pan2d','select2d','lasso2d','resetScale2d','zoomOut2d'] // TODO: decide if we should remove any buttons
  }

  return (
    <Plot
      data={data}
      layout={{ height: 400, barmode: 'stack', title: 'Program Costs' }}
      config={config}
    />
  )
}
