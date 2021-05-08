const {Schema, model} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error ('El email no es válido')
            };
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.pre('save', function (next){

    let user = this;

    if(user.isNew || user.isModified('password')){
       
        bcrypt.hash(user.password, 12, (err, encryptPassword) => {
            if(err){ 
                next(err)
            }
            else{
                user.password = encryptPassword;
                next()
            }
        });
    }
    else{
    next()
    }
})

module.exports = User = model('User', userSchema);