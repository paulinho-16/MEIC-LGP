import React, { useContext, useState } from "react";
import Plot from 'react-plotly.js';
import { DbContext } from "../../context/db";
import { SettingsContext } from '../../context/settings';

export function MatrixPlot(){

    const settings = useContext()
    
    state.forEach( (p) => console.log(p));
    return (<p> Testing</p>)
    /*return(
        <Plot
            data={trace1}
            layout={{height:400, width:400, title: 'Program Matrix'}}
        />
    )*/
}