import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "routing";
import Home from "pages/home";
import Project from "pages/project";
import Projects from "pages/projects";
const CreateProject = lazy(() => import("pages/create-project"));
const User = lazy(() => import("pages/user"));
const Settings = lazy(() => import("pages/settings"));
const Favorites = lazy(() => import("pages/favorites"));
const NotFound = lazy(() => import("pages/not-found"));

interface AppRoute {
  path: string;
  component: any;
  isProtectedRoute: boolean;
}

const routes: AppRoute[] = [
  { path: "/", component: Home, isProtectedRoute: false },
  { path: "/project/:id", component: Project, isProtectedRoute: false },
  { path: "/projects", component: Projects, isProtectedRoute: false },
  { path: "/user/:id", component: User, isProtectedRoute: false },
  { path: "/create", component: CreateProject, isProtectedRoute: true },
  { path: "/settings", component: Settings, isProtectedRoute: true },
  { path: "/favorites", component: Favorites, isProtectedRoute: true },
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<span />}>
      <Switch>
        {routes.map((route, i) =>
          route.isProtectedRoute ? (
            <ProtectedRoute
              key={i}
              exact
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              key={i}
              exact
              path={route.path}
              component={route.component}
            />
          )
        )}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
