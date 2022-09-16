import React from "react";
import { ProjectSelect } from "../../components/programStatus/ProjectSelect";
import SelectProjectOverview from "../../components/programStatus/SelectProjectOverview";


export default function ProgramStatus() {
    return (
        <div className="project-status">
          <div className="project-overview">
            <SelectProjectOverview />
          </div>
          <ProjectSelect/>
        </div>
      );
}