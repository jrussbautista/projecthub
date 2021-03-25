import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useModal, useAuth } from "contexts";
import { Login } from "intefaces/Auth";
import SocialLogin from "./SocialLogin";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "auto",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    textTransform: "none",
  },
  errorContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  forgotPasswordButton: {
    display: "flex",
    marginLeft: "auto",
    textTransform: "none",
  },
}));

const LoginView = () => {
  const classes = useStyles();

  const { login } = useAuth();
  const { openModal, closeModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, errors } = useForm<Login>();

  const onSubmit = async ({ email, password }: Login) => {
    try {
      setLoading(true);
      setError(null);
      await login({ email, password });
      setLoading(false);
      closeModal();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSocialError = (err: string) => {
    setError(err);
  };

  const handleOpenForgotPasswordModal = () => {
    openModal("FORGOT_PASSWORD_VIEW");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" gutterBottom className={classes.heading}>
        ProjectHub
      </Typography>
      {error && (
        <Alert className={classes.errorContainer} severity="error">
          {error}
        </Alert>
      )}
      <TextField
        id="standard-basic"
        label="Email"
        autoComplete="true"
        type="email"
        className={classes.input}
        fullWidth
        name="email"
        inputRef={register({
          required: "Email is required field",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />
      <TextField
        id="standard-basic"
        label="Password"
        name="password"
        type="password"
        className={classes.input}
        autoComplete="true"
        fullWidth
        inputRef={register({
          required: "Password is required field",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password && errors.password.message}
      />
      <Button
        variant="text"
        className={classes.forgotPasswordButton}
        color="primary"
        onClick={handleOpenForgotPasswordModal}
      >
        Forgot your password?
      </Button>
      <Button
        className={classes.button}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disableElevation
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={30} /> : "Log In"}
      </Button>
      <div className={classes.linkContainer}>
        <span>Don't have an account?</span>
        <Button
          color="primary"
          className={classes.link}
          onClick={() => openModal("SIGN_UP_VIEW")}
        >
          Sign Up
        </Button>
      </div>
      <SocialLogin onError={handleSocialError} />
    </form>
  );
};

export default LoginView;
