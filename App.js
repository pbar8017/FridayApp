import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginPage from "./pages/LoginPage";  // ✅ Make sure this is correct
import MainPage from "./pages/MainPage";    // ✅ Ensure this import is correct

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/main" /> : <LoginPage />} />
                <Route path="/main" element={user ? <MainPage user={user} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
