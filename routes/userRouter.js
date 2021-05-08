const {Router} = require('express');
const userRouter = new Router();
const User = require('../models/user');
const isAuth = require('../services/middlewareIsAuth');


//GET: VER TODOS LOS USUARIOS
userRouter.get('/', (req, res) => {
    return User.find({})
    .then(users => {
        return res.status(200).send(users)
    });
});

//GET: VER UN USUARIO SEGÚN SU ID.
userRouter.get('/myprofile', isAuth, (req, res) => {
    
    const id = req.user.sub

    User.findById(id, (err, user) => {
        if (err){
            return res.status(404).send('Esta id de usuario no existe');
        };
        return res.status(200).send(user);
    });
});

module.exports = userRouter;
