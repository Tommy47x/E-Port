const express = require('express'); // Express is used to create the server
const app = express(); // Create the server
const cors = require('cors'); // CORS is used to allow requests from the client
app.use(cors());
app.use(express.json()); // Enable JSON parsing
const http = require('http'); // HTTP is used to create the server
const server = http.createServer({ maxHeaderSize: 8192 }, app); // Create the server
server.listen(3000); // Listen on port 3000, the Client on 3001
const authroutes = require('./authroutes'); // Import the auth routes
app.use('/auth', authroutes); // Use the auth routes
const router = express.Router(); // Router is used to create the routes (Links / URLS)
const dbQueries = require('../db/dbQueries'); // Import the database queries


app.use(cors({
    origin: 'http://localhost:3001' // replace with your origin
}));

app.post('/', async (req, res) => {
    const { question, answer } = req.body;
    console.log(question, answer);
    try {
        const result = await dbQueries.insertQuestion(question, answer);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the question.' });
    }
});




module.exports = router;






