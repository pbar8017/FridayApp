import { addGoal, getUserGoals } from "./database.js";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

// Test User Login
const email = "testuser@example.com";
const password = "password123";

signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("✅ User logged in:", auth.currentUser.email);

        // Test Adding a Goal
        addGoal("Finish Firebase Authentication");

        // Test Retrieving Goals (delay to allow Firestore update)
        setTimeout(() => {
            getUserGoals();
        }, 2000);
    })
    .catch((error) => {
        console.error("🔥 Login error:", error.message);
    });
