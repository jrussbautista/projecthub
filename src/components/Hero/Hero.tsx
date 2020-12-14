import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface Props {
  description: string;
  heading: string;
}

const useStyles = makeStyles(() => ({
  heroContainer: {
    padding: 50,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
  },
}));

const Hero: React.FC<Props> = ({ description, heading }) => {
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      <Container>
        <Typography variant="h4" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="h5" gutterBottom color="textSecondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          className={classes.button}
        >
          Join Community
        </Button>
      </Container>
    </div>
  );
};

export default Hero;
