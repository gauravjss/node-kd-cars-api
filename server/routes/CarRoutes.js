
var carJsonFile = require("../models/Cars.json");
var carDriverJsonFile = require("../models/Car-Driver.json");
var airlinesJsonFile = require("../models/Airlines.json");

exports.getCarRoute = (req,res) => {

        res.json(carJsonFile);
}

exports.getCarDriverRoute = (req,res) => {

    res.json(carDriverJsonFile);
}

exports.getAirlinesRoute = (req,res) => {

    res.json(airlinesJsonFile);
}