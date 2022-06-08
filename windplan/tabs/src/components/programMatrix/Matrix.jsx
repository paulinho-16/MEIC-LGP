import React from "react";
import Plot from 'react-plotly.js';

export function MatrixPlot(){

    
    
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