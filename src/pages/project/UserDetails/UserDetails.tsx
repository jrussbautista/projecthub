import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { User } from "types/User";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  userDetails: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
    backgroundColor: theme.palette.primary.main,
  },
  description: {
    marginBottom: 20,
  },
}));

interface Props {
  user: User;
}

const UserDetails: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Link to={`/user/${user.id}`}>
      <div className={classes.userDetails}>
        {user.photo_url ? (
          <Avatar
            alt={user.name}
            src={user.photo_url}
            className={classes.avatar}
          />
        ) : (
          <Avatar className={classes.avatar}>{user.name.charAt(0)}</Avatar>
        )}
        <Typography gutterBottom variant="body1" color="textPrimary">
          {user.name}
        </Typography>
      </div>
    </Link>
  );
};

export default UserDetails;
