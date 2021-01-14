import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "routing";
import CreateProject from "pages/create-project";
import Home from "pages/home";
import Project from "pages/project";
import Projects from "pages/projects";
import User from "pages/user";
import NotFound from "pages/not-found";
import Settings from "pages/settings";
import Favorites from "pages/favorites";

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
      <Route path="/user/:id" exact>
        <User />
      </Route>
      <ProtectedRoute path="/favorites" component={Favorites} exact />
      <ProtectedRoute path="/settings" component={Settings} exact />
      <ProtectedRoute path="/create" component={CreateProject} exact />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
