const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./dbConnection');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase()
    .then(pool => {
        // Example route using the database connection
        app.get('/users', async (req, res) => {
            try {
                const result = await pool.request().query('SELECT * FROM Users');
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            }
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
