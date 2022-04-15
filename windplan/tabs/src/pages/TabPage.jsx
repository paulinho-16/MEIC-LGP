import React, { Suspense, useState } from "react";
import { Menu } from "@fluentui/react-northstar";
import { InputPage } from "./InputPage";
import { PouchDB } from "react-pouchdb";

export function TabPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");

  const items = [
    { key: 'home', content: 'Home', onClick: () => setSelectedMenuItem('home') },
    { key: 'input', content: 'Input', onClick: () => setSelectedMenuItem('input') },
    { key: 'ranking', content: 'Program Ranking', onClick: () => setSelectedMenuItem('ranking') },
    { key: 'status', content: 'Program Status', onClick: () => setSelectedMenuItem('status') },
  ]

  return (
    <PouchDB name="windplandb">
      <Suspense fallback="Loading...">
        <div>
          <h1 className="center">WindPlan</h1>

          <Menu defaultActiveIndex={0} items={items} underlined secondary />

          <div className="sections">
            {selectedMenuItem === "home" && (
              <h2>Home Page</h2>
            )}
            {selectedMenuItem === "input" && (
              <InputPage />
            )}
            {selectedMenuItem === "ranking" && (
              <h2>Ranking Page</h2>
            )}
            {selectedMenuItem === "status" && (
              <h2>Status Page</h2>
            )}
          </div>
        </div>
      </Suspense>
    </PouchDB>
  );
}
