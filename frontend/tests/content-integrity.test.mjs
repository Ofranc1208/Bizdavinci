import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProfessions, featuredSlugs } from '../validate-content.mjs';
import { professions } from '../professions.js';
import { routes } from '../data.js';
import { professionPath } from '../professions.js';

test('profession registry passes schema validation', () => {
  const errors = validateProfessions();
  assert.deepEqual(errors, [], errors.join('; '));
});

test('every profession route is registered', () => {
  assert.equal(professions.length, 36);
  assert.equal(Object.keys(routes).length, 48);
  for (const p of professions) {
    assert.ok(routes[professionPath(p.slug)], p.slug);
  }
  for (const slug of featuredSlugs) {
    assert.ok(professions.some(p => p.slug === slug));
  }
});
