const http = require('http');
const app = require('./backend/app');
const debug = require('debug')('booker-app');

const normalizePort = val => {
    var port = parseInt(val,10);
    if(isNaN(port)) return val;
    if(port >= 0) return port;
    return false;
}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + port;
    debug('Listening on ' + bind);
}

const onError = err => {
    if(err.syscall !== 'listen') throw error;
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + port;
    switch(err.code) {
        case "EACCES":
            console.error(bind + 'requires elevated privileges!');
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);