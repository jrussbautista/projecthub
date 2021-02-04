import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useNotification } from "contexts";

const Notification = () => {
  const { visible, message, type, closeNotification } = useNotification();

  return (
    <Snackbar
      open={visible}
      autoHideDuration={6000}
      onClose={closeNotification}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={closeNotification} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
