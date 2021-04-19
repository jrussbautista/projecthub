import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Comment } from 'interfaces/Comment';
import { Project } from 'interfaces/Project';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';
import { useAuth, useModal, useNotification } from 'contexts';
import { CommentService } from 'services/comment-service';
import { Status } from 'interfaces/Status';

const useStyles = makeStyles((theme) =>
  createStyles({
    emptyMessage: {
      textAlign: 'center',
    },
    container: {
      display: 'flex',
    },
    formContainer: {
      flex: 1,
      marginLeft: 20,
    },
    commentListContainer: {
      marginTop: 20,
    },
    loadingContainer: {
      textAlign: 'center',
    },
    loadMoreContainer: {
      textAlign: 'center',
      marginTop: 20,
    },
    alertContainer: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      textTransform: 'none',
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

interface Props {
  project: Project;
}

const COMMENT_LIMIT = 10;

const CommentContainer: React.FC<Props> = ({ project }) => {
  const classes = useStyles();

  const { currentUser, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const { openModal } = useModal();

  const [commentsStatus, setCommentsStatus] = useState<Status>('idle');
  const [comments, setComments] = useState<Comment[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isOpenButtonActions, setIsOpenButtonActions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsStatus('idle');
        const results = await CommentService.getComments(project.id);
        setComments(results.comments);
        setHasLoadMore(results.comments.length >= COMMENT_LIMIT);
        setLastVisible(results.lastVisible);
      } catch (error) {
        setCommentsStatus('error');
      } finally {
        setCommentsStatus('success');
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async ({ comment }: { comment: string }) => {
    try {
      setIsSubmitting(true);
      const res = await CommentService.addComment(project.id, { comment });
      setComments([res, ...comments]);
      setIsSubmitting(false);
    } catch (error) {
      showNotification(
        'error',
        "Sorry we we'rent able to submit your comment right now. Please  try  again later!"
      );
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentToDelete: Comment) => {
    try {
      await CommentService.deleteComment(project.id, commentToDelete.id);
      const newComments = comments.filter(
        (comment) => comment.id !== commentToDelete.id
      );
      setComments(newComments);
    } catch (error) {
      showNotification(
        'error',
        "Sorry we we'rent able to delete your comment right now. Please  try  again later!"
      );
    }
  };

  const handleUpdate = async (commentToUpdate: Comment) => {
    try {
      await CommentService.updateComment(project.id, commentToUpdate.id, {
        comment: commentToUpdate.comment,
      });
      const newComments = comments.map((comment) =>
        comment.id === commentToUpdate.id ? commentToUpdate : comment
      );
      setComments(newComments);
    } catch (error) {
      showNotification(
        'error',
        "Sorry we we'rent able to update your comment right now. Please  try  again later!"
      );
    }
  };

  const handleLoadMore = async () => {
    try {
      if (!hasLoadMore) return;

      setIsLoadingMore(true);
      const results = await CommentService.getMoreComments(
        project.id,
        lastVisible
      );
      setHasLoadMore(results.comments.length >= COMMENT_LIMIT);
      setComments([...comments, ...results.comments]);
      setLastVisible(results.lastVisible);
      setIsLoadingMore(false);
    } catch (error) {
      showNotification(
        'error',
        "Sorry we we'rent able to show more comments right now. Please try again!"
      );
      setIsLoadingMore(false);
    }
  };

  const handleOpenLoginModal = () => {
    openModal('LOGIN_VIEW');
  };

  const handleShowActionButtons = () => {
    setIsOpenButtonActions(true);
  };

  const handleCancel = () => {
    setIsOpenButtonActions(false);
  };

  if (commentsStatus === 'idle') {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (commentsStatus === 'error') {
    return (
      <Alert severity='error'>
        Sorry we were'nt able to display comments right now. Please try again
        later
      </Alert>
    );
  }

  return (
    <>
      {!isLoading && currentUser && (
        <div className={classes.container}>
          {currentUser?.photo_url ? (
            <Avatar src={currentUser.photo_url} alt={currentUser.name} />
          ) : (
            <Avatar className={classes.avatar}>
              {currentUser?.name.charAt(0)}
            </Avatar>
          )}

          <div className={classes.formContainer}>
            <CommentForm
              onShowActionButtons={handleShowActionButtons}
              onSubmit={handleSubmit}
              isOpenButtonActions={isOpenButtonActions}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {!isLoading && !currentUser && (
        <div className={classes.alertContainer}>
          <Button
            className={classes.buttonText}
            variant='text'
            color='primary'
            onClick={handleOpenLoginModal}
          >
            Log In
          </Button>
          <span> to participate in discussion. </span>
        </div>
      )}

      <div className={classes.commentListContainer}>
        {comments.length > 0 ? (
          <>
            <CommentList
              comments={comments}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
            {hasLoadMore && (
              <div className={classes.loadMoreContainer}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? 'Loading More...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Typography variant='body2' className={classes.emptyMessage}>
            No comments yet.
          </Typography>
        )}
      </div>
    </>
  );
};

export default CommentContainer;
