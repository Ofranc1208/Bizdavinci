import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHTML, proposalText, sanitizeState, defaults } from '../model.js';
import { demoSite } from '../components.js';
import { professionPage } from '../pages.js';

const xss = '<img src=x onerror="alert(1)">';

test('malicious concept fields are escaped inside demoSite markup', () => {
  const html = demoSite({
    id: 'home',
    name: xss,
    descriptor: xss,
    label: xss,
    image: '/assets/home.jpg',
    color: '#214c43',
    pale: '#edf3ed',
    headline: xss,
    sub: xss,
    action: xss,
    services: [xss],
    icon: 'home'
  });
  assert.doesNotMatch(html, /<img src=x onerror/);
  assert.match(html, /&lt;img src=x onerror/);
});

test('profession page escapes injected headline, FAQ and services', () => {
  const html = professionPage({
    slug: 'dentists',
    name: xss,
    group: 'Health & wellbeing',
    family: 'dental',
    brand: xss,
    descriptor: 'TEST',
    image: 'dental',
    title: xss,
    intro: xss,
    headline: xss,
    action: xss,
    services: [xss],
    needs: [['Safe', 'Body'], ['Two', 'Body'], ['Three', 'Body']],
    checks: ['a', 'b', 'c'],
    faq: [xss, xss],
    related: ['plumbers']
  });
  assert.doesNotMatch(html, /<img src=x onerror/);
  assert.match(html, /&lt;img src=x onerror/);
});

test('proposal draft keeps contact payload as plain text, not HTML', () => {
  const text = proposalText(sanitizeState(defaults), { name: xss, email: 'demo@example.test', notes: xss });
  assert.ok(text.includes(xss));
  assert.doesNotMatch(text, /<script>/);
});

test('escapeHTML covers quote and apostrophe contexts', () => {
  assert.equal(escapeHTML(`"'&<>`), '&quot;&#39;&amp;&lt;&gt;');
});
