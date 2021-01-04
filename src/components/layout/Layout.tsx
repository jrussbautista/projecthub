import React from "react";
import Header from "components/header";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: 30,
  },
}));

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
