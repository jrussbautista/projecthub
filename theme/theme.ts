import { createMuiTheme, ThemeOptions } from '@material-ui/core';

export const paletteColorsDark = {
  primary: '#009432',
  secondary: '#3282b8',
  error: '#E44C65',
  background: '#1b262c',
  text: '#bbe1fa',
};

export const paletteColorsLight = {
  primary: '#009432',
  secondary: '#ffe0ac',
  error: '#E44C65',
  background: '#fff',
  text: '#050505',
};

const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ? paletteColorsDark : paletteColorsLight;
  return {
    palette: {
      type: dark ? 'dark' : 'light',
      primary: {
        main: paletteColors.primary,
      },
      background: {
        default: paletteColors.background,
      },
    },
  };
};

export const darkTheme = createMuiTheme(options(true));
export const lightTheme = createMuiTheme(options(false));
