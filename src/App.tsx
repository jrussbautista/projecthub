import React from "react";
import Layout from "components/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "pages/home";
import Project from "pages/project";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/project/:id" exact>
            <Project />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
