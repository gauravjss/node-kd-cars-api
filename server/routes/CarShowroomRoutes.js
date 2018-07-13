var {Showroom} = require('../models/showroom');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


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


exports.getByIdRoute = (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }
    Showroom.find({
        _id: id
    }).then((carByID) =>{
        if(carByID != '' ){
            res.send({
                carByID,
                code:'message from KD Cars'
            })
        }else{
            res.status(404).send({
                message:'There is no Car with this ID',
                code:'message from KD Cars'
            })
        }

    }, (e) => {
        res.status(400).send(e);
    })
}

exports.deleteRoute = (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }
    Showroom.findByIdAndRemove(id).then((car) => {
        if(car){
            res.send({
                car,
                code:'Deleted from DB'
            })
        }
        else{
            res.status(404).send({
                message:'There is no Car with this ID',
                code:'message from KD Cars'
            })
        }
    }, (e) => {
        res.status(400).send(e);
    });

}

exports.patchRoute = (req,res) => {

    const id = req.params.id;
    var body = _.pick(req.body,['make','model','color','mileage']);

    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }

    // new : true returns the updated object
    Showroom.findByIdAndUpdate(id, {$set: body},{new: true})
        .then((car) => {
            if(car){
                res.send({
                    car,
                    code:'Updated at DB'
                })
            }
            else{
                res.status(404).send({
                    message:'There is no Car with this ID',
                    code:'message from KD Cars'
                })
            }
        }, (e) => {
            res.status(400).send(e);
        });

}