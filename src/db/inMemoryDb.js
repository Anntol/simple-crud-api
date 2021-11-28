const db = {
    Persons: []
};

const getAllEntities = tableName => db[tableName];

const getEntity = (tableName, id) => {
    const entity = db[tableName].filter((item) => item.id === id);

    return entity.length ? entity[0] : null;
}

const addEntity = (tableName, entity) => {
    
    db[tableName].push(entity);

    return getEntity(tableName, entity.id);
}

const deleteEntity = (tableName, id) => {
    const index = db[tableName].findIndex((item) => item.id === id);
    if (index >= 0){
        db[tableName].splice(index, 1);
    };
    return true;
};

const updateEntity = (tableName, id, entity) => {
    const index = db[tableName].findIndex((item) => item.id === id);
    if (index >= 0){
        const updEntity = entity;
        updEntity.id = id;

        db[tableName][index] = updEntity;
    };

    return getEntity(tableName, id);
}

export { addEntity, deleteEntity, getAllEntities, getEntity, updateEntity }