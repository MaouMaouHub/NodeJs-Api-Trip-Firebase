// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  projectId: process.env.projectId,
  storageBucket: "maouhub-animemash.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
