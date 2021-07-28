import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import Facebook from 'components/icons/Facebook';
import socialShare from 'utils/socialShare';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  list: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: 10,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  facebook: {
    backgroundColor: '#1877f2',
  },
  twitter: {
    backgroundColor: 'rgb(29, 161, 242)',
  },
}));

const ProjectSocialShare = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={`${classes.list} ${classes.facebook}`}
        onClick={() => socialShare('fb')}
        role='button'
      >
        <Facebook />
      </div>
      <div
        className={`${classes.list} ${classes.twitter}`}
        onClick={() => socialShare('twitter')}
      >
        <TwitterIcon color='inherit' fontSize='small' />
      </div>
    </div>
  );
};

export default ProjectSocialShare;
