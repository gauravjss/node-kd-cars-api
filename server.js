
const express = require('express');
const {mongoose} = require('./server/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const InventoryRoutes = require('./server/routes/InventoryManagerRoutes');

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
  
    res.redirect('/kdInventoryManager');
});


app.post('/kdInventoryManager', InventoryRoutes.postRoute);
app.get('/kdInventoryManager', InventoryRoutes.getRoute);
app.get('/kdInventoryManager/:id', InventoryRoutes.getByIdRoute);
app.delete('/kdInventoryManager/:id', InventoryRoutes.deleteRoute);
app.patch('/kdInventoryManager/:id/:update/:quantity', InventoryRoutes.patchRoute);
app.post('/kdInventoryManager/bulkPost',InventoryRoutes.bulkPostRoute);
app.post('/kdInventoryLog', InventoryRoutes.postInventoryLogRoute);
app.get('/kdInventoryLog', InventoryRoutes.getInventoryLogRoute);

app.all('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Started up at Port ${port}`);
});