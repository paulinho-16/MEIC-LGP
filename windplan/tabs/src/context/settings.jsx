import React, { createContext, useState } from "react";

const SettingsContext = createContext();

const SettingsDispatchContext = createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    VPS_HOURS: 0.65,
    RD_COST: 0.35,
    CM_WEIGHT: 2,
    VALUE_EFFORT: 0.7,
    GATE: 0.2,
    PL_PERIOD: 0.1
  });

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={setSettings}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext, SettingsDispatchContext };
