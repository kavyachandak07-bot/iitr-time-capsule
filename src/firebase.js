import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBq_4VaDBybOLcWgsCimsp9rJU9h6JsJlQ",
  authDomain: "iitr-time-capsule.firebaseapp.com",
  projectId: "iitr-time-capsule",
  storageBucket: "iitr-time-capsule.firebasestorage.app",
  messagingSenderId: "514104719590",
  appId: "1:514104719590:web:473307b2dd1b106ef32327"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);