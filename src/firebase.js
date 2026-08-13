// Import the functions you need from the SDKs you need
// //Give me the Authentication service belonging to my Firebase app.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq_4VaDBybOLcWgsCimsp9rJU9h6JsJlQ",
  authDomain: "iitr-time-capsule.firebaseapp.com",
  projectId: "iitr-time-capsule",
  storageBucket: "iitr-time-capsule.firebasestorage.app",
  messagingSenderId: "514104719590",
  appId: "1:514104719590:web:473307b2dd1b106ef32327"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Make this auth available to the rest of my React application.
export const auth = getAuth(app);
export const db = getFirestore(app);