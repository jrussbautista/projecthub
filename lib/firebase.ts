import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgs0COYCL-ixUJZdCvA6KPb3lzUYo-vLQ",
  authDomain: "projecthub-8503d.firebaseapp.com",
  projectId: "projecthub-8503d",
  storageBucket: "projecthub-8503d.appspot.com",
  messagingSenderId: "360005300028",
  appId: "1:360005300028:web:05ef28eff74b468e70b839",
  measurementId: "G-XE3K93RSVC",
};
// Initialize Firebase
firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

const increment = (count: number) => {
  return firebase.firestore.FieldValue.increment(count);
};

const storage = firebase.storage();

const postToJSON = (doc: any) => {
  const data = doc.data();
  return {
    ...data,
    created_at: data?.created_at.toMillis() || 0,
    updated_at: data?.updated_at.toMillis() || 0,
  };
};

export { firebase, db, auth, timestamp, increment, storage, postToJSON };
