import React from "react";
import { Tabs } from "./sample/Tabs";
import { useTeamsFx } from "./sample/lib/useTeamsFx";

export default function Tab() {
  const { themeString } = useTeamsFx();
  return (
    <div className={themeString === "default" ? "" : "dark"}>
      <Tabs />
    </div>
  );
}
