import Button from "@material-ui/core/Button";
import Google from "components/icons/Google";
import { makeStyles } from "@material-ui/core/styles";
import Github from "components/icons/Github";
import { AuthService } from "services/auth-service";
import { useModal } from "contexts";

const useStyles = makeStyles((theme) => ({
  buttonsContainer: {
    marginTop: 30,
  },
  button: {
    marginBottom: 20,
    height: 50,
  },
  buttonText: {
    marginRight: 10,
  },
  buttonGithub: {
    backgroundColor: "#1b1f23",
    color: "#fff",
  },
}));

const SocialLogin: React.FC = () => {
  const { closeModal } = useModal();

  const classes = useStyles();

  const handleLoginWithGoogle = async () => {
    try {
      await AuthService.socialLogin("google");
      closeModal();
    } catch (error) {
      alert("Unable to login with google right now. Please try again later.");
    }
  };

  return (
    <div className={classes.buttonsContainer}>
      <Button
        fullWidth
        type="button"
        variant="outlined"
        size="large"
        className={classes.button}
        disableElevation
        onClick={handleLoginWithGoogle}
      >
        <span className={classes.buttonText}>Log In with Google</span>
        <Google />
      </Button>
      <Button
        fullWidth
        type="button"
        variant="contained"
        size="large"
        className={`${classes.button} ${classes.buttonGithub}`}
        color="default"
        disableElevation
      >
        <span className={classes.buttonText}>Log In with Github</span>
        <Github />
      </Button>
    </div>
  );
};

export default SocialLogin;
