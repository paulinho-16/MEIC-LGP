import React, { useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { Input, ProgramRanking } from "..";
import { useTeamsFx } from "../../lib/useTeamsFx";
import { DbProvider } from "../../context/db";

import "./Tab.css";
import Homepage from "../homepage/Homepage";


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
          <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container">
              <img src="windplan_complexa_positivo-01.png" alt="windplan" class="navbar-brand"></img>
              <div class="pages">
                <Menu defaultActiveIndex={0} items={items} primary styles={{
                  backgroundColor:"rgb(116, 172, 245)"
                }}/>
              </div>
            </div>
          </nav>
        </div>
        <div className="sections">
          {selectedMenuItem === "home" && (
            <Homepage />
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
      </DbProvider>
    </div>
  );
}
