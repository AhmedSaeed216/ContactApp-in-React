// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPY9NIYiFcExcvkB503Rb0FZQjqEmRAAo",
  authDomain: "vite-contact-6c70d.firebaseapp.com",
  projectId: "vite-contact-6c70d",
  storageBucket: "vite-contact-6c70d.appspot.com",
  messagingSenderId: "846222481461",
  appId: "1:846222481461:web:35c9307b3549f11111397c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
