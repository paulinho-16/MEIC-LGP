import React from "react";
import Plot from 'react-plotly.js';
import { useFind } from 'react-pouchdb';

export function MatrixPlot(){
    const programs = useFind({
        selector:{},
    });
    
    var data  = []
    
    
    programs.forEach((program,i) => {
        data[i]={
            x: Math.ceil(Math.random()*10),
            y: Math.ceil(Math.random()*100)+20,
            name: program["name"],
            type: "scatter",
            mode: 'markers',
            marker: {color:'red'}
        }
        
    });
    var trace1 = [{
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers',
        type: 'scatter'
      },{type:'bar'}];
    return(
        <Plot
            data={trace1}
            layout={{height:400, width:400, title: 'Program Matrix'}}
        />
    )
}