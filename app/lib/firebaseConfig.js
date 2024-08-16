// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKl8ctuOgTOiDTMvPRI827zcmn1rq6xvI",
  authDomain: "waymap-846fa.firebaseapp.com",
  projectId: "waymap-846fa",
  storageBucket: "waymap-846fa.appspot.com",
  messagingSenderId: "216802777587",
  appId: "1:216802777587:web:1d81f41d1cec7ec75cda86",
  measurementId: "G-JTBQC3ZZZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const realTimeDb = getDatabase(app);

export { db, auth, realTimeDb };