import React, { useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { Input, ProgramRanking } from "..";
import { useTeamsFx } from "../../lib/useTeamsFx";
import { DbProvider } from "../../context/db";

import "./Tab.css";

export default function Tab() {
  const { themeString } = useTeamsFx();

  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const items = [
    { key: 'home', content: 'Home', onClick: () => setSelectedMenuItem('home') },
    { key: 'input', content: 'Input', onClick: () => setSelectedMenuItem('input') },
    { key: 'ranking', content: 'Program Ranking', onClick: () => setSelectedMenuItem('ranking') },
    { key: 'status', content: 'Program Status', onClick: () => setSelectedMenuItem('status') },
    { key: 'matrix', content: 'Program Matrix', onClick: () => setSelectedMenuItem('matrix') },
  ]

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <DbProvider>
        <div className="tabs page">
          <h1 className="center">WindPlan</h1>

          <Menu defaultActiveIndex={0} items={items} underlined secondary />

          <div>
            {selectedMenuItem === "home" && (
              <h2>Home Page</h2>
            )}
            {selectedMenuItem === "input" && (
              <Input />
            )}
            {selectedMenuItem === "ranking" && (
              <ProgramRanking />
            )}
            {selectedMenuItem === "status" && (
              <h2>Status Page</h2>
            )}
          </div>
        </div>
      </DbProvider>
    </div>
  );
}
