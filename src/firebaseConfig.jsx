import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCCm8jeP6jbqUfuAQ1bya_qYrLE4voOc5U",
    authDomain: "ceshephard-fbf87.firebaseapp.com",
    projectId: "ceshephard-fbf87",
    storageBucket: "ceshephard-fbf87.appspot.com",
    messagingSenderId: "356262946",
    appId: "1:356262946:web:cea947486a66e7d5c5567b",
    measurementId: "G-1M9D0E3HDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


