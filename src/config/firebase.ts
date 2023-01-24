// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtODNnJNl8mLEQSiYGON6BMr3XcIFSsgw",
  authDomain: "react-course-cfc75.firebaseapp.com",
  projectId: "react-course-cfc75",
  storageBucket: "react-course-cfc75.appspot.com",
  messagingSenderId: "995537712633",
  appId: "1:995537712633:web:7bf8a66cbd4f266f37b928"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)