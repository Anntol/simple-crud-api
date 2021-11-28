import personService from './person.service.js';
import { getBody } from '../getBody.js';
import { validate } from 'uuid';

const StatusCodes = {
    "Ok": 200,
    "Created": 201,
    "NoContent": 204,
    "BadRequest": 400,
    "NotFound": 404
}

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
        res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
}

async function addPerson(req, res) {
    try {
        getBody(req, res, function () {        
            personService.add(req.body).then((newPerson) => {
                res.writeHead(StatusCodes.Created, { 'Content-Type': 'application/json' });
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

        res.writeHead(StatusCodes.Ok, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(persons));
    } catch (error) {
        console.error(error);
    }
}

async function getPerson(req, res, id) {
    try {
        if (!validate(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Id is invalid!' }));
        }

        const person = await personService.getById(id);
        if(!person) {
            res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            res.writeHead(StatusCodes.Ok, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(person));
        }
    } catch (error) {
        console.error(error);
    }
}

async function updatePerson(req, res, id) {
    try {
        if (!validate(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Id is invalid!' }));
        }

        const person = await personService.getById(id);
        if(!person) {
            res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            getBody(req, res, function () { 
                personService.update(id, req.body).then((updPerson) => {
                    res.writeHead(StatusCodes.Ok, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify(updPerson));    
                });                
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function deletePerson(req, res, id) {
    try {
        if (!validate(id)) {
            res.writeHead(StatusCodes.BadRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Id is invalid!' }));
        }

        const person = await personService.getById(id);
        if(!person) {
            res.writeHead(StatusCodes.NotFound, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Person Not Found' }));
        } else {
            await personService.remove(id);
            res.writeHead(StatusCodes.NoContent);
            res.end();
        }
    } catch (error) {
        console.error(error);
    }
}
