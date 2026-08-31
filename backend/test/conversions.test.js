import assert from 'node:assert/strict';
import test from 'node:test';
import { convert } from '../src/conversions.js';

test('convertit les pieds en mètres', () => {
  assert.equal(convert('length', 10, 'ft', 'm'), 3.048);
});

test('convertit les litres en gallons américains', () => {
  assert.ok(Math.abs(convert('volume', 10, 'l', 'gal_us') - 2.64172) < 0.00001);
});

test('convertit les températures avec décalage', () => {
  assert.equal(convert('temperature', 32, 'f', 'c'), 0);
  assert.equal(convert('temperature', 0, 'c', 'k'), 273.15);
});

test('rejette une valeur non numérique', () => {
  assert.throws(() => convert('length', 'abc', 'm', 'ft'), /nombre valide/);
});
