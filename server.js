const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const db = require('./firebase'); // 👈 Cloud database

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Movie App API is running...");
});


// 🔍 SEARCH MOVIES (API)
app.get('/search', async (req, res) => {
    const query = req.query.q;

    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// =============================
// 🚀 CRUD – WATCHLIST
// =============================

// ➕ Add Movie
app.post('/watchlist', async (req, res) => {
    try {
        const movie = req.body;
        await db.collection('watchlist').add(movie);
        res.send("Movie added!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// 📖 Get Movies
app.get('/watchlist', async (req, res) => {
    try {
        const snapshot = await db.collection('watchlist').get();
        let movies = [];

        snapshot.forEach(doc => {
            movies.push({ id: doc.id, ...doc.data() });
        });

        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// ❌ Delete Movie
app.delete('/watchlist/:id', async (req, res) => {
    try {
        await db.collection('watchlist').doc(req.params.id).delete();
        res.send("Movie deleted!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// ✏️ Update Movie (Favorite)
app.put('/watchlist/:id', async (req, res) => {
    try {
        await db.collection('watchlist').doc(req.params.id).update(req.body);
        res.send("Movie updated!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));