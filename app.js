const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const connect = require('./db/connect');

//connect.initDb();

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const uri = "";
MongoClient.connect(process.env.MONGODB_URI, function(err, db){
    if (err) throw err;
    var dbo = db.db("contacts");
    dbo.collection("contacts").find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
