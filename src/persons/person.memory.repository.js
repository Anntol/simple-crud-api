import { addEntity, deleteEntity, getAllEntities, getEntity, updateEntity } from '../db/inMemoryDb.js';

const TABLE_NAME = 'Persons';

const getAll = async () => getAllEntities(TABLE_NAME);

const getById = async (id) => getEntity(TABLE_NAME, id);

const add = async (entity) => addEntity(TABLE_NAME, entity);

const remove = async (id) => deleteEntity(TABLE_NAME, id);

const update = async (id, entity) => updateEntity(TABLE_NAME, id, entity);

export default { add, getAll, getById, remove, update };