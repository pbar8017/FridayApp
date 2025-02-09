import { db } from "./firebase.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from "./firebase.js"; // ✅ Import auth

// Function to Add a Goal (Authenticated User Only)
export const addGoal = async (goalText) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("❌ No user logged in");
            return;
        }

        await addDoc(collection(db, "goals"), {
            userId: user.uid,
            goalText,
            createdAt: new Date()
        });

        console.log("✅ Goal added for:", user.email);
    } catch (error) {
        console.error("🔥 Error adding goal:", error.message);
    }
};

// Function to Retrieve Goals for the Logged-In User
export const getUserGoals = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            console.error("❌ No user logged in");
            return;
        }

        const q = query(collection(db, "goals"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        let goals = [];
        querySnapshot.forEach((doc) => {
            goals.push({ id: doc.id, ...doc.data() });
        });

        console.log("✅ Retrieved goals for:", user.email, goals);
        return goals;
    } catch (error) {
        console.error("🔥 Error fetching goals:", error.message);
    }
};
