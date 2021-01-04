import { Avatar, Container, Typography } from "@material-ui/core";
import { useAuth } from "contexts";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  right: {
    padding: 20,
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
    id: "my_projects",
    title: "My Projects",
  },
  {
    id: "my_favorites",
    title: "My Favorites",
  },
];

const Profile = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

  const handleClick = (value: string) => {};

  return (
    <Container className={classes.container}>
      <Typography variant="h5"> My Profile</Typography>
      {currentUser && (
        <>
          <div className={classes.profile}>
            <Avatar className={classes.avatar}>H</Avatar>
            <div className={classes.right}>
              <Typography variant="h5">{currentUser.name}</Typography>
              <Typography variant="h5">{currentUser.email}</Typography>
            </div>
          </div>
          <div>
            <List component="nav">
              {MENUS.map((menu) => (
                <div key={menu.id}>
                  <ListItem button onClick={() => handleClick(menu.id)}>
                    <ListItemText primary={menu.title} />
                    <ArrowForwardIosIcon fontSize="small" />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        </>
      )}
    </Container>
  );
};

export default Profile;
