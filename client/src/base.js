import firebase from "firebase";
import "firebase/auth";
import "firebase/storage";

export const app = firebase.initializeApp({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
});

export const auth = app.auth();
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
