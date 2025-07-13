// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Ip_b4blxS5ks8mrNF-1yd5RmeSkch-Q",
  authDomain: "cheapflix-8f9b4.firebaseapp.com",
  projectId: "cheapflix-8f9b4",
  storageBucket: "cheapflix-8f9b4.firebasestorage.app",
  messagingSenderId: "743323458275",
  appId: "1:743323458275:web:b1accaf52cf65aa9d583d6",
  measurementId: "G-L9X854L4WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



