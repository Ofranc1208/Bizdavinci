import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { professions, professionPath } from '../professions.js';
import { routes } from '../data.js';
import { inventoryMarkdown } from '../scripts/inventory.mjs';

test('generated inventory lists every registered profession slug', () => {
  const markdown = inventoryMarkdown();
  assert.match(markdown, new RegExp(`Professions: \\*\\*${professions.length}\\*\\*`));
  assert.match(markdown, new RegExp(`Registered routes: \\*\\*${Object.keys(routes).length}\\*\\*`));
  for (const p of professions) {
    assert.match(markdown, new RegExp(`\`${professionPath(p.slug)}\``));
  }
});

test('browser pages do not import Node-only validate-content', () => {
  const pages = readFileSync(new URL('../pages.js', import.meta.url), 'utf8');
  assert.doesNotMatch(pages, /validate-content/);
});

test('PAGE_MAP profession table includes every current slug', () => {
  const pageMap = readFileSync(new URL('../../docs/PAGE_MAP.md', import.meta.url), 'utf8');
  for (const p of professions) {
    assert.match(pageMap, new RegExp(professionPath(p.slug).replace('/', '\\/')), p.slug);
  }
});
