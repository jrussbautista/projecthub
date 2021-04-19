import React, { useState } from 'react';
import { Comment } from 'interfaces/Comment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CommentForm from '../CommentForm';
import formatDate from 'utils/formatDate';
import { useAuth } from 'contexts';

interface Props {
  comment: Comment;
  onUpdate(comment: Comment): void;
  onDelete(comment: Comment): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editFormContainer: {
      marginLeft: 20,
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const CommentItem: React.FC<Props> = ({ comment, onDelete, onUpdate }) => {
  const classes = useStyles();
  const { currentUser, isLoading } = useAuth();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsOpenEditForm(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    onDelete(comment);
    handleCloseMenu();
  };

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCancelEditForm = () => {
    setIsOpenEditForm(false);
  };

  const handleSubmit = ({ comment: commentText }: { comment: string }) => {
    const newComment: Comment = {
      ...comment,
      comment: commentText,
    };
    onUpdate(newComment);
    handleCancelEditForm();
  };

  const showMoreMenu = () => {
    return !isLoading && currentUser && currentUser.id === comment.user.id;
  };

  return (
    <>
      <div
        className={classes.editFormContainer}
        style={{ display: isOpenEditForm ? 'block' : 'none' }}
      >
        <CommentForm
          onCancel={handleCancelEditForm}
          onSubmit={handleSubmit}
          comment={comment}
          isOpenButtonActions={true}
        />
      </div>

      {!isOpenEditForm && (
        <ListItem>
          <ListItemAvatar>
            {comment.user.photo_url ? (
              <Avatar src={comment.user.photo_url} alt={comment.user.name} />
            ) : (
              <Avatar className={classes.avatar}>
                {comment.user.name.charAt(0)}
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={<pre>{comment.comment}</pre>}
            secondary={formatDate(comment.created_at as any)}
          />

          <ListItemSecondaryAction>
            {showMoreMenu() && (
              <IconButton aria-label='more' onClick={handleOpenMoreMenu}>
                <MoreIcon />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      )}

      {showMoreMenu() && (
        <Menu
          id='more-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default CommentItem;
