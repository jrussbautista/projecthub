import { useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Header from "components/header";
import ModalManager from "components/modal-manager";
import { AuthProvider, ModalProvider, ThemeProvider } from "contexts";
import type { AppProps } from "next/app";
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <ModalProvider>
            <ModalManager />
            <Header />
            <Component {...pageProps} />
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
