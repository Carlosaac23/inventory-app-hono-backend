import type { Context } from "hono";
import { html } from "hono/html";

import { getUsers, addUser, deleteUser } from "../config/queries.js";

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
  return c.json({ data });
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
  return c.redirect("/users");
}

export async function deleteUserController(c: Context) {
  const userID = c.req.param("id");
  await deleteUser(userID);
  return c.redirect("/users");
}
