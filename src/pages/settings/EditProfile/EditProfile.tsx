import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "contexts/auth/AuthContext";
import { UpdateProfile } from "types/Auth";
import PasswordModal from "../PasswordModal";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
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
  alertContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  saveContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const EditProfile = () => {
  const classes = useStyles();

  const { updateProfile, currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, errors, watch } = useForm<UpdateProfile>({
    defaultValues: { name: currentUser?.name, email: currentUser?.email },
  });

  const name = watch("name", "");
  const email = watch("email", "");

  const onUpdateProfile = async (password: string = "") => {
    try {
      setLoading(true);
      setError(null);
      await updateProfile({ email, name, password });
      setLoading(false);
      setSuccess("Successfully updated profile");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
  };

  const onSubmit = async () => {
    if (currentUser?.email !== email) {
      return setIsOpenPasswordModal(true);
    }
    onUpdateProfile();
  };

  const handleClosePasswordModal = () => {
    setIsOpenPasswordModal(false);
  };

  const handleSubmitPassword = (password: string) => {
    handleClosePasswordModal();
    onUpdateProfile(password);
  };

  return (
    <>
      <PasswordModal
        isOpen={isOpenPasswordModal}
        onClose={handleClosePasswordModal}
        onSubmit={handleSubmitPassword}
      />

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {success && (
          <Alert className={classes.alertContainer} severity="success">
            {success}
          </Alert>
        )}
        {error && (
          <Alert className={classes.alertContainer} severity="error">
            {error}
          </Alert>
        )}
        <TextField
          id="standard-basic"
          label="Name"
          autoComplete="true"
          type="text"
          className={classes.input}
          fullWidth
          name="name"
          inputRef={register({
            required: "Name is required field",
            minLength: {
              value: 6,
              message: "Name must be at least 6 characters long",
            },
          })}
          error={Boolean(errors.name)}
          helperText={errors.name && errors.name.message}
        />
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
        <div className={classes.saveContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={30} /> : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
