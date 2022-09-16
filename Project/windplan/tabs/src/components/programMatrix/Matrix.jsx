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
    
    const result = [...programs.reduce((r, o) => {  
        let key="";
        if(o['strategic']){
            key = o['value'] + '-' + o['effort']+"-strategic";
        }else{
            key = o['value'] + '-' + o['effort'];
        }
        
        const item = r.get(key) || Object.assign({}, o, {
          used: 0,
          instances: 0
        });
        
        if(item['name']!== o['name'] && item['strategic']===o['strategic'])
            item['name']+=','+o['name'].replace('Program',"");
      
        return r.set(key, item);
    }, new Map()).values()];
    let trace=[];
    let strategic_programs=[]

    result.forEach( (program) => {
        if(program['strategic']){
            strategic_programs.push(program);
        }else{
            trace.push({
                x: [program['value']],
                y: [program['effort']],
                mode: 'markers',
                type: 'scatter',
                text:program['name'],
                name: program['name'],
                marker: { 
                    size: 25,
                    symbol: 'circle'
                }
            });
        }
    });

    strategic_programs.forEach((program) =>{
        trace.push({
            x: [program['value']],
            y: [program['effort']],
            mode: 'markers',
            type: 'scatter',
            text:program['name'],
            name: program['name'],
            marker: { 
                size: 12,
                symbol: 'diamond'
            }
        });
    });
  
    let annotations = [
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
    ];
    let config = {
        displaylogo: false,
        modeBarButtons: [
          ['toImage', savePDFbutton('Save matrix as PDF', 'matrix')],
          ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d']
        ],
        displayModeBar: true
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
                    annotations: annotations,
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