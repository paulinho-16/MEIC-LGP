import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "./components/sample/lib/useTeamsFx";
import Privacy from "./components/Privacy";
import TermsOfUse from "./components/TermsOfUse";
import Tab from "./components/Tab";
import TabConfig from "./components/TabConfig";


export default function App() {
  const { theme, loading } = useTeamsFx();

  return (
    <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
      <Router>
        <Route exact path="/">
          <Redirect to="/input" />
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
    </Provider>
  );
}
