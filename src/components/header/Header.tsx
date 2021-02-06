import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchBar from "components/search-bar";
import UserNav from "components/user-nav";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "inherit",
    color: theme.palette.grey[900],
  },
  headerLogoContainer: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerTitle: {
    display: "none",
    textDecoration: "none",
    color: theme.palette.primary.main,
    paddingLeft: 10,
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  searchDesktopContainer: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  searchMobileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  searchBarForm: {
    width: "100%",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const [isOpenMobileSearchBar, setIsOpenMobileSearchBar] = useState(false);

  const handleSubmit = (value: string) => {
    const url = `/projects?search=${value}`;
    history.push(url);
  };

  const handleToggleSearchBar = () => {
    setIsOpenMobileSearchBar(!isOpenMobileSearchBar);
  };

  return (
    <AppBar position="relative" className={classes.header}>
      <Toolbar>
        <Link to="/" className={classes.logoWrapper}>
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="ProjectHub" />
          <Typography variant="h6" className={classes.headerTitle}>
            <span>ProjectHub</span>
          </Typography>
        </Link>
        <div className={classes.headerRight}>
          <div className={classes.searchDesktopContainer}>
            <SearchBar onSubmit={handleSubmit} />
          </div>
          <UserNav toggleSearchBar={handleToggleSearchBar} />
        </div>
      </Toolbar>
      {isOpenMobileSearchBar && (
        <div className={classes.searchMobileContainer}>
          <SearchBar
            onSubmit={handleSubmit}
            className={classes.searchBarForm}
          />
        </div>
      )}
    </AppBar>
  );
}
