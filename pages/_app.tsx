import { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import Router from 'next/router';
import Header from 'components/core/Header';
import Footer from 'components/core/Footer';
import ModalManager from 'components/core/ModalManager';
import NotificationContainer from 'components/core/NotificationContainer';
import {
  AuthProvider,
  ModalProvider,
  ThemeProvider,
  FavoriteProvider,
  NotificationProvider,
} from 'contexts';
import type { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'styles/global.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let { locale, defaultLocale } = router;

  locale = locale || 'en';
  defaultLocale = defaultLocale || 'en';

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  interface Languages {
    [key: string]: any;
  }

  const languages: Languages = {
    en: require('../locales/en.json'),
    zh: require('../locales/zh.json'),
  };

  return (
    <>
      <IntlProvider
        messages={languages[locale]}
        locale={locale}
        defaultLocale={defaultLocale}
      >
        <ThemeProvider>
          <CssBaseline />
          <NotificationProvider>
            <NotificationContainer />
            <AuthProvider>
              <FavoriteProvider>
                <ModalProvider>
                  <ModalManager />
                  <Header />
                  <Component {...pageProps} />
                  <Footer />
                </ModalProvider>
              </FavoriteProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </IntlProvider>
    </>
  );
}

export default MyApp;
