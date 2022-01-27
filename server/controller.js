const movies = require('./db.json');
let globalID = 9;

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '6bcd5a0efa4e48edb62edc3850999d2b',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },

    deleteMovie: (req, res) => {
        let index = movies.findIndex((movie) => {
            return movie.id === +req.params.id;
        })

        movies.splice(index, 1);
        res.status(200).send(movies);
    },

    createMovie: (req, res) =>{ 
        let {title, imageURL, rating} = req.body;
        let newMovie = {
            id: globalID,
            title,
            imageURL,
            rating
        }

        try{
            nonExist();
        }
        catch(err){
            rollbar.error("This doesn't exist");
        }
        movies.push(newMovie);
        res.status(200).send(movies);
        globalID++;
    },

    updateMovie: (req, res) =>{
        let{id} = req.params;
        let{type} = req.body
        let index = movies.findIndex((movie) => {
            return movie.id === +req.params.id;
        })

        if(movies[index].rating === 5 && type === 'plus'){
            res.status(400).send("Rating cannot be over 5");
        } 
        else if(movies[index].rating === 1 && type === 'minus'){
            res.status(400).send("Rating canndot be less than 1");
        }
        else if(type === 'plus'){
            movies[index].rating++;
            res.status(200).send(movies);
        }
        else if(type === 'minus'){
            movies[index].rating--;
            res.status(200).send(movies);
        }
        

    }
}