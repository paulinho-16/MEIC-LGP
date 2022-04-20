import React from "react";

export const EditScoringVarsForm = ({onSubmit}) =>{
    return(
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Cost Importance</label>
                <input className="form-control" id="cost_imp" type="range" min="0" max="100"/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Time Importance</label>
                <input className="form-control" id="cost_imp" type="range" min="0" max="100"/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};