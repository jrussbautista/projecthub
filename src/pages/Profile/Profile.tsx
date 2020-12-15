import React, { useState } from "react";
import { Avatar, Container, Typography } from "@material-ui/core";
import { useAuth } from "contexts";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

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

interface ProfileMenus {
  id: string;
  title: string;
}

const PROFILE_MENUS: ProfileMenus[] = [
  {
    id: "edit-profile",
    title: "Edit Profile",
  },
  {
    id: "change-password",
    title: "Change Password",
  },
];

const Profile = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const menus = PROFILE_MENUS;

  const handleClick = (value: string) => {
    const isAlreadySelected = selectedMenu === value;
    if (isAlreadySelected) return setSelectedMenu(null);
    setSelectedMenu(value);
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4"> My Profile</Typography>

      {currentUser && (
        <>
          <div className={classes.profile}>
            <Avatar className={classes.avatar}>H</Avatar>
            <div className={classes.right}>
              <Typography variant="h5">{currentUser?.name}</Typography>
              <Typography variant="h5">{currentUser?.email}</Typography>
            </div>
          </div>
          <List component="nav">
            {menus.map((menu) => (
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
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default Profile;
