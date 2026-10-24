import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,freePromptText,serviceBriefText} from '../model.js';
import {servicePlanPage} from '../pages.js';
import {homepagePaths} from '../components.js';
import {serviceChoices,routes} from '../data.js';

test('service paths resolve without changing the calculator rate table',()=>{
 const cards=homepagePaths();
 assert.doesNotMatch(cards,/\sdisabled(?:\s|>)/);
 for(const plan of serviceChoices.filter(x=>!x.free)){
  const path=`/what-we-do?service=${plan.id}`;
  assert.ok(cards.includes(path));assert.ok(routes[new URL(path,'http://localhost').pathname]);
  assert.ok(servicePlanPage(plan.id,defaults).includes(plan.title));
  assert.ok(serviceBriefText(plan.id,defaults).includes('No information has been sent'));
 }
 assert.match(servicePlanPage('unknown',defaults),/Taken care of/);
 assert.throws(()=>serviceBriefText('unknown',defaults),/Unknown service/);
});
test('free prompt uses chosen industry and truthful website context',()=>{
 const text=freePromptText({...defaults,industry:'dental',url:'https://example.test/'});
 assert.match(text,/Dental practice/);assert.match(text,/https:\/\/example.test\//);
 assert.match(text,/not analyzed/);assert.match(text,/Do not invent testimonials/);
 assert.doesNotMatch(text,/Evergreen|Forma/);
});
test('service notes stay escaped on screen and plain text in local briefs',()=>{
 const notes='<img src=x onerror=alert(1)> & "priorities"';
 const html=servicePlanPage('marketing',defaults,notes);
 assert.ok(!html.includes(notes));assert.ok(html.includes('&lt;img'));
 assert.ok(serviceBriefText('marketing',defaults,notes).includes(notes));
});
