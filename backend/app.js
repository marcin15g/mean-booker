const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-Width, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();
});

app.get('/api/clients', db.getClients);



app.post('/api/clients', (req, res, next) => {
    res.status(200).json({res: 'Fetched successfuly!'});
});


module.exports = app;