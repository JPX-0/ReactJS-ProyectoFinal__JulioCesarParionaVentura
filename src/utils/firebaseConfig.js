// Import required functions 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP-BhQGXq7k1YvDrhUUrTr9xAeKuyIVP8",
  authDomain: "ecommerce-julioparionav.firebaseapp.com",
  projectId: "ecommerce-julioparionav",
  storageBucket: "ecommerce-julioparionav.appspot.com",
  messagingSenderId: "303690037148",
  appId: "1:303690037148:web:1a437f0f770b715211fa59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;