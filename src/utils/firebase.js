// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDktC-z082RxrZ7qSDSH2634D51dWodMzQ",
  authDomain: "netflix-c8ad2.firebaseapp.com",
  projectId: "netflix-c8ad2",
  storageBucket: "netflix-c8ad2.firebasestorage.app",
  messagingSenderId: "731897302964",
  appId: "1:731897302964:web:4d10c91ebf03d868feece1",
  measurementId: "G-0HZJY1T0FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



