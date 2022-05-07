const express = require('express');
const routes = require('./contacts');
const router = express.Router();

routes.use('/contacts', require('./contacts'));

module.exports = routes;