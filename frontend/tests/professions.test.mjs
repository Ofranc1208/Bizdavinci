import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {professions,professionBySlug,professionPath} from '../professions.js';
import {industries,routes} from '../data.js';
import {defaults,sanitizeState,conceptForState,proposalText,matchesProfessionSearch} from '../model.js';
import {industriesPage,professionPage,faqPage,whatWeDoPage} from '../pages.js';

test('profession registry resolves unique routes, related pages, assets and design families',()=>{
 assert.equal(new Set(professions.map(p=>p.slug)).size,professions.length);
 for(const p of professions){
  assert.match(p.slug,/^[a-z]+(?:-[a-z]+)*$/);assert.ok(routes[professionPath(p.slug)]);
  assert.ok(industries.some(i=>i.id===p.family));assert.ok(existsSync(new URL('../assets/'+p.image+'.jpg',import.meta.url)));
  for(const slug of p.related){assert.notEqual(slug,p.slug);assert.ok(professionBySlug(slug));}
 }
});
test('profession context survives restoration, selects its family and reaches the proposal',()=>{
 for(const p of professions){
  const s=sanitizeState({...defaults,industry:'home',profession:p.slug,addons:['booking'],care:true});
  assert.equal(s.industry,p.family);assert.equal(s.profession,p.slug);
  assert.equal(conceptForState(s).name,p.brand);assert.deepEqual(conceptForState(s).services,p.services);
  const draft=proposalText(s);assert.ok(draft.includes(p.name));assert.ok(draft.includes(p.brand));assert.match(draft,/No information has been sent/);
 }
 assert.equal(sanitizeState({...defaults,profession:'unknown'}).profession,'');
});
test('editorial page links resolve to registered routes and profession query contexts',()=>{
 for(const html of [industriesPage(),faqPage(),whatWeDoPage(),...professions.map(professionPage)]){
  assert.doesNotMatch(html,/undefined|\[object Object\]/);
  for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
   const url=new URL(href,'http://localhost/industries');
   assert.ok(routes[url.pathname],href);
   if(url.searchParams.has('profession'))assert.ok(professionBySlug(url.searchParams.get('profession')));
  }
 }
});
test('profession discovery matches aliases, separate words and accents',()=>{
 const advisor=professionBySlug('financial-advisors');
 assert.ok(matchesProfessionSearch(advisor.name+' '+advisor.keywords.join(' '),'financial advisor'));
 const cpa=professionBySlug('cpa-firms');
 assert.ok(matchesProfessionSearch(cpa.name+' '+cpa.keywords.join(' '),'certified accountant'));
 assert.ok(matchesProfessionSearch('Cafés & bakeries','cafe'));
 assert.ok(matchesProfessionSearch('Plumbers','  '));
 assert.equal(matchesProfessionSearch('Plumbers','CPA'),false);
});
