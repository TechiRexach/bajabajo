require('dotenv').config();
const {Router} = require('express');
const axios = require ('axios')
const apiRouter = new Router();
const isAuth = require('../services/middlewareIsAuth');
const Film = require('../models/films');

// GET INPUT
apiRouter.get('/search/:filmName', async (req, res) => {

    const title = req.params.filmName

    
        const films = await axios.get(`http://www.omdbapi.com/?apikey=959abc59&s=${title}&type=movie`)
        const data = films.data

        res.status(200).send({data})
})

//GET SELECTED FILM
apiRouter.get('/film/:id', async (req, res) => {
    
    const movieId = req.params.id
    
    const films = await axios.get(`http://www.omdbapi.com/?apikey=959abc59&i=${movieId}`)
    const selectedFilm = films.data
    
    res.status(200).send({selectedFilm})

})

//ADD FAVOURITE
apiRouter.post('/catalog', isAuth, async (req, res) => {
    
    const user = req.user.sub
    const filmName = req.body.Title
    
    const films = await axios.get(`http://www.omdbapi.com/?apikey=959abc59&t=${filmName}`)

    const newFilm = new Film({
        user: user,
        title: films.data.Title
    })

    newFilm.save()
    .then(addedFilm => res.status(200).send({message: 'Se ha añadido esta película a "FAVORITOS"', addedFilm}))
    .catch(error => res.status(400).send({message:'Se ha producido un error', error}))
})

//SEE ALL LIKED
apiRouter.get('/catalog/likes', isAuth, async (req, res) => {

    const id = req.user.sub
    
    Film.find({user: id})
    .populate('user', 'email')
    .exec((err, films) => {
        if(err){
            return res.status(404).send({message: "No hay peliculas", err})
        }
        return res.status(200).send({message: 'FAVORITOS', films});
    })
  
})

module.exports = apiRouter;