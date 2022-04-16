import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useTeamsFx } from "./sample/lib/useTeamsFx";
import Tab from "./Tab";
import "./App.css";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme } = useTeamsFx();
  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
      <Router>
        <Route exact path="/" component={Tab} />
      </Router>
    </Provider>
  );
}
