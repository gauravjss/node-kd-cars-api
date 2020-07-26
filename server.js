const _ = require('lodash');
const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');

const TodoRoutes = require('./server/routes/TodoRoutes');
const CarRoutes = require('./server/routes/CarRoutes');
const ShowRoomRoutes = require('./server/routes/CarShowroomRoutes');
const InventoryRoutes = require('./server/routes/InventoryManagerRoutes');

const {mongoose} = require('./server/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const {Client} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * FROM "Inventory_Manager";', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

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
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE,OPTIONS");
  next();
});

app.use(cors());

//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        pageTitle: 'Welcome to KD API',
        welcomeMessage: `This is the ReadMe page for the API's `
    })
});

app.get('/kdCarsApi',(req,res) =>{
    res.render('cars.hbs',{
        pageTitle:'Car Showroom API',
    });
});

app.get('/todosApi',(req,res) =>{
    res.render('todos.hbs',{
        pageTitle:'TO-DO API',
    });
});


app.post('/todos', TodoRoutes.postRoute);
app.get('/todos', TodoRoutes.getRoute);
app.get('/todos/:id', TodoRoutes.getByIdRoute);
app.delete('/todos/:id', TodoRoutes.deleteRoute);
app.patch('/todos/:id', TodoRoutes.patchRoute);

app.post('/kdCars', ShowRoomRoutes.postRoute);
app.get('/kdCars', ShowRoomRoutes.getRoute);
app.get('/kdCars/:id', ShowRoomRoutes.getByIdRoute);
app.delete('/kdCars/:id', ShowRoomRoutes.deleteRoute);
app.patch('/kdCars/:id', ShowRoomRoutes.patchRoute);
app.post('/kdCars/bulkPost',ShowRoomRoutes.bulkPostRoute);

app.post('/kdInventoryManager', InventoryRoutes.postRoute);
app.get('/kdInventoryManager', InventoryRoutes.getRoute);
app.get('/kdInventoryManager/:id', InventoryRoutes.getByIdRoute);
app.delete('/kdInventoryManager/:id', InventoryRoutes.deleteRoute);
app.patch('/kdInventoryManager/:id/:update/:quantity', InventoryRoutes.patchRoute);
app.post('/kdInventoryManager/bulkPost',InventoryRoutes.bulkPostRoute);
app.post('/kdInventoryLog', InventoryRoutes.postInventoryLogRoute);
app.get('/kdInventoryLog', InventoryRoutes.getInventoryLogRoute);

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
