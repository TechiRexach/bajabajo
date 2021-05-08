const {Router} = require('express');
const authRouter = new Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const createToken = require('../services/services');

authRouter.post('/signup', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = new User({
            email: email,
            password: password
        });

        const emailRegistered = await User.findOne({email: req.body.email});
        if(emailRegistered){
            return res.status(401).send("Este email ya está registrado");
        }

        user.save()
        .then(newUser => {
            return res.status(200).send({message: `Gracias por registrarte. Por favor, espera mientras creamos tu perfil...`, token: createToken(newUser)});
        })
        
    }

    catch (error){
        return res.status(400).send(error.message);
    };
});

// POST: REALIZAR LOGIN DE USUARIO YA REGISTRADO
//ASYNC / AWAIT

authRouter.post('/login', async (req, res) =>{

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({email: email});

        if(!user){
        return res.status(401).send('Email no registrado');
        };

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send('Contraseña invalida');
        }
            
        return  res.status(200).send({message: `¡Bienvenid@ de nuevo!`, token: createToken(user)});
    }
    catch (error){
       return res.status(400).send(error.message)
    };
});

module.exports = authRouter;

