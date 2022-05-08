const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

routes.get('/', (req, res) => {

    const results = connect.getCollection().find();

    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log(`Returned Contacts Successfully`);
    });
});

routes.get('/:id', (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const results = connect.getCollection().find({
        _id: contactId
    });

    results.toArray().then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`Returned Contact ${req.params.id}`);
    });
});

routes.post('/', (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const results = connect.getCollection().find().insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error occurred while creating the contact.');
    }
});

routes.put('/:id', (req, res) => {
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const results = connect.getCollection()
        .getDb()
        .db()
        .collection('contacts')
        .replaceOne({
            _id: userId
        }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while updating the contact.');
    }
});

routes.delete('/:id', (req, res) => {
    const userId = new ObjectId(req.params.id);
    const results = connect.getCollection().remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occurred while deleting the contact.');
    }
});

module.exports = routes;