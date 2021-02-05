import React from "react";
import Layout from "components/layout";
import { AppRoutes } from "routing";
import { useAuth } from "contexts";
import AppSkeleton from "components/app-skeleton";
import NotificationContainer from "components/notification-container";
import ModalManager from "components/modal-manager";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <AppSkeleton />;
  }

  return (
    <>
      <NotificationContainer />
      <ModalManager />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
