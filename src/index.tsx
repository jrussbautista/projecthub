import React from "react";
import ReactDOM from "react-dom";
import "styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ModalProvider,
  AuthProvider,
  NotificationProvider,
  ThemeProvider,
} from "contexts";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ScrollToTop } from "routing";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <NotificationProvider>
        <AuthProvider>
          <ModalProvider>
            <ThemeProvider>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </ModalProvider>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
