import firebase from "firebase";

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

export { firebase, db, auth, timestamp };
