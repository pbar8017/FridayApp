import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./Auth";
import Goals from "./Goals";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Friday App - Goal Setting</h1>
            {user ? <Goals user={user} /> : <Auth setUser={setUser} />}
        </div>
    );
};

export default App;
