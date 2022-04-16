import React, { useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { ProgramRanking } from "../programRanking/ProgramRanking";
import "./Tabs.css";

export function Tabs() {
  const dashboard = "dashboard";
  const input = "input";
  const programRanking = "programRanking";
  const programStatus = "programStatus";

  const tabs = {
    [dashboard]: "Dashboard",
    [input]: "Input",
    [programRanking]: "Program Ranking",
    [programStatus]: "Program Status"
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState(dashboard);
  const items = Object.keys(tabs).map((step) => {
    return {
      key: step,
      content: tabs[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  return (
    <div className="tabs page">
      <div className="narrow">
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === dashboard && (
            <p>Dashboard placeholder</p>
          )}
          {selectedMenuItem === input && (
            <p>Input placeholder</p>
          )}
          {selectedMenuItem === programRanking && (
            <ProgramRanking />
          )}
          {selectedMenuItem === programStatus && (
            <p>Program status placeholder</p>
          )}
        </div>
      </div>
    </div>
  );
}
