import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100,
    textAlign: "center",
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <h1> Ops! Page you're trying to access is not found.</h1>
      <Button
        variant="contained"
        color="primary"
        size="large"
        disableElevation
        component={Link}
        to="/"
      >
        Back to home
      </Button>
    </Container>
  );
};

export default NotFound;
