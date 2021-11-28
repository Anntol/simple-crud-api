export default function checkPersonValidation(body) {    
    const {name, age, hobbies} = body;
    if (!name || typeof(name) !== 'string' ||
        !age || typeof(age) !== 'number' ||
        !Array.isArray(hobbies)) {
        return false;
    }
    return true;
}