const Pool = require('pg').Pool;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql2.freesqldatabase.com',
    user: 'sql2319750',
    password: 'pM6*pA5!',
    database: 'sql2319750'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL!');
})

// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'api',
//     password: 'password',
//     port: 5432
// });

const getClients = (req, res) => {
    connection.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
        if(error) throw error;
        res.status(200).json({message: 'Clients fetched!', clientsArr: results});
    });
};
const createClient = (req, res) => {
    connection.query('INSERT INTO clients (name, surname, email) VALUES (?,?,?)',[req.body.name,req.body.surname,req.body.email], (error, result) => {
        if(error) throw error;
        res.status(201).json({message: 'Client added!', result: result.insertId});
    });
};

const getClientById = (req, res) => {
    const id = parseInt(req.params.id);
    connection.query('SELECT * FROM clients WHERE id = ?', [id] , (error, results) => {
        if(error) throw error;
        res.status(200).json(results)
    });
};

const getRoomById = (req, res) => {
    const id = parseInt(req.params.id);
    connection.query('SELECT * FROM rooms WHERE id = ?', [id] , (error, results) => {
        if(error) throw error;
        res.status(200).json(results);
    });
};

const getRooms = (req, res) => {
    connection.query('SELECT * FROM rooms ORDER BY id ASC', (error, results) => {
        if(error) throw error;
        res.status(200).json({message: 'Rooms fetched!', roomsArr: results});
    });
};

const createReservation = (req, res) => {
    connection.query('INSERT INTO reservations (client_id, room_id, code) VALUES (?,?,?)',[req.body.userId,req.body.roomId,req.body.code], (error, result) => {
        if(error) throw error;
        res.status(201).json({message: 'Reservation uploaded!'});
    });
};

module.exports = {
    getClients,
    createClient,
    getClientById,
    getRoomById,
    getRooms,
    createReservation
}