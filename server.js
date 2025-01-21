// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mssql = require('mssql');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Azure SQL Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

// Connect to Azure SQL Database
mssql.connect(dbConfig).then(pool => {
    if (pool.connecting) console.log("Connecting to the database...");
    if (pool.connected) console.log("Connected to the database.");
}).catch(err => console.error("Database connection failed:", err));

// Register user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Username, email, and password are required.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const request = new mssql.Request();
        await request
            .input('username', mssql.VarChar, username)
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, hashedPassword)
            .query('INSERT INTO Users (Username, Email, Password) VALUES (@username, @email, @password)');

        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user.');
    }
});

// Login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    try {
        const request = new mssql.Request();
        const result = await request
            .input('username', mssql.VarChar, username)
            .query('SELECT Password FROM Users WHERE Username = @username');

        if (result.recordset.length === 0) {
            return res.status(404).send('User not found.');
        }

        const storedPassword = result.recordset[0].Password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (isPasswordValid) {
            res.status(200).send('Login successful!');
        } else {
            res.status(401).send('Invalid credentials.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user.');
    }
});

// Start server
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
