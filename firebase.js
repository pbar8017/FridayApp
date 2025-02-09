import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFY4reQAE_7E4qBRaa_-5w6f4wrOSqzfQ",
    authDomain: "friday-654ee.firebaseapp.com",
    projectId: "friday-654ee",
    storageBucket: "friday-654ee.appspot.com", // ✅ FIXED
    messagingSenderId: "675599965748",
    appId: "1:675599965748:web:3a0f8ea0c0b43082783461",
    measurementId: "G-QS3F55G0H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("✅ Firebase initialized:", app);
console.log("✅ Firestore connected:", db);
console.log("✅ Auth initialized:", auth);

export { app, auth, db };
