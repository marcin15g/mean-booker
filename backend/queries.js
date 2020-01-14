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
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getClients
}