import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "./lib/useTeamsFx";
import { DbProvider } from "./context/db";
import { ProgramsProvider } from "./context/programs";
import { SettingsProvider } from "./context/settings";

import { Privacy, TermsOfUse, Tab, TabConfig } from './pages'

export default function App() {
  const { theme, loading } = useTeamsFx();

  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
      <DbProvider>
        <SettingsProvider>
          <ProgramsProvider>
            <Router>
              <Route exact path="/">
                <Redirect to="/tab" />
              </Route>

              {loading ? (
                <Loader style={{ margin: 100 }} />
              ) : (
                <>
                  <Route exact path="/privacy" component={Privacy} />
                  <Route exact path="/termsofuse" component={TermsOfUse} />
                  <Route exact path="/tab" component={Tab} />
                  <Route exact path="/config" component={TabConfig} />
                </>
              )}

            </Router>
          </ProgramsProvider>
        </SettingsProvider>
      </DbProvider>
    </Provider>
  );
}
