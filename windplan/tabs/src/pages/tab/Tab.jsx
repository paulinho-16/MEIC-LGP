import React, { Suspense, useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { Input } from "..";
import { ProgramRanking } from "../programRanking/ProgramRanking";
import { PouchDB } from "react-pouchdb";
import { useTeamsFx } from "../../lib/useTeamsFx";
import "./Tab.css";

export default function Tab() {
  const { themeString } = useTeamsFx();

  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const items = [
    { key: 'home', content: 'Home', onClick: () => setSelectedMenuItem('home') },
    { key: 'input', content: 'Input', onClick: () => setSelectedMenuItem('input') },
    { key: 'ranking', content: 'Program Ranking', onClick: () => setSelectedMenuItem('ranking') },
    { key: 'status', content: 'Program Status', onClick: () => setSelectedMenuItem('status') },
  ]

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <PouchDB name="windplandb">
        <Suspense fallback="Loading...">
          <div className="tabs page">
            <h1 className="center">WindPlan</h1>

            <Menu defaultActiveIndex={0} items={items} underlined secondary />

            <div className="sections">
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
        </Suspense>
      </PouchDB>
    </div>
  );
}
