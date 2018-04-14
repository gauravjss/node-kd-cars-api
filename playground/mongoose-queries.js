const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5ad238d845f38e0284ba4cc2';

if(!ObjectID.isValid(id)){
    return console.log('id not valid');
}

Todo.find({
        _id: id
    }).then((todos) => {
        console.log('Todos',todos);
})

Todo.findOne({
        completed: false
    }).then((todo) => {
        console.log('Todo Find One',todo);
})

Todo.findById(id).then((todo) => {
    console.log('Todo Find by ID',todo);
})