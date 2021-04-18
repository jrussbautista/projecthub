import { firebase } from '../lib/firebase';

const formatDate = (date: firebase.firestore.Timestamp) => {
  return typeof date === 'number'
    ? new Date(date).toString().split(' ').splice(1, 3).join(' ')
    : new Date(date.seconds * 1000)
        .toString()
        .split(' ')
        .splice(1, 3)
        .join(' ');
};

export default formatDate;
