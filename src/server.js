import http from 'http';
import config from './config.js';
import route from './persons/person.router.js';

const HOST = config.HOST || 'localhost';
const PORT = config.PORT || 5500;

const server = http.createServer((req, res) => {
    route(req, res);
});

process.on('unhandledRejection', (err) => {
    const { message, stack } = err;
    console.error(`Unhandled rejection occured! ${message}. Stack: ${stack}`);
    process.exit(1);
});

server.listen(PORT, HOST,
    () => console.log(`Server running on ${HOST}:${PORT}`)
);
