import Person from './person.model.js';
import personsRepo from './person.memory.repository.js';

const getAll = () => personsRepo.getAll();

const getById = (id) => personsRepo.getById(id);

const add = (person) => personsRepo.add(new Person(person));

const remove = (id) => personsRepo.remove(id);

const update = (id, person) => personsRepo.update(id, new Person(person));

export default { add, getAll, getById, remove, update };