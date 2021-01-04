import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "routing";
import Home from "pages/home";
import Project from "pages/project";
import Projects from "pages/projects";
import CreateProject from "pages/create-project";
import Profile from "pages/profile";
import NotFound from "pages/not-found";
import Settings from "pages/settings";

const AppRoutes = () => {
  return (
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
      <ProtectedRoute path="/settings" component={Settings} exact />
      <ProtectedRoute path="/create" component={CreateProject} exact />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
