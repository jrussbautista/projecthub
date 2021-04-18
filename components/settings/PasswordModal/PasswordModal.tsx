import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from 'components/modal';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  onClose(): void;
  onSubmit(password: string): void;
}

const useStyles = makeStyles(() => ({
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

interface PasswordForm {
  password: string;
}

const PasswordModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm<PasswordForm>();

  const submit = ({ password }: PasswordForm) => {
    onSubmit(password);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          id='standard-basic'
          label='Password'
          autoComplete='true'
          type='password'
          className={classes.input}
          fullWidth
          name='password'
          inputRef={register({
            required: 'Password is required field',
            minLength: {
              value: 6,
              message: 'Name must be at least 6 characters long',
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password && errors.password.message}
        />
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            disableElevation
            type='submit'
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
