import React from 'react';
import { Comment } from 'interfaces/Comment';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
    form: {},
    button: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    input: {
      marginTop: 0,
    },
    cancelButton: {
      marginRight: 10,
    },
  })
);

interface Props {
  onSubmit(value: { comment: string }): void;
  isOpenButtonActions?: boolean;
  onCancel(): void;
  onShowActionButtons?(): void;
  comment?: Comment;
  isSubmitting?: boolean;
}

const CommentForm: React.FC<Props> = ({
  onSubmit,
  isOpenButtonActions = false,
  comment,
  onCancel,
  onShowActionButtons,
  isSubmitting = false,
}) => {
  const classes = useStyles();

  const { register, handleSubmit, errors, reset } = useForm<{
    comment: string;
  }>({
    defaultValues: {
      comment: comment?.comment || '',
    },
  });

  const submitButtonText = comment ? 'Save' : 'Comment';

  const submit = (value: { comment: string }) => {
    onSubmit(value);
    reset();
  };

  const handleFocus = () => {
    onShowActionButtons && onShowActionButtons();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submit)}>
      <TextField
        id={`comment-${comment?.id}`}
        className={classes.input}
        label={'Comment'}
        name='comment'
        placeholder={'Add comment...'}
        fullWidth
        margin='normal'
        inputRef={register({
          required: 'Comment is required field',
        })}
        variant='standard'
        error={Boolean(errors.comment)}
        helperText={errors.comment && errors.comment.message}
        multiline
        InputLabelProps={{
          shrink: true,
        }}
        onFocus={handleFocus}
      />
      {isOpenButtonActions && (
        <div className={classes.button}>
          <Button
            variant='text'
            disableElevation
            type='submit'
            onClick={onCancel}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            type='submit'
            disabled={isSubmitting}
          >
            {submitButtonText}
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
