const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5ad238d845f38e0284ba4cc2';


// Removes all the documents
/*
Todo.remove({}).then((result) => {
    console.log(result);
});*/

// Query only by ID
Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});

// Query with more than just id
Todo.findOneAndRemove({_id:id}).then((todo) => {
    console.log(todo);
});

