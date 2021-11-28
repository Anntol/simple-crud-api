import personService from './person.service.js';
import { getBody } from '../getBody.js';

export default function route(req, res) {
    if(req.url === '/person' && req.method === 'GET') {
        getPersons(req, res);
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        getPerson(req, res, id);
    } else if(req.url === '/person' && req.method === 'POST') {
        addPerson(req, res);
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[2]
        updatePerson(req, res, id);
    } else if(req.url.match(/\/person\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        deletePerson(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
}

async function addPerson(req, res) {
    try {
        getBody(req, res, function () {        
            personService.add(req.body).then((newPerson) => {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(newPerson));
            });
        });
    } catch (error) {
        console.error(error);
    }
}

async function getPersons(req, res) {
    try {
        const persons = await personService.getAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(persons));
    } catch (error) {
        console.error(error);
    }
}

async function getPerson(req, res, id) {
    try {
        const person = await personService.getById(id);

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(person));
        }
    } catch (error) {
        console.error(error);
    }
}

async function updatePerson(req, res, id) {
    try {
        const person = await personService.getById(id);

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            const updPerson = await personService.update(id, req.body);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updPerson));
        }

    } catch (error) {
        console.error(error);
    }
}

async function deletePerson(req, res, id) {
    try {
        const person = await personService.getById(id);

        if(!person) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            await person.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Person ${id} removed` }));
        }
    } catch (error) {
        console.error(error);
    }
}
