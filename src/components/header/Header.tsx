import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchBar from "components/search-bar";
import UserNav from "components/user-nav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "inherit",
    color: theme.palette.grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  siteTitle: {
    textDecoration: "none",
    color: theme.palette.primary.main,
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
    <div className={classes.root}>
      <AppBar position="relative" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.siteTitle}>
              ProjectHub
            </Link>
          </Typography>
          <div className={classes.searchDesktopContainer}>
            <SearchBar onSubmit={handleSubmit} />
          </div>
          <UserNav toggleSearchBar={handleToggleSearchBar} />
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
    </div>
  );
}
