import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoKZlXmw-xZuOj8dBNKLxRKm9QVllM7rM",
  authDomain: "frontend-assignment-71d3a.firebaseapp.com",
  projectId: "frontend-assignment-71d3a",
  storageBucket: "frontend-assignment-71d3a.appspot.com",
  messagingSenderId: "697140663736",
  appId: "1:697140663736:web:d925e920c8a2fe875d6b4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);