import http from 'http';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5500;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Server works!</h1>');
    res.end();
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
