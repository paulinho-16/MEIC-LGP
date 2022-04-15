import React from "react";
import { TabPage } from "../pages";
import { useTeamsFx } from "./sample/lib/useTeamsFx";

export default function Tab() {
  const { themeString } = useTeamsFx();

  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <TabPage />
    </div>
  );
}
