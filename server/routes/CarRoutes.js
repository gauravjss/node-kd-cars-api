
var carJsonFile = require("../models/Cars.json");
var carDriverJsonFile = require("../models/Car-Driver.json");
var airlinesJsonFile = require("../models/Airlines.json");
var accountsJsonFile = require("../models/Accounts.json");
var drugPriceJsonFile = require("../models/DrugPrice.json");
/*var drugTypeJsonFile = require("../models/DrugType.json");*/

exports.getCarRoute = (req,res) => {

        res.json(carJsonFile);
}

exports.getCarDriverRoute = (req,res) => {
    res.status(5500);
    res.json(carDriverJsonFile);
}

exports.getAirlinesRoute = (req,res) => {

    res.json(airlinesJsonFile);
}

exports.getAccountsRoute = (req,res) => {

    res.json(accountsJsonFile);
}

exports.getDrugTypeRoute = (req,res) => {

    res.json(drugPriceJsonFile);
}

exports.getDrugPriceRoute = (req,res) => {

    res.json(drugPriceJsonFile);
}