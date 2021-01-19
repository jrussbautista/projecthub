import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { useAuth } from "contexts";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  right: {
    padding: 10,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 60,
    height: 60,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface Menu {
  id: string;
  title: string;
}

const MENUS: Menu[] = [
  {
    id: "edit-profile",
    title: "Edit Profile",
  },
  {
    id: "change-password",
    title: "Change Password",
  },
];

const Settings = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleClick = (value: string) => {
    const isAlreadySelected = selectedMenu === value;
    if (isAlreadySelected) return setSelectedMenu(null);
    setSelectedMenu(value);
  };

  const renderSelectedMenu = () => {
    switch (selectedMenu) {
      case "edit-profile":
        return <EditProfile />;
      case "change-password":
        return <ChangePassword />;
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h5"> My Settings</Typography>
      {currentUser && (
        <List component="nav">
          {MENUS.map((menu) => (
            <div key={menu.id}>
              <ListItem button onClick={() => handleClick(menu.id)}>
                <ListItemText primary={menu.title} />
                {selectedMenu === menu.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Divider />
              <Collapse
                in={selectedMenu === menu.id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div">{renderSelectedMenu()}</List>
              </Collapse>
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Settings;
