import React, { useState } from "react";
import { Button, Menu, PlayIcon } from "@fluentui/react-northstar";
import { Homepage, Input, ProgramRanking } from "..";
import { useTeamsFx } from "../../lib/useTeamsFx";
import { DbProvider } from "../../context/db";

import "./Tab.css";

export default function Tab() {
  const { themeString } = useTeamsFx();

  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

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
      key: "status",
      content: "Program Status",
      onClick: () => setSelectedMenuItem("status"),
    },
    {
      key: "matrix",
      content: "Program Matrix",
      onClick: () => setSelectedMenuItem("matrix"),
    },
  ];

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <DbProvider>
        <div className="tabs page light-blue-background">
          <nav className="navbar fixed-top">
            <div className="container">
              <div className="header">
                <img
                  src="windplan_complexa_positivo-01.png"
                  alt="windplan"
                  className="navbar-brand"
                ></img>
                <Button flat icon={<PlayIcon/>} content="APPLY CHANGES"/>
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
          {selectedMenuItem === "status" && <h2>Status Page</h2>}
        </div>
      </DbProvider>
    </div>
  );
}
