import React from "react";
import Layout from "components/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ModalProvider, AuthProvider } from "contexts";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import { ProtectedRoute, ScrollToTop } from "routing";
import ModalManager from "components/ModalManager";
import Home from "pages/Home";
import Project from "pages/Project";
import Projects from "pages/Projects";
import CreateProject from "pages/CreateProject";
import Profile from "pages/Profile";
import theme from "theme";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
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
                <Route path="/projects" exact>
                  <Projects />
                </Route>
                <ProtectedRoute path="/profile" component={Profile} exact />
                <ProtectedRoute
                  path="/create"
                  component={CreateProject}
                  exact
                />
              </Switch>
            </Layout>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
