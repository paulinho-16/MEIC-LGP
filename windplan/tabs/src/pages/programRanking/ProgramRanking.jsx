import React from "react";

import { StackGraph } from "../../components/programRanking/StackGraph";
import { ProgramList } from "../../components/programRanking/ProgramList";

import "./ProgramRanking.css";

export default function ProgramRanking() {
  return (
    <div className="program-ranking">
      <ProgramList />
      <StackGraph />
    </div>
  );
}
