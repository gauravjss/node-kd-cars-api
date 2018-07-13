var mongoose = require('mongoose');


var Showroom = mongoose.model('Showroom',{
    make: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    model: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    color: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    mileage: {
        type: Number,
        default: 0
    }
});

module.exports = {Showroom}