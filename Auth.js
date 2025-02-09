import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Auth = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("✅ Signed up:", userCredential.user.email);
        } catch (error) {
            console.error("🔥 Signup error:", error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("✅ Logged in:", userCredential.user.email);
        } catch (error) {
            console.error("🔥 Login error:", error.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        console.log("✅ Logged out");
    };

    return (
        <div>
            <h2>Authentication</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default Auth;
