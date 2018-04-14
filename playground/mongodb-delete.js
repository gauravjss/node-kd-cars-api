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

       //deleteMany
      db.collection('Todos').deleteMany(
           {text: 'Lunch'}
       ).then(
           (result) => {
               console.log(result);
           }
       )

       //deleteOne
       db.collection('Todos').deleteOne(
            {text: 'Lunch'}
        ).then(
            (result) => {
                console.log(result);
            }
        )

       //findOneAndDelete
        db.collection('Todos').findOneAndDelete(
            {completed: false}
        ).then(
            (result) => {
                console.log(result);
            }
        )

       //client.close();
    });

