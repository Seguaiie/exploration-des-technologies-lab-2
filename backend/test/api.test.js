import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { app } from '../src/app.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test('retourne un état de santé positif', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('retourne les catégories publiques', async () => {
  const response = await fetch(`${baseUrl}/api/categories`);
  const categories = await response.json();
  assert.equal(response.status, 200);
  assert.ok(categories.length >= 3);
  assert.ok(categories.every((category) => category.units.length >= 2));
});

test('convertit une valeur par l’API', async () => {
  const response = await fetch(`${baseUrl}/api/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category: 'length', value: 10, from: 'ft', to: 'm' })
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    value: 10,
    from: 'ft',
    to: 'm',
    result: 3.048
  });
});

test('retourne une erreur compréhensible pour une valeur invalide', async () => {
  const response = await fetch(`${baseUrl}/api/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category: 'length', value: 'abc', from: 'm', to: 'ft' })
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /nombre valide/);
});

test('retourne une erreur JSON pour une route inconnue', async () => {
  const response = await fetch(`${baseUrl}/route-inconnue`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Route introuvable.' });
});
