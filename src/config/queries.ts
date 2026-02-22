import { pg } from './db.js';

export async function getUsers() {
  return await pg`SELECT * FROM users`;
}

export async function addUser(name: string, surname: string, age: number) {
  await pg`INSERT INTO users (name, surname, age) VALUES (${name}, ${surname}, ${age})`;
}

export async function deleteUser(userID: string) {
  await pg`DELETE FROM users WHERE id = ${userID}`;
}
