import React, { useContext, useState } from "react";
import { SettingsContext } from '../../context/settings';
import { StackGraph } from "../../components/programRanking/StackGraph";
import { ProgramList } from "../../components/programRanking/ProgramList";

import "./ProgramRanking.css";

export default function ProgramRanking() {
  const settings = useContext(SettingsContext)
  const [costPerHour, setCostPerHour] = useState(settings.COST_PER_HOUR)

  return (
    <div className="program-ranking">
      <div className="program-ranking-list">
       <ProgramList costPerHour={costPerHour}/>
      </div>
      <StackGraph setCostPerHour={setCostPerHour}/>
    </div>
  );
}
