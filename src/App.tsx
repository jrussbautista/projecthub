import React from "react";
import Layout from "components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ModalProvider } from "contexts";
import ModalManager from "components/ModalManager";
import Home from "pages/Home";
import Project from "pages/Project";
import CreateProject from "pages/CreateProject";

function App() {
  return (
    <Router>
      <ModalProvider>
        <ModalManager />
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/project/:id" exact>
              <Project />
            </Route>
            <Route path="/create" exact>
              <CreateProject />
            </Route>
          </Switch>
        </Layout>
      </ModalProvider>
    </Router>
  );
}

export default App;
