import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Comment } from 'interfaces/Comment';
import List from '@material-ui/core/List';
import CommentItem from './CommentItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface Props {
  comments: Comment[];
  onDelete(comment: Comment): void;
  onUpdate(comment: Comment): void;
}

const CommentList: React.FC<Props> = ({ comments, onUpdate, onDelete }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {comments.map((comment) => (
        <CommentItem
          comment={comment}
          onUpdate={onUpdate}
          onDelete={onDelete}
          key={comment.id}
        />
      ))}
    </List>
  );
};

export default CommentList;
