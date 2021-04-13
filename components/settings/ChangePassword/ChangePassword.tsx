import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { ChangePassword as ChangePasswordType } from 'interfaces/Auth';
import { AuthService } from 'services/auth-service';
import { useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
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
  alertContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  saveContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ChangePassword = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    errors,
    reset,
  } = useForm<ChangePasswordType>();

  const { formatMessage } = useIntl();

  const onSubmit = async ({
    oldPassword,
    newPassword,
    confirmNewPassword,
  }: ChangePasswordType) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      setLoading(false);
      setSuccess('Successfully changed password');
      reset();
    } catch (error) {
      setError('Unable to changed password right now. Please try again later');
      setLoading(false);
      setSuccess(null);
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {success && (
          <Alert className={classes.alertContainer} severity='success'>
            {success}
          </Alert>
        )}
        {error && (
          <Alert className={classes.alertContainer} severity='error'>
            {error}
          </Alert>
        )}
        <TextField
          id='standard-basic'
          label={formatMessage({ id: 'Old Password' })}
          autoComplete='true'
          type='password'
          className={classes.input}
          fullWidth
          name='oldPassword'
          inputRef={register({
            required: 'Old password is required field',
            minLength: {
              value: 6,
              message: 'Old password must be at least 6 characters long',
            },
          })}
          error={Boolean(errors.oldPassword)}
          helperText={errors.oldPassword && errors.oldPassword.message}
        />
        <TextField
          id='standard-basic'
          label={formatMessage({ id: 'New Password' })}
          autoComplete='true'
          type='password'
          className={classes.input}
          fullWidth
          name='newPassword'
          inputRef={register({
            required: 'New password is required field',
            minLength: {
              value: 6,
              message: 'New password must be at least 6 characters long',
            },
          })}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword && errors.newPassword.message}
        />
        <TextField
          id='standard-basic'
          label={formatMessage({ id: 'Confirm New Password' })}
          autoComplete='true'
          type='password'
          className={classes.input}
          fullWidth
          name='confirmNewPassword'
          inputRef={register({
            required: 'New password is required field',
            minLength: {
              value: 6,
              message: 'New password must be at least 6 characters long',
            },
          })}
          error={Boolean(errors.confirmNewPassword)}
          helperText={
            errors.confirmNewPassword && errors.confirmNewPassword.message
          }
        />
        <div className={classes.saveContainer}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            disableElevation
            type='submit'
            disabled={loading}
          >
            {loading ? <CircularProgress size={30} /> : 'Save'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
