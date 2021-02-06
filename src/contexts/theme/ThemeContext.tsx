import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const initialValue =
    localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [theme, setTheme] = useState(initialValue);

  const type = theme === "dark" ? "dark" : "light";

  const materialTheme = createMuiTheme({
    palette: {
      type,
      primary: {
        main: "#009432",
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    const selectedTheme = theme === "dark" ? "light" : "dark";
    setTheme(selectedTheme);
  };

  return (
    <MaterialThemeProvider theme={materialTheme}>
      <ThemeContext.Provider value={{ theme, toggle }}>
        {children}
      </ThemeContext.Provider>
    </MaterialThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
