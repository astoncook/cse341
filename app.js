const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');

connect.initDb();

app
.use(bodyParser.json())
.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
