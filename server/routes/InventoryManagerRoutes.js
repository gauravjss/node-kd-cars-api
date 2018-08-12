var {Inventory} = require('../models/inventory');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
//var carJSON = require('../models/Cars')


exports.getRoute = (req,res) => {
    Inventory.find().then((inventory) =>{
        res.send({
            inventory,
            responseCode: 200,
            message:'Greetings from KD Home Inventory'
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
    Inventory.find({
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
            Inventory.create(req.body).then((doc) => {
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

    let requestInventoryItem = req.body;
    /*if(req.header('user') && req.header('user') === 'admin'){
        requestInventoryItem = carJSON;
    }*/
    requestInventoryItem =  _.uniqBy(requestInventoryItem, 'Name');
    Inventory.find().then((dbItems) => {
        requestInventoryItem = _.differenceBy(requestInventoryItem, dbItems,'Name');
    }).then(() =>{
        console.log(requestInventoryItem);
        Inventory.insertMany(requestInventoryItem).then((doc) => {
            res.send({
                message:`${doc.length} Records Created`,
                code: 200
            });
        }, (e) => {
            console.log(e);
            res.status(400).send(e);
        });
    });
}

exports.getByIdRoute = (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }
    Inventory.find({
        _id: id
    }).then((itemByID) =>{
        if(itemByID != '' ){
            res.send({
                itemByID: itemByID,
                code:'message from KD Inventory'
            })
        }else{
            res.status(405).send({
                message:'There is no Inventory Item with this ID',
                code:'message from KD Inventory'
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
    Inventory.findByIdAndRemove(id).then((item) => {
        if(item){
            res.send({
                item: item,
                code:'Deleted from DB'
            })
        }
        else{
            res.status(404).send({
                message:'There is no Inventory Item with this ID',
                code:'message from KD Inventory'
            })
        }
    }, (e) => {
        res.status(400).send(e);
    });

}

exports.patchRoute = (req,res) => {

    const id = req.params.id;
    const body = req.body; //_.pick(req.body,['Miles_per_Gallon','Cylinders','Displacement','Horsepower','Weight_in_lbs','Acceleration','Name','Year','Origin']);

    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }

    // new : true returns the updated object
    Inventory.findByIdAndUpdate(id, {$set: body},{new: true})
        .then((item) => {
            if(item){
                res.send({
                    item: item,
                    code:'Item Updated in Database'
                })
            }
            else{
                res.status(404).send({
                    message:'There is no Inventory Item with this ID',
                    code:'message from KD Inventory'
                })
            }
        }, (e) => {
            res.status(400).send(e);
        });
}