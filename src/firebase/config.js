import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3Z5pCMWppH5YSY9MvmMeRwvCUPRXO4QU",
  authDomain: "integrador2-74037.firebaseapp.com",
  projectId: "integrador2-74037",
  storageBucket: "integrador2-74037.appspot.com",
  messagingSenderId: "488279101572",
  appId: "1:488279101572:web:fa2601b9775ca9f29072d1"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();