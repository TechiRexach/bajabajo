const jwt = require('jsonwebtoken');
require('dotenv').config();
const {env: {SECRET_TOKEN}} = process;

function isAuth (req, res, next){

    const token = req.headers["authorization"]
    if(!token){
        return res.status(401).send("Tienes que estar identificado para añadir peliculas a tu lista.")
    }

    jwt.verify(token.split(" ")[1], SECRET_TOKEN, (err, decode) => {
        if(err){
            return res.status(401).send("Haz login para añadir peliculas a tu lista.");
        } else {
            req.user = decode;
            next()
        }
    })
}

module.exports = isAuth;