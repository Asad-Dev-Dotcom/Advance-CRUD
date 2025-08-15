const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true
    },
    lastname : {type : String,
        required : true,
        trim : true},
    phone : Number,
    age : Number,
    gender : String,
    address : {
        country : String,
        state : String,
        city : String,
        street : String,
        house : String,
        postalcode : Number
    }

})


module.exports = mongoose.model('User', userSchema)