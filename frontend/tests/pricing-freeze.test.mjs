import test from 'node:test';
import assert from 'node:assert/strict';
import { packages, addons, care } from '../data.js';
import { defaults, estimate } from '../model.js';

// Owner-frozen illustrative figures. Do not change data.js prices to satisfy this test.
const frozenPackages = {
  essential: { min: 950, max: 1450 },
  growth: { min: 1800, max: 2800 },
  rebuild: { min: 3200, max: 4800 }
};
const frozenAddons = {
  copy: { min: 350, max: 650 },
  seo: { min: 300, max: 600 },
  blog: { min: 200, max: 400 },
  booking: { min: 150, max: 300 },
  crm: { min: 250, max: 500 },
  reviews: { min: 100, max: 200 },
  performance: { min: 200, max: 450 },
  accessibility: { min: 250, max: 450 }
};

test('illustrative package, add-on and care ranges remain frozen', () => {
  for (const pkg of packages) {
    assert.deepEqual({ min: pkg.min, max: pkg.max }, frozenPackages[pkg.id], pkg.id);
  }
  for (const addon of addons) {
    assert.deepEqual({ min: addon.min, max: addon.max }, frozenAddons[addon.id], addon.id);
  }
  assert.equal(care.min, 79);
  assert.equal(care.max, 149);
});

test('care is billed separately and does not change one-time totals', () => {
  const without = estimate({ ...defaults, packageId: 'growth', addons: [], care: false });
  const withCare = estimate({ ...defaults, packageId: 'growth', addons: [], care: true });
  assert.equal(without.min, withCare.min);
  assert.equal(without.max, withCare.max);
  assert.equal(withCare.monthly.min, 79);
  assert.equal(withCare.monthly.max, 149);
  assert.equal(without.monthly, null);
});
