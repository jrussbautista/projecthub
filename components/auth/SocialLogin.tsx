import Button from "@material-ui/core/Button";
import Google from "components/icons/Google";
import { makeStyles } from "@material-ui/core/styles";
import Github from "components/icons/Github";
import { useAuth, useModal } from "contexts";
import { Provider } from "interfaces/Auth";

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

interface Props {
  onError(err: string): void;
}

const SocialLogin: React.FC<Props> = ({ onError }) => {
  const { closeModal } = useModal();
  const { socialLogin } = useAuth();

  const classes = useStyles();

  const handleSocialLogin = async (provider: Provider) => {
    try {
      await socialLogin(provider);
      closeModal();
    } catch (error) {
      onError(error.message);
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
        onClick={() => handleSocialLogin("google")}
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
        onClick={() => handleSocialLogin("github")}
      >
        <span className={classes.buttonText}>Log In with Github</span>
        <Github />
      </Button>
    </div>
  );
};

export default SocialLogin;
