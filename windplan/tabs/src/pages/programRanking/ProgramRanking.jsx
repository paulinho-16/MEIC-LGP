import React from "react";

import { StackGraph } from "../../components/programRanking/StackGraph";
import { ProgramList } from "../../components/programRanking/ProgramList";

import "./ProgramRanking.css";

export default function ProgramRanking() {
  return (
    <div className="program-ranking">
      <div className="program-ranking-list">
       <ProgramList />
      </div>
      <StackGraph />
    </div>
  );
}
