import React, { useContext } from "react";
import Plot from 'react-plotly.js';
import { ProgramsContext } from "../../context/programs";
import { savePDFbutton } from '../../utils/Buttons';
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
        if(item['name']!== o['name'])
            item['name']+=' ; '+o['name'];
      
        return r.set(key, item);
    }, new Map()).values()];
    
    
    result.forEach( (program) => {
        x.push(program['value']);
        y.push(program['effort']);
        names.push(program['name']);
    });
    var x2=[];
    var y2=[];
    var names2=[];
    programs.forEach( (program)=>{
        x2.push(program['value']);
        y2.push(program['cost']);
        names2.push(program['name']);
    });
    
    
    var trace = [
    {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        text: names,
        name: 'Value-effort',
        marker: { size: 12 }
    },
    {
        x:x2,
        y:y2,
        mode: 'markers',
        type: 'scatter',
        text: names2,
        name: 'Value-cost',
        marker: {size : 15}
    }
]
    
    let config = {
        displaylogo: false,
        modeBarButtons: [
          ['toImage', savePDFbutton('Save matrix as PDF', 'matrix')],
          ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
        ]
      }
    
    return(
        <Plot
            data={trace}
            layout={
                {
                    annotations:[
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: -0.15,
                            y: 1,
                            xanchor: 'left',
                            yanchor: 'top',
                            text: 'High Effort/Cost',
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: -0.15,
                            y: 0,
                            xanchor: 'left',
                            yanchor: 'bottom',
                            text: 'Low Effort/Cost',
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: 1,
                            y: -0.21,
                            xanchor: 'right',
                            yanchor: 'bottom',
                            text: 'High Value',
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: 0,
                            y: -0.21,
                            xanchor: 'left',
                            yanchor: 'bottom',
                            text: 'Low Value',
                            showarrow: false
                        }
                    ],
                    height: 500,
                    width: 800,
                    title: 'Program Matrix',
                    xaxis: {
                        range: [0,5],
                        title:{
                            font:{
                                size:20
                            },
                            text: 'Value',
                        }
                    },
                    yaxis: {
                        title:{
                            font:{
                                size:20
                            },
                            text: 'Effort / Cost'
                        }
                    }
                }
            }
            config = {config}
        />
    )
}