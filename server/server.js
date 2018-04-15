const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) =>{
        res.send({
            todos,
            code:'message from KD'
        })
    }, (e) => {
        res.status(400).send(e);
    })
});


app.get('/todos/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }
    Todo.find({
        _id: id
        }).then((todoByID) =>{
            if(todoByID != '' ){
                res.send({
                    todoByID,
                    code:'message from KD'
                })
            }else{
                res.status(404).send({
                    message:'There is no Record with this ID',
                    code:'message from KD'
                })
            }

    }, (e) => {
        res.status(400).send(e);
    })
});


app.delete('/todos/:id', (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(todo){
            res.send({
                todo,
                code:'Deleted from DB'
            })
        }
        else{
            res.status(404).send({
                message:'There is no Record with this ID',
                code:'message from KD'
            })
        }
    }, (e) => {
        res.status(400).send(e);
    });

});


app.patch('/todos/:id', (req,res) => {

    const id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        res.status(404).send('The ID is Invalid');
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    // new : true returns the updated object
    Todo.findByIdAndUpdate(id, {$set: body},{new: true})
        .then((todo) => {
            if(todo){
                res.send({
                    todo,
                    code:'Updated at DB'
                })
            }
            else{
                res.status(404).send({
                    message:'There is no Record with this ID',
                    code:'message from KD'
                })
            }
        }, (e) => {
            res.status(400).send(e);
        });

});

app.listen(port, () => {
    console.log(`Started up at Port ${port}`);
});

