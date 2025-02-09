// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFY4reQAE_7E4qBRaa_-5w6f4wrOSqzfQ",
    authDomain: "friday-654ee.firebaseapp.com",
    projectId: "friday-654ee",
    storageBucket: "friday-654ee.firebasestorage.app",
    messagingSenderId: "675599965748",
    appId: "1:675599965748:web:3a0f8ea0c0b43082783461",
    measurementId: "G-QS3F55G0H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, getDocs, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
