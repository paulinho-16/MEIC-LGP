import React, { useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { Homepage, Input, ProgramMatrix, ProgramRanking, Settings } from "..";
import { useTeamsFx } from "../../lib/useTeamsFx";
import { DbProvider } from "../../context/db";

import "./Tab.css";
import { ProgramsProvider } from "../../context/programs";
import { SettingsProvider } from "../../context/settings";


export default function Tab() {
  const { themeString } = useTeamsFx();

  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const items = [
    { key: 'home', content: 'Home', onClick: () => setSelectedMenuItem('home') },
    { key: 'input', content: 'Input', onClick: () => setSelectedMenuItem('input') },
    { key: 'ranking', content: 'Program Ranking', onClick: () => setSelectedMenuItem('ranking') },
    { key: 'status', content: 'Program Status', onClick: () => setSelectedMenuItem('status') },
    { key: 'matrix', content: 'Program Matrix', onClick: () => setSelectedMenuItem('matrix') },
    { key: 'settings', content: 'Settings', onClick: () => setSelectedMenuItem('settings') }
  ]

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <DbProvider>
        <SettingsProvider>
          <ProgramsProvider>
            <div className="tabs page">
              <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                  <img src="windplan_complexa_positivo-01.png" alt="windplan" className="navbar-brand"></img>
                  <div className="pages">
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
              {selectedMenuItem === "matrix" && (
                <ProgramMatrix />
              )}
              {selectedMenuItem === "settings" && (
                <Settings />
              )}
            </div>
          </ProgramsProvider>
        </SettingsProvider>
      </DbProvider>
    </div>
  );
}
