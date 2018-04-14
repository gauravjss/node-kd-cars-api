//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(
    'mongodb://localhost:27017/TodoApp',
    (err, client) => {
       if(err){
         return console.log('Unable to connect to the Mongo DB Server');
       }
       console.log('Connected to Mongo DB server');
       const db = client.db('TodoApp');

       //findOneAndUpdate
       /* db.collection('Todos').findOneAndUpdate({
                text: 'Eat Lunch'
            },{
                $set: {
                    completed: true
                }
            },{
                returnOriginal: false
            }).then(
            (result) => {
                console.log(result);
            }
        )*/

        db.collection('Users').findOneAndUpdate({
            name: 'Gaurav'
        },{
            $set: {
                name: 'Suyash Srivastava'
            },
            $inc: {
                age: -31
            }
        },{
            returnOriginal: false
        }).then(
            (result) => {
                console.log(result);
            }
        )

       //client.close();
    });

