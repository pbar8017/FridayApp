import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const MainPage = ({ user }) => {
    const [goalText, setGoalText] = useState("");
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        const q = query(collection(db, "goals"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        let userGoals = [];
        querySnapshot.forEach((doc) => {
            userGoals.push({ id: doc.id, ...doc.data() });
        });

        setGoals(userGoals);
    };

    const addGoal = async () => {
        if (!goalText) return;
        try {
            await addDoc(collection(db, "goals"), {
                userId: user.uid,
                goalText,
                createdAt: new Date()
            });

            setGoalText("");
            fetchGoals();
        } catch (error) {
            console.error("🔥 Error adding goal:", error.message);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome, {user.email}</h2>
            <input type="text" placeholder="Enter goal" value={goalText} onChange={(e) => setGoalText(e.target.value)} />
            <button onClick={addGoal}>Add Goal</button>

            <h3>Your Goals:</h3>
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>{goal.goalText}</li>
                ))}
            </ul>

            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default MainPage;
