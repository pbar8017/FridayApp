import { signUp, login, logout } from "./Auth.js"; // ✅ Add .js extension

// Test Signup
signUp("testuser@example.com", "password123");

// Test Login
setTimeout(() => {
    login("testuser@example.com", "password123");
}, 2000);

// Test Logout
setTimeout(() => {
    logout();
}, 4000);
