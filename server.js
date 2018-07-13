const _ = require('lodash');
const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');

var TodoRoutes = require('./server/routes/TodoRoutes');
var CarRoutes = require('./server/routes/CarRoutes');
var ShowRoomRoutes = require('./server/routes/CarShowroomRoutes')
var {mongoose} = require('./server/db/mongoose');

var app = express();
const port = process.env.PORT || 3000;

// Setting up the Partial Directory to Handlebar
hbs.registerPartials(__dirname + '/views/partials');

// Helper without Args.
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());

// Helper with Parameters
hbs.registerHelper('screamIt' ,(text)=> text.toUpperCase());

// Setting Up View Engine as Handlebar
app.set('view engine or anything else','hbs');

// Sharing the static folder to public -- This is Middleware Registering
app.use(express.static(__dirname + '/views'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle: 'Kd Labs API - Welcome Page',
        welcomeMessage: `This is the ReadMe page for the API's `
    })
});


app.post('/todos', TodoRoutes.postRoute);
app.get('/todos', TodoRoutes.getRoute);
app.get('/todos/:id', TodoRoutes.getByIdRoute);
app.delete('/todos/:id', TodoRoutes.deleteRoute);
app.patch('/todos/:id', TodoRoutes.patchRoute);

app.post('/kdCars', ShowRoomRoutes.postRoute);
app.get('/kdCars', ShowRoomRoutes.getRoute);


app.get('/cars', CarRoutes.getCarRoute);
app.get('/driverCars', CarRoutes.getCarDriverRoute);
app.get('/airlines', CarRoutes.getAirlinesRoute);
app.get('/accounts', CarRoutes.getAccountsRoute);
app.get('/drugType', CarRoutes.getDrugTypeRoute);
app.get('/drugPrice', CarRoutes.getDrugPriceRoute);


app.all('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Started up at Port ${port}`);
});
