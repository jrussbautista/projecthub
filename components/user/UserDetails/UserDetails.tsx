import { Avatar, Typography } from '@material-ui/core';
import { User } from 'types/User';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  user: User;
}

const useStyles = makeStyles((theme) => ({
  user: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
}));

const UserDetails: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.user}>
      {user.photo_url ? (
        <Avatar
          src={user.photo_url}
          alt={user.name}
          className={classes.avatar}
        />
      ) : (
        <Avatar aria-label='recipe' className={classes.avatar}>
          {user.name.charAt(0)}
        </Avatar>
      )}
      <div className={classes.right}>
        <Typography variant='h6'>{user.name}</Typography>
        <Typography variant='body1'>{user.email}</Typography>
      </div>
    </div>
  );
};

export default UserDetails;
