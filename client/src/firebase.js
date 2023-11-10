// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: "globetrotter-2cf74.firebaseapp.com",
  projectId: "globetrotter-2cf74",
  storageBucket: "globetrotter-2cf74.appspot.com",
  messagingSenderId: "678926466912",
  appId: "1:678926466912:web:4bee26e735a2dd0d982805"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;