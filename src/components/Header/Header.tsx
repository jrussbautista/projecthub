import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useModal } from "contexts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#fff",
    color: "#3d3d3d",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  siteTitle: {
    textDecoration: "none",
  },
  headerLink: {
    marginRight: 20,
  },
}));

export default function Header() {
  const classes = useStyles();

  const { openModal } = useModal();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.siteTitle}>
              ProjectHub
            </Link>
          </Typography>
          <Button
            color="primary"
            className={classes.headerLink}
            onClick={() => openModal("LOGIN_VIEW")}
          >
            Log In
          </Button>
          <Button color="primary" disableElevation variant="contained">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
