import React from "react";
import ReactDOM from "react-dom";
import "styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalProvider, AuthProvider, NotificationProvider } from "contexts";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import { ScrollToTop } from "routing";
import ModalManager from "components/modal-manager";
import NotificationContainer from "components/notification-container";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "theme";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <NotificationContainer />
          <AuthProvider>
            <ModalProvider>
              <ModalManager />
              <App />
            </ModalProvider>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
