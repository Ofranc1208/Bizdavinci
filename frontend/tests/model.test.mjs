import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,estimate,sanitizeState,normalizeUrl,proposalText,escapeHTML} from '../model.js';
test('configured scope totals, extra time and separate monthly care',()=>{
 const e=estimate({...defaults,packageId:'essential',addons:['copy','booking'],care:true});
 assert.equal(e.min,1450);assert.equal(e.max,2400);assert.deepEqual(e.weeks,[2,3]);assert.equal(e.monthly.min,79);
});
test('restored state rejects unknown options and prevents duplicate charges',()=>{
 const s=sanitizeState({industry:'bad',packageId:'bad',addons:['copy','copy','bad'],care:'true',style:'<script>',url:'javascript:alert(1)'});
 assert.equal(s.industry,'home');assert.equal(s.packageId,'growth');assert.deepEqual(s.addons,['copy']);assert.equal(s.care,false);assert.equal(s.url,'');assert.equal(s.style,'modern');
 assert.equal(estimate(s).min,2150);assert.deepEqual(sanitizeState(null),defaults);
});
test('URL input normalizes context without retaining query data or credentials',()=>{
 assert.equal(normalizeUrl(' example.com/path?q=private#anchor '),'https://example.com/path');
 assert.equal(normalizeUrl('www.example.com:8080/path'),'https://www.example.com:8080/path');
 for(const value of ['', 'bad address', 'localhost', 'javascript:alert(1)','ftp://example.com','https://user:pass@example.com'])assert.throws(()=>normalizeUrl(value));
});
test('proposal carries selections, uses real line breaks and never claims submission',()=>{
 const text=proposalText({...defaults,addons:['copy']},{name:'Demo Owner',email:'demo@example.test'});
 assert.match(text,/\$2,150–\$3,450/);assert.match(text,/Professional copywriting/);assert.match(text,/No information has been sent/);assert.ok(text.split('\n').length>15);assert.match(text,/not analyzed/);
});
test('user context is escaped before rendering as HTML',()=>assert.equal(escapeHTML('<img src=x onerror="x"> &'), '&lt;img src=x onerror=&quot;x&quot;&gt; &amp;'));
