import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { industries } from './data.js';
import { professions, professionBySlug, groups, featuredSlugs } from './professions.js';
export { featuredSlugs };

export function validateProfessions() {
  const errors = [];
  const slugs = new Set();
  for (const p of professions) {
    if (slugs.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`);
    slugs.add(p.slug);
    if (!/^[a-z]+(?:-[a-z]+)*$/.test(p.slug)) errors.push(`invalid slug: ${p.slug}`);
    if (!industries.some(i => i.id === p.family)) errors.push(`${p.slug}: unknown family ${p.family}`);
    if (!groups.includes(p.group)) errors.push(`${p.slug}: unknown group ${p.group}`);
    if (!Array.isArray(p.needs) || p.needs.length !== 3) errors.push(`${p.slug}: needs must have length 3`);
    if (!Array.isArray(p.checks) || p.checks.length !== 3) errors.push(`${p.slug}: checks must have length 3`);
    if (!Array.isArray(p.faq) || p.faq.length < 2) errors.push(`${p.slug}: faq must have at least 2 entries`);
    if (!Array.isArray(p.services) || p.services.length < 1) errors.push(`${p.slug}: services required`);
    const asset = new URL(`./assets/${p.image}.jpg`, import.meta.url);
    if (!existsSync(asset)) errors.push(`${p.slug}: missing asset ${p.image}.jpg`);
    for (const slug of p.related || []) {
      if (slug === p.slug) errors.push(`${p.slug}: self related`);
      else if (!professionBySlug(slug)) errors.push(`${p.slug}: unknown related ${slug}`);
    }
  }
  for (const slug of featuredSlugs) {
    if (!professionBySlug(slug)) errors.push(`featured slug missing: ${slug}`);
  }
  return errors;
}
