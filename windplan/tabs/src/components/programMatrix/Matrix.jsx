import React, { useContext } from "react";
import Plot from 'react-plotly.js';
<<<<<<< HEAD
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
=======
import { ProgramsContext } from "../../context/programs";

export function MatrixPlot(){

    const programs = useContext(ProgramsContext)

    if (programs.length === 0) {
        return (
        <div>No programs in tool! Please upload data and click the 'Run' button under the Input tab!</div>
        )
    }
    
    var x=[];
    var y =[];
    var names = [];
    
    const result = [...programs.reduce((r, o) => {
        const key = o['value'] + '-' + o['effort'];
        
        const item = r.get(key) || Object.assign({}, o, {
          used: 0,
          instances: 0
        });
        if(item['name']!=o['name'])
            item['name']+=' ; '+o['name'];
      
        return r.set(key, item);
    }, new Map).values()];
    
    
    result.forEach( (program) => {
        x.push(program['value']);
        y.push(program['effort']);
        names.push(program['name']);
    });
    
    
    var trace = [{
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        text: names,
        marker: { size: 12 }
    }]
    
    
    return(
        <Plot
            data={trace}
            layout={
                {
                    height: 400,
                    width: 400,
                    title: 'Program Matrix',
                    xaxis: {
                        range: [0,5]
                    },
                    yaxus: {
                        range: [0,5]
                    }
                }
            }
        />
    )
>>>>>>> matrixDev
}