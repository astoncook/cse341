const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');

connect.initDb();

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
