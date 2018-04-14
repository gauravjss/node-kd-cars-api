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

     /*db.collection('Todos').find({
         _id: new ObjectID('5ad225e08248463d68ba3d89')
     }
     ).toArray().then(
         (docs) => {
             console.log('Todos');
             console.log(JSON.stringify(docs,undefined,2))
         }, (err) => {
             console.log('Unable to fetch Todos',err);
        }
     )*/

        db.collection('Todos').find()
            .count().then(
            (count) => {
                console.log(`Todos count: ${count}`);
            }, (err) => {
                console.log('Unable to fetch Todos',err);
            }
        )

        db.collection('Users').find(
            {name: 'Gaurav'}
        ).count().then(
            (count) => {
                console.log(`Users with name Gaurav: ${count}`);
            }, (err) => {
                console.log('Unable to fetch Todos',err);
            }
        )
       //client.close();
    });

