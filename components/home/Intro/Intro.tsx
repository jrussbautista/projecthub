import Router from 'next/router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useAuth, useModal } from 'contexts';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: 'calc(100vh - 5rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      textAlign: 'left',
      height: 'calc(100vh)',
    },
  },
  heading: {
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },
  description: {
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  btnJoin: {
    marginTop: 30,
    marginBottom: 20,
  },
  introImage: {
    width: '100%',
  },
}));

const Intro: React.FC = () => {
  const classes = useStyles();

  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();
  const { formatMessage } = useIntl();

  const handleClickPostProject = () => {
    if (isAuthenticated) {
      return Router.push('/projects/create');
    }
    openModal('SIGN_UP_VIEW');
  };

  return (
    <Container className={classes.gridContainer}>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" className={classes.heading} gutterBottom>
            {formatMessage({ id: 'heroTitle' })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            color="textSecondary"
            className={classes.description}
          >
            {formatMessage({ id: 'heroDescription' })}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            className={classes.btnJoin}
            onClick={handleClickPostProject}
          >
            {formatMessage({ id: 'Post your project' })}
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <img
            src="/images/intro-image.svg"
            alt="project ideas"
            className={classes.introImage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Intro;
