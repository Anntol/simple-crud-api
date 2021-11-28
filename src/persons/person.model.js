import { v4 } from 'uuid';

export default class Person {
  constructor({
    id = v4(),
    name = 'person name',
    age = 18,
    hobbies = []
  } = {}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }
}
