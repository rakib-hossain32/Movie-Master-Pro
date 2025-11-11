// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ifWA1jqUhllCNcmDuDdJHPCek2fQBOU",
  authDomain: "movies-master-pro.firebaseapp.com",
  projectId: "movies-master-pro",
  storageBucket: "movies-master-pro.firebasestorage.app",
  messagingSenderId: "731543607196",
  appId: "1:731543607196:web:139805e655847161511a59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
