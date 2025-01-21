// dbConfig.js
const config = {
    user: process.env.DB_USER, // Azure SQL username
    password: process.env.DB_PASSWORD, // Azure SQL password
    server: process.env.DB_SERVER, // Azure SQL server (e.g., 'your-server.database.windows.net')
    database: process.env.DB_NAME, // Database name
    options: {
        encrypt: true, // Use encryption for Azure SQL
        trustServerCertificate: false, // Only use true for development/testing
    },
};

module.exports = config;

