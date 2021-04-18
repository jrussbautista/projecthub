import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { useModal, useAuth } from 'contexts';

const useStyles = makeStyles(() => ({
  form: {
    width: 'auto',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
  },
  linkContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textTransform: 'none',
  },
  alertContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  forgotPasswordButton: {
    display: 'flex',
    marginLeft: 'auto',
    textTransform: 'none',
  },
}));

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordView = () => {
  const classes = useStyles();

  const { sendPasswordReset } = useAuth();
  const { openModal } = useModal();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors } = useForm<ForgotPasswordForm>();

  const onSubmit = async ({ email }: ForgotPasswordForm) => {
    try {
      setSuccess(false);
      setLoading(true);
      setError(null);
      await sendPasswordReset(email);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h5' gutterBottom className={classes.heading}>
        ProjectHub
      </Typography>
      {success && (
        <Alert className={classes.alertContainer} severity='success'>
          Successfully email sent. Please check your email.
        </Alert>
      )}
      {error && (
        <Alert className={classes.alertContainer} severity='error'>
          {error}
        </Alert>
      )}
      <TextField
        id='standard-basic'
        label='Email'
        autoComplete='true'
        type='email'
        className={classes.input}
        fullWidth
        name='email'
        inputRef={register({
          required: 'Email is required field',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address',
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
      />

      <Button
        className={classes.button}
        fullWidth
        variant='contained'
        color='primary'
        size='large'
        disableElevation
        type='submit'
        disabled={loading}
      >
        {loading ? <CircularProgress size={30} /> : 'Submit'}
      </Button>
      <div className={classes.linkContainer}>
        <span>Don't have an account?</span>
        <Button
          color='primary'
          className={classes.link}
          onClick={() => openModal('SIGN_UP_VIEW')}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordView;
