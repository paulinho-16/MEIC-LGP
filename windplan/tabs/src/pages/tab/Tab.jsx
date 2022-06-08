import React, { useState, useContext } from "react";
import { Menu, PlayIcon, Button } from "@fluentui/react-northstar";
import { Homepage, Input, ProgramMatrix, ProgramRanking, Settings } from "..";
import { useTeamsFx } from "../../lib/useTeamsFx";
import { DbContext } from "../../context/db";

import "./Tab.css";
import { ProgramsDispatchContext } from "../../context/programs";
import { SettingsContext } from "../../context/settings";
import { aggregateProgramData, rankPrograms } from '../../components/Ranking';

export default function Tab() {
  const { themeString } = useTeamsFx();

  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const db = useContext(DbContext)
  const settings = useContext(SettingsContext)
  const updatePrograms = useContext(ProgramsDispatchContext)

  const items = [
    {
      key: "home",
      content: "Home",
      onClick: () => setSelectedMenuItem("home"),
    },
    {
      key: "input",
      content: "Input",
      onClick: () => setSelectedMenuItem("input"),
    },
    {
      key: "ranking",
      content: "Program Ranking",
      onClick: () => setSelectedMenuItem("ranking"),
    },
    {
      key: "matrix",
      content: "Program Matrix",
      onClick: () => setSelectedMenuItem("matrix"),
    },
    {
      key: "status",
      content: "Program Status",
      onClick: () => setSelectedMenuItem("status"),
    },
    {
      key: "settings",
      content: "Settings",
      onClick: () => setSelectedMenuItem("settings"),
    }
  ];

  const runTool = async () => {
    const parsedPrograms = await aggregateProgramData(db)

    const rankedPrograms = rankPrograms(settings, parsedPrograms)

    updatePrograms(rankedPrograms)
  }

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <div className="tabs page light-blue-background">
        <nav className="navbar fixed-top">
          <div className="container">
            <div className="header">
              <img
                src="windplan_complexa_positivo-01.png"
                alt="windplan"
                className="navbar-brand"
              ></img>
              <Button flat icon={<PlayIcon />} content="APPLY CHANGES" onClick={runTool} />
            </div>
            <Menu
              className="menu"
              defaultActiveIndex={0}
              items={items}
              underlined
            />
          </div>
        </nav>
      </div>
      <div className="sections white-background">
        {selectedMenuItem === "home" && <Homepage />}
        {selectedMenuItem === "input" && <Input />}
        {selectedMenuItem === "ranking" && <ProgramRanking />}
        {selectedMenuItem === "matrix" && (<ProgramMatrix />)}
        {selectedMenuItem === "status" && <h2>Status Page</h2>}
        {selectedMenuItem === "settings" && (<Settings />)}
      </div>
    </div>
  );
}
