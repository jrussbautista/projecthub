import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface Props {
  description: string;
  heading: string;
}

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    padding: '30px 15px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      padding: 50,
    },
  },
  heading: {
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },
  description: {
    [theme.breakpoints.up('md')]: {
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.h5.fontSize,
    },
  },
}));

const Hero: React.FC<Props> = ({ description, heading, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      <Container>
        <Typography variant='h5' className={classes.heading} gutterBottom>
          {heading}
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
          color='textSecondary'
          className={classes.description}
        >
          {description}
        </Typography>
        {children}
      </Container>
    </div>
  );
};

export default Hero;
