import { db, collection, addDoc, getDocs } from "./firebase";

const addGoal = async (userId, goalText) => {
    try {
        await addDoc(collection(db, "goals"), {
            userId,
            goalText,
            createdAt: new Date()
        });
        console.log("Goal added!");
    } catch (error) {
        console.error("Error adding goal:", error);
    }
};

const getGoals = async () => {
    const querySnapshot = await getDocs(collection(db, "goals"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};

export { addGoal, getGoals };
