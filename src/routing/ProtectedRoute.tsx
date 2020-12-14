import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "contexts";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component }: PrivateRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  return (
    <Route
      render={() => {
        if (isLoading) {
          return null;
        }
        if (currentUser && !isLoading) {
          return <Component />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
