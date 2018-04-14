var mongoose = require('mongoose')

var User = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true // Removes leading and trailing whitespaces
    }
});

module.exports = {User}
/*


var user = new User({
    email: '              gauravkds@gmail.com            '
});

user.save().then(
    (doc) => {
        console.log('Saved User',doc);
    },(e) => {
        console.log('Unable to Save',e);
    }
);*/
