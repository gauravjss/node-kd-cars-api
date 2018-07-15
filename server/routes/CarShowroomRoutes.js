var {Showroom} = require('../models/showroom');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var carJSON = require('../models/Cars')


exports.getRoute = (req,res) => {
    Showroom.find().then((cars) =>{
        res.send({
            cars,
            responseCode: 200,
            message:'Greetings from KD Car Showroom'
        })
    }, (e) => {
        res.status(400).send(e);
    })
}

exports.postRoute  = (req, res) => {
    console.log(req.body.length);
    if(req.body.length >1){
        res.send({
            message:`Please use Bulk Post service for multiple records`,
            code: 506,
            type: 'error'
        })
    }
    Showroom.find({
            Name : req.body.Name
        },
        function (err, docs) {
        if (docs.length){
            res.send({
                message:`Record already exists for :: ${docs[0].Name} :: having ID :: ${docs[0]._id}`,
                code: 505,
                type: 'error'
            });
        }else{
            Showroom.create(req.body).then((doc) => {
                res.send({
                    message:`Record created with ID :: ${doc._id}`,
                    code: 200
                });
            }, (e) => {
                res.status(400).send(e);
            });
        }
    });


}

exports.bulkPostRoute  = (req, res) => {

    var requestCars = req.body;
    if(req.header('user') && req.header('user') === 'admin'){
        requestCars = carJSON;
    }
    requestCars =  _.uniqBy(requestCars, 'Name');
    Showroom.find().then((dbCars) => {
        requestCars = _.differenceBy(requestCars, dbCars,'Name');
    }).then(() =>{
        console.log(requestCars);
        Showroom.insertMany(requestCars).then((doc) => {
            res.send({
                message:`${doc.length} Records Created`,
                code: 200
            });
        }, (e) => {
            res.status(400).send(e);
        });
    });
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
            res.status(405).send({
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
    var body = req.body; //_.pick(req.body,['Miles_per_Gallon','Cylinders','Displacement','Horsepower','Weight_in_lbs','Acceleration','Name','Year','Origin']);

    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }

    // new : true returns the updated object
    Showroom.findByIdAndUpdate(id, {$set: body},{new: true})
        .then((car) => {
            if(car){
                res.send({
                    car,
                    code:'Car Updated in Database'
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