import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { useModal, useAuth } from "contexts";
import SearchBar from "components/search-bar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";

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
    color: theme.palette.primary.main,
  },
  headerLink: {
    marginRight: 20,
  },
  avatarBackgroundColor: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
  },
  avatarButtonContainer: {
    backgroundColor: "transparent",
    border: "transparent",
  },
  list: {
    display: "flex",
    alignItems: "center",
  },
  item: {
    marginRight: 10,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const { openModal } = useModal();
  const { currentUser, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropDown = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (value: string) => {
    const url = `/projects?q=${value}`;
    history.push(url);
  };

  const handleNavigateDropDownMenu = (value: string) => {
    handleCloseDropDown();
    switch (value) {
      case "logout":
        logout();
        break;
      case "settings":
      case "profile":
        const url = `/${value}`;
        history.push(url);
        break;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.siteTitle}>
              ProjectHub
            </Link>
          </Typography>
          <SearchBar onSubmit={handleSubmit} />
          <ul className={classes.list}>
            {currentUser ? (
              <>
                <li className={classes.item}>
                  <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/create"
                  >
                    Project
                  </Button>
                </li>
                <li className={classes.item}>
                  <button
                    type="button"
                    onClick={handleOpenDropdown}
                    className={classes.avatarButtonContainer}
                  >
                    <Avatar className={classes.avatarBackgroundColor}>H</Avatar>
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseDropDown}
                  >
                    <MenuItem
                      onClick={() => handleNavigateDropDownMenu("profile")}
                    >
                      My Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigateDropDownMenu("settings")}
                    >
                      My Settings
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleNavigateDropDownMenu("logout")}
                    >
                      <Button color="primary">Log Out</Button>
                    </MenuItem>
                  </Menu>
                </li>
              </>
            ) : (
              <>
                <li className={classes.item}>
                  <Button
                    color="primary"
                    className={classes.headerLink}
                    onClick={() => openModal("LOGIN_VIEW")}
                  >
                    Log In
                  </Button>
                </li>
                <li className={classes.item}>
                  <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={() => openModal("SIGN_UP_VIEW")}
                  >
                    Sign Up
                  </Button>
                </li>
              </>
            )}
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
}
