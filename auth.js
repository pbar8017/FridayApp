import { auth, createUserWithEmailAndPassword } from "./firebase";

const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
    } catch (error) {
        console.error("Signup error:", error.message);
    }
};

export { signUp };

import { auth, signInWithEmailAndPassword } from "./firebase";

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
    } catch (error) {
        console.error("Login error:", error.message);
    }
};

export { login };
