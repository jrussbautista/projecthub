import { PROJECTS_COLLECTION, COMMENTS_COLLECTION } from './service-constants';
import { Comment } from 'interfaces/Comment';
import { db, timestamp, auth } from 'lib/firebase';

const LIMIT = 10;
const ORDER_BY = 'created_at';
const ORDER_DIRECTION = 'desc';

const addComment = async (
  projectId: string,
  { comment }: { comment: string }
): Promise<Comment> => {
  const { currentUser } = auth;

  const commentRef = db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .collection(COMMENTS_COLLECTION);

  if (!currentUser) throw new Error('Please log in first.');

  const { uid, displayName, photoURL } = currentUser;

  const newComment = {
    comment,
    updated_at: timestamp,
    created_at: timestamp,
    user: {
      id: uid,
      name: displayName as string,
      photo_url: photoURL as string,
    },
  };

  const res = await commentRef.add(newComment);

  const getCommentRef = commentRef.doc(res.id);
  const commentDetails = await getCommentRef.get();

  return {
    ...(commentDetails.data() as Comment),
    id: res.id,
  };
};

const deleteComment = async (projectId: string, commentId: string) => {
  const projectCommentsRef = db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .collection(COMMENTS_COLLECTION)
    .doc(commentId);

  return projectCommentsRef.delete();
};

const updateComment = async (
  projectId: string,
  commentId: string,
  { comment }: { comment: string }
) => {
  const projectCommentsRef = db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .collection(COMMENTS_COLLECTION)
    .doc(commentId);

  return projectCommentsRef.update({ comment, updated_at: timestamp });
};

const getComments = async (
  projectId: string
): Promise<{ comments: Comment[]; lastVisible: any }> => {
  const projectCommentsRef = db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .collection(COMMENTS_COLLECTION)
    .orderBy(ORDER_BY, ORDER_DIRECTION)
    .limit(LIMIT);

  const getProjectCommentsRef = await projectCommentsRef.get();

  const lastVisible =
    getProjectCommentsRef.docs[getProjectCommentsRef.docs.length - 1];

  const comments = getProjectCommentsRef.docs.map((comment) => {
    return {
      ...(comment.data() as Comment),
      id: comment.id,
    };
  });

  return {
    lastVisible,
    comments,
  };
};

const getMoreComments = async (
  projectId: string,
  cursor: any
): Promise<{ comments: Comment[]; lastVisible: any }> => {
  const commentRef = db
    .collection(PROJECTS_COLLECTION)
    .doc(projectId)
    .collection(COMMENTS_COLLECTION);

  const next = commentRef.startAfter(cursor).limit(LIMIT);

  const getNext = await next.get();

  const lastVisible = getNext.docs[getNext.docs.length - 1];

  const comments = getNext.docs.map((res) => {
    return {
      ...(res.data() as Comment),
      id: res.id,
    };
  });

  return {
    comments,
    lastVisible,
  };
};

export const CommentService = {
  getComments,
  addComment,
  deleteComment,
  updateComment,
  getMoreComments,
};
