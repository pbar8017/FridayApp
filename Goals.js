import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Goals = ({ user }) => {
    const [goalText, setGoalText] = useState("");
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        if (user) {
            fetchGoals();
        }
    }, [user]);

    const fetchGoals = async () => {
        if (!user) return;

        const q = query(collection(db, "goals"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userGoals = [];
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

            console.log("✅ Goal added");
            setGoalText("");
            fetchGoals();
        } catch (error) {
            console.error("🔥 Error adding goal:", error.message);
        }
    };

    return (
        <div>
            <h2>Your Goals</h2>
            <input type="text" placeholder="Enter goal" value={goalText} onChange={(e) => setGoalText(e.target.value)} />
            <button onClick={addGoal}>Add Goal</button>

            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>{goal.goalText}</li>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
