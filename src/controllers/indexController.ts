import type { User } from '../types.js';
import type { Context } from 'hono';
import { html } from 'hono/html';

import { getUsers, addUser, deleteUser } from '../config/queries.js';

export function indexController(c: Context) {
  return c.html(
    html`
      <h1>Homepage</h1>
      <a href="/about">About</a>
      <a href="/users">Users</a>
      <a href="/add">Add user</a>
    `,
  );
}

export function aboutController(c: Context) {
  return c.html(
    html`
      <h1>About page</h1>
    `,
  );
}

export async function usersController(c: Context) {
  const data = await getUsers();
  console.log(data);
  const users = data
    .map(
      (user: User) =>
        html`<div>
        <p><strong>Full name:</strong> ${user.name} ${user.surname || 'N/A'}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <form action="/${user.id}/delete" method="POST">
          <button type="submit">Delete</button>
        </form>
      </div>`,
    )
    .join('');

  return c.html(`
    <h1>Users</h1> 
    ${users}
    
    <a href="/add">Add user</a>
    `);
}

export function getAddFormController(c: Context) {
  return c.html(html`
    <form action="/add" method="POST">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" required />

      <label for="surname">Surname:</label>
      <input type="text" name="surname" id="surname" />

      <label for="age">Age:</label>
      <input type="number" name="age" id="age" />

      <button type="submit">Add</button>
    </form>
  `);
}

export async function postAddFormController(c: Context) {
  const { name, surname, age } = await c.req.parseBody();
  await addUser(String(name), String(surname), Number(age));
  return c.redirect('/users');
}

export async function deleteUserController(c: Context) {
  const userID = c.req.param('id');
  await deleteUser(userID);
  return c.redirect('/users');
}
