import React from "react";
import './ProgramMatrix.css';
import { MatrixPlot } from "../../components/programMatrix/Matrix";

export default function ProgramMatrix(){
    return(
        <div className="program-matrix">
            <MatrixPlot/>            
        </div>
    )
}
