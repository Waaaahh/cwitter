// Import the functions you need from the SDKs you need
import {initializeApp}from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO6fcgs1tmWB7nKRfByRHSyKmoUz-iETI",
  authDomain: "cwitter-db5f8.firebaseapp.com",
  projectId: "cwitter-db5f8",
  storageBucket: "cwitter-db5f8.appspot.com",
  messagingSenderId: "1059686375803",
  appId: "1:1059686375803:web:784570370d4ae13a245dde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseInstance = app;
export const auth = getAuth();