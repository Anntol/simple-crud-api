import http from 'http';
import route from './persons/person.router.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5500;

const server = http.createServer((req, res) => {
    route(req, res);
});
server.listen(PORT, HOST,
    () => console.log(`Server running on ${HOST}:${PORT}`)
);
