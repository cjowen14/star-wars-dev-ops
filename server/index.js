const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;

const{getMovies, deleteMovie, createMovie, updateMovie} = require('./controller.js');

let app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'));
})

app.use(cors());
app.use(express.json());

app.get('/api/movies', getMovies);
app.delete('/api/movies/:id', deleteMovie);
app.post('/api/movies', createMovie);
app.put('/api/movies/:id', updateMovie);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})