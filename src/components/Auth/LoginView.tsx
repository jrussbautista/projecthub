import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    width: 600,
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
  },
  linkContainer: {
    textAlign: "center",
  },
  link: {
    textTransform: "none",
  },
}));

const LoginView = () => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <Typography variant="h5" gutterBottom className={classes.heading}>
        ProjectHub
      </Typography>
      <TextField
        id="standard-basic"
        label="Email"
        type="email"
        className={classes.input}
        fullWidth
      />
      <TextField
        id="standard-basic"
        label="Password"
        type="password"
        className={classes.input}
        fullWidth
      />
      <Button
        className={classes.button}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disableElevation
        type="submit"
      >
        Log In
      </Button>
      <div className={classes.linkContainer}>
        <span>Don't have an account?</span>
        <Button color="primary" className={classes.link}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default LoginView;
