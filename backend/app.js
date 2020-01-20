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

app.get('/', (req,res) => {
    res.status(200).send('Server is working!');
});

app.get('/api/clients', db.getClients);
app.post('/api/clients', db.createClient);
app.get('/api/clients/:id', db.getClientById);
app.get('/api/rooms/:id', db.getRoomById);
app.get('/api/rooms', db.getRooms);
app.post('/api/reservations', db.createReservation);
app.get('/api/reservations', db.getReservations);


module.exports = app;