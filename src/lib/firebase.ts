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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const auth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp();

const increment = (count: number) => {
  return firebase.firestore.FieldValue.increment(count);
};

const storage = firebase.storage();

export { firebase, db, auth, timestamp, increment, storage };
