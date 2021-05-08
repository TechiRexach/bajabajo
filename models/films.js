const {Schema, model} = require('mongoose');

const filmSchema = new Schema({
    title:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});


module.exports = Film = model('Film', filmSchema);