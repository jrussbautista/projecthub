import React from "react";
import { Avatar, Container, Typography } from "@material-ui/core";
import { useAuth } from "contexts";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const Profile = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();

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
        </>
      )}
    </Container>
  );
};

export default Profile;
