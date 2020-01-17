const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

const getClients = (req, res) => {
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
        if(error) throw error;
        res.status(200).json({message: 'Clients fetched!', clientsArr: results.rows});
    });
};
const createClient = (req, res) => {
    const newClient = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    };
    pool.query('INSERT INTO clients (name, surname, email) VALUES ($1, $2, $3) RETURNING id',[newClient.name, newClient.surname, newClient.email], (error, result) => {
        if(error) throw error;
        res.status(201).json({message: 'Client added!', result: result.rows});
    });
};

const getRooms = (req, res) => {
    pool.query('SELECT * FROM rooms ORDER BY id ASC', (error, results) => {
        if(error) throw error;
        res.status(200).json({message: 'Rooms fetched!', roomsArr: results.rows});
    });
};

module.exports = {
    getClients,
    createClient,
    
    getRooms
}