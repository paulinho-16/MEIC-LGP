import React, { useContext } from "react";
import Plot from 'react-plotly.js';
import { ProgramsContext } from "../../context/programs";
import { savePDFbutton } from '../../utils/Buttons';
export function MatrixPlot(){

    const programs = useContext(ProgramsContext)

    if (programs.length === 0) {
        return (
<div>No programs in tool! Please upload data and click the 'Apply Changes' button on the navbar!</div>        )
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
                    font:{
                        color:  '#4490ba'
                    },
                    plot_bgcolor: '#f6fcff'
                    ,
                    margin:{
                        t:40
                    },
                    annotations:[
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: -0.07,
                            y: 1,
                            xanchor: 'left',
                            yanchor: 'top',
                            text: '<b>High Effort</b>',
                            
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: -0.07,
                            y: 0,
                            xanchor: 'left',
                            yanchor: 'bottom',
                            text: '<b>Low Effort</b>',
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: 1,
                            y: -0.1,
                            xanchor: 'right',
                            yanchor: 'bottom',
                            text: '<b>High Value</b>',
                            showarrow: false
                        },
                        {
                            xref: 'paper',
                            yref: 'paper',
                            x: 0,
                            y: -0.1,
                            xanchor: 'left',
                            yanchor: 'bottom',
                            text: '<b>Low Value</b>',
                            showarrow: false
                        }
                    ],
                    height: 600,
                    width: 1200,
                    xaxis: {
                        color:"#4490ba",
                        showgrid:false,
                        showticklabels:false,
                        side: 'bottom',
                        position:0,
                        range: [-5,5],
                        title:{
                            font:{
                                size:25 
                            },
                            text: 'Value',
                        }
                    },
                    yaxis: {
                        color:"#4490ba",
                        showgrid:false,
                        showticklabels:false,
                        range:[-4,4],
                        title:{
                            font:{
                                size:25
                            },
                            text: 'Effort'
                        }
                    }
                }
            }
            config = {config}
        />
    )
}