import React from "react";
import { Popup } from "@fluentui/react-northstar";
import { EditScoringVarsForm } from "./EditScoringVarsForm";



export default function EditScoringVars(){

    const handleSubmit = (state) => {
        console.log(state);
      }

    return(
        <Popup trigger={<button>Edit Scoring</button>} 
            content={ <div className="modal-body"><EditScoringVarsForm onSubmit={handleSubmit} /></div>}> 
        </Popup>
    );
}