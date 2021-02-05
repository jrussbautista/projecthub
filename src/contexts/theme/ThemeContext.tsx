import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

const ThemeContext = createContext({
  isDarkMode: false,
  toggle: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const initialValue = Boolean(localStorage.getItem("darkMode")) || false;
  const [isDarkMode, setIsDarkMode] = useState(initialValue);

  const type = isDarkMode ? "dark" : "light";

  console.log(type);

  const theme = createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#009432",
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <MaterialThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ isDarkMode, toggle }}>
        {children}
      </ThemeContext.Provider>
    </MaterialThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
