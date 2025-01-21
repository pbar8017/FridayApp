require('dotenv').config(); // Load environment variables
const sql = require('mssql');
const dbConfig = require('./dbConfig');

const connectToDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to Azure SQL Database');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

module.exports = { connectToDatabase };
