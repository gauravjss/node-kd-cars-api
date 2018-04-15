const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var TodoRoutes = require('./routes/TodoRoutes');
var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', TodoRoutes.postRoute);
app.get('/todos', TodoRoutes.getRoute);
app.get('/todos/:id', TodoRoutes.getByIdRoute);
app.delete('/todos/:id', TodoRoutes.deleteRoute);
app.patch('/todos/:id', TodoRoutes.patchRoute);

app.listen(port, () => {
    console.log(`Started up at Port ${port}`);
});