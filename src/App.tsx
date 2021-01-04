import React from "react";
import Layout from "components/layout";
import { AppRoutes } from "routing";
import { useAuth } from "contexts";
import AppSkeleton from "components/app-skeleton";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
