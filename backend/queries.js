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
    console.log(newClient);
    pool.query('INSERT INTO clients (name, surname, email) VALUES ($1, $2, $3)',[newClient.name, newClient.surname, newClient.email], (error, result) => {
        if(error) throw error;
        res.status(201).json({message: 'Client added!'});
    });
};

module.exports = {
    getClients,
    createClient
}