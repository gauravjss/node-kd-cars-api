var mongoose = require('mongoose')

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Removes leading and trailing whitespaces
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo}


/*
var newTodo = new Todo({
    text: 'Walk the Dog'
});

newTodo.save().then(
    (doc) => {
        console.log('Saved Todo',doc);
    },(e) => {
        console.log('Unable to Save',e);
    }
);

var secondTodo = new Todo({
    text: '              Edit Video             ',
    completed: false,
    completedAt: Date.now()
});

secondTodo.save().then(
    (doc) => {
        console.log('Saved Todo',doc);
    },(e) => {
        console.log('Unable to Save',e);
    }
);*/