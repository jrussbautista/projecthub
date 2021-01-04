import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface Props {
  description: string;
  heading: string;
}

const useStyles = makeStyles(() => ({
  heroContainer: {
    padding: 50,
    textAlign: "center",
  },
}));

const Hero: React.FC<Props> = ({ description, heading, children }) => {
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
        {children}
      </Container>
    </div>
  );
};

export default Hero;
