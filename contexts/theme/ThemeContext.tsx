import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core";
import { parseCookies, setCookie } from "nookies";
import { lightTheme, darkTheme } from "theme/theme";

const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const { theme } = parseCookies();
  const initialValue = theme || "light";
  const [currentTheme, setCurrentTheme] = useState(initialValue);

  const selectedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    setCookie(null, "theme", currentTheme);
  }, [currentTheme]);

  const toggle = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <MaterialThemeProvider theme={selectedTheme}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggle }}>
        {children}
      </ThemeContext.Provider>
    </MaterialThemeProvider>
  );
};

export const useTheme = () => useContext(ThemeContext);
