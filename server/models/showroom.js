var mongoose = require('mongoose');


/*
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
*/

var Showroom = mongoose.model('kdcar',{
    Name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    Year: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    Origin: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    Miles_per_Gallon: {
        type: Number,
        default: 0
    },
    Cylinders: {
        type: Number,
        default: 0
    },
    Displacement: {
        type: Number,
        default: 0
    },
    Horsepower: {
        type: Number,
        default: 0
    },
    Weight_in_lbs: {
        type: Number,
        default: 0
    },
    Acceleration: {
        type: Number,
        default: 0
    }
});


module.exports = {Showroom}