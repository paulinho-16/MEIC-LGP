import React from "react";

import { StackGraph } from "./StackGraph";
import { ProgramList } from "./ProgramList";

import "./ProgramRanking.css";

export function ProgramRanking() {
  
  return (
    <div className="program-ranking">
      <ProgramList />
      <StackGraph />
    </div>
  );
}
