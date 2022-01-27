const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT;
let app = express();
const{getMovies, deleteMovie, createMovie, updateMovie} = require('./controller.js');

app.use(cors());
app.use(express.json());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6bcd5a0efa4e48edb62edc3850999d2b',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req, res) => {
    rollbar.info("HTML served successfully");
    res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'));
})

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/main.js'));
})

app.get('/controller', (req, res) => {
    res.sendFile(path.join(__dirname, './controller.js'));
})

app.get('/db', (req, res) => {
    res.sendFile(path.join(__dirname, './db.json'));
})


app.get('/api/movies', getMovies);
app.delete('/api/movies/:id', deleteMovie);
app.post('/api/movies', createMovie);
app.put('/api/movies/:id', updateMovie);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})