var {Showroom} = require('../models/showroom');
const {ObjectID} = require('mongodb');


exports.getRoute = (req,res) => {
    Showroom.find().then((cars) =>{
        res.send({
            cars,
            responseCode: 2000,
            message:'Greetings from KD Car Showroom'
        })
    }, (e) => {
        res.status(400).send(e);
    })
}

exports.postRoute  = (req, res) => {
    console.log(req.body);
    var car = new Showroom({
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        mileage: req.body.mileage,
    });
    car.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    })
}