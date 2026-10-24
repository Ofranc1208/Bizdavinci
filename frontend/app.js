import {industries,packages,addons,care,report,routes,serviceChoices} from './data.js';
import {defaults,storageKey,sanitizeState,normalizeUrl,escapeHTML as h,estimate,range,proposalText,conceptForState,matchesProfessionSearch,freePromptText,serviceBriefText} from './model.js';
import {icon,button,header,footer,stepper,demoNotice,industrySelect,comparison,demoSite,miniHealth,miniEstimate,scoreRing,packageChoice,investment,pageHeading,cta,homepagePaths} from './components.js';

import {professions,professionBySlug,professionPath} from './professions.js';
import {industriesPage,professionPage,whatWeDoPage,faqPage,servicePlanPage} from './pages.js';

let state=sanitizeState(defaults),storageAvailable=true;
try {
 const raw=sessionStorage.getItem(storageKey);
 if(raw!==null) state=sanitizeState(JSON.parse(raw));
} catch (error) {
 if(error instanceof SyntaxError){try{sessionStorage.removeItem(storageKey);}catch{} state=sanitizeState(defaults);}
 else storageAvailable=false;
}
let galleryFilter='all',contactDraft={},draftPrepared=false;
let websiteDraft=state.url;
let activeChoice='prompt';
const serviceDrafts=new Map();
function downloadText(text,filename){
 const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function activateChoice(id){
 activeChoice=id;
 document.querySelectorAll('[data-choice]').forEach(el=>el.classList.toggle('is-active',el.dataset.choice===id));
 document.querySelectorAll('[data-choice-indicator]').forEach(el=>el.classList.toggle('is-active',el.dataset.choiceIndicator===id));
}
// Touch layouts follow the card nearest the viewport center; hover/focus takes priority.
let choiceScrollPending=false;
function updateScrollChoice(){
 if(choiceScrollPending)return;
 choiceScrollPending=true;requestAnimationFrame(()=>{
  choiceScrollPending=false;
  if(!matchMedia('(max-width:760px)').matches||document.activeElement?.closest('[data-choice]'))return;
  const cards=[...document.querySelectorAll('[data-choice]')];
  const visible=cards.map(el=>({el,rect:el.getBoundingClientRect()})).filter(({rect})=>rect.bottom>120&&rect.top<innerHeight);
  visible.sort((a,b)=>Math.abs((a.rect.top+a.rect.bottom)/2-innerHeight/2)-Math.abs((b.rect.top+b.rect.bottom)/2-innerHeight/2));
  if(visible[0])activateChoice(visible[0].el.dataset.choice);
 });
}
window.addEventListener('scroll',updateScrollChoice,{passive:true});
window.addEventListener('resize',updateScrollChoice,{passive:true});
for(const type of ['pointerover','focusin'])document.addEventListener(type,event=>{const card=event.target.closest('[data-choice]');if(card)activateChoice(card.dataset.choice);});
const comparisonViews=new Map();
let activeCaptureJobId=null;
let capturePollTimer=null;
function setCaptureStatus(text){const node=document.querySelector('#capture-status');if(node)node.textContent=text||'';}
async function pollCapture(jobId){
 if(jobId!==activeCaptureJobId)return;
 try{
  const res=await fetch(`/api/capture/${jobId}`);
  if(jobId!==activeCaptureJobId)return;
  const job=await res.json();
  if(!res.ok)return;
  if(job.status==='ready'){
   clearInterval(capturePollTimer);capturePollTimer=null;
   if(jobId!==activeCaptureJobId)return;
   state.capture={status:'ready',jobId,screenshotUrl:job.screenshotUrl,domain:job.domain,capturedAt:job.capturedAt};
   save();render({keepScroll:true});
   setCaptureStatus('Capture ready. Drag the slider to compare with the sample redesign.');
   announce('Homepage capture ready.');
   return;
  }
  if(job.status==='failed'){
   clearInterval(capturePollTimer);capturePollTimer=null;
   if(jobId!==activeCaptureJobId)return;
   state.capture={status:'failed',jobId,errorCode:job.errorCode,message:job.message};
   save();render({keepScroll:true});
   setCaptureStatus(job.message||'Capture failed.');
   announce('Capture failed.');
  }
 }catch{}
}
async function startCapture(url){
 if(capturePollTimer){clearInterval(capturePollTimer);capturePollTimer=null;}
 activeCaptureJobId=null;
 state.capture={status:'pending',jobId:'',screenshotUrl:'',domain:'',message:'Capturing…'};
 save();
 if(routePath()!=='/')navigate('/');else render({keepScroll:true});
 setCaptureStatus('Capturing your homepage…');
 announce('Capturing your homepage.');
 let res;
 try{res=await fetch('/api/capture',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});}
 catch{
  state.capture={status:'failed',jobId:'',message:'Could not reach the local capture service.',errorCode:'error'};
  save();render({keepScroll:true});setCaptureStatus(state.capture.message);return;
 }
 const data=await res.json().catch(()=>({}));
 if(!res.ok||!data.jobId){
  state.capture={status:'failed',jobId:'',message:data.message||'Capture could not start.',errorCode:data.errorCode||'error'};
  save();render({keepScroll:true});setCaptureStatus(state.capture.message);return;
 }
 activeCaptureJobId=data.jobId;
 state.capture={...state.capture,jobId:data.jobId};
 save();
 capturePollTimer=setInterval(()=>pollCapture(data.jobId),1200);
 void pollCapture(data.jobId);
}
const app=document.querySelector('#app');
const announce=text=>{const node=document.querySelector('#announcer');node.textContent='';requestAnimationFrame(()=>{node.textContent=text;});};
function save(){try{sessionStorage.setItem(storageKey,JSON.stringify(state));}catch{storageAvailable=false;}}
const currentIndustry=()=>conceptForState(state);
const journeyHeader=route=>`${stepper(route)}${demoNotice(state)}`;

function home(){return `<section class="hero container"><div class="hero-copy"><p class="eyebrow"><span class="eyebrow-line"></span> A BETTER WEBSITE STARTS HERE</p><h1>See what your<br>website could<br> <span>become.</span></h1><p class="hero-description">A website that feels like your business.<br class="desktop-break"> Only better.</p><p class="hero-support">Explore a fresh design, see what needs attention, and understand the investment. All before a conversation.</p><form id="website-form" novalidate><label for="website-url">Start with your website <span class="form-context">FREE FIRST LOOK</span></label><div class="url-input-wrap">${icon('globe')}<input id="website-url" name="website" type="text" inputmode="url" autocomplete="url" placeholder="yourbusiness.com" value="${h(websiteDraft)}" aria-describedby="url-help url-error" maxlength="500"></div><button class="button primary full" type="submit">Analyze my website ${icon('arrow')}</button><p id="url-error" class="field-error" role="alert"></p><p id="capture-status" class="micro" aria-live="polite">${state.capture?.status==='pending'?'Capturing your homepage…':state.capture?.status==='failed'?h(state.capture.message||''):state.capture?.status==='ready'?'Capture ready. Drag the slider to compare.':''}</p><p id="url-help" class="micro">Local preview: captures an allowlisted public homepage for the slider. After panel stays an illustrative industry sample. <a href="/audit">Explore a fictional sample review</a>.</p></form><div class="trust-row"><span>${icon('check')}Free first look</span><span>${icon('check')}No signup</span><span>${icon('check')}Preview before you commit</span></div><nav class="hero-choices" aria-label="Other ways to start"><a href="/preview">See a redesign ${icon('arrow')}</a><a href="/quote">What could it cost? ${icon('arrow')}</a></nav></div><div class="hero-visual"><div class="visual-heading"><span>ONE WEBSITE. A WHOLE NEW PERSPECTIVE.</span>${industrySelect(state,'hero-industry')}</div>${comparison({...state,page:'home'},{id:'hero-compare'})}<div class="hero-metrics">${miniHealth()}${miniEstimate(state)}</div><p class="visual-note">${icon('info')} ${state.capture?.status==='ready'?'Before: your captured homepage. After: fictional '+h(currentIndustry().name)+' redesign sample (not verified analysis).':h(currentIndustry().name)+' is a fictional business. All results are illustrative.'}</p></div></section>${homepagePaths(activeChoice)}<section class="industry-strip" aria-labelledby="industry-strip-title"><div class="container"><div class="industry-strip-intro"><h2 id="industry-strip-title">Built for your business.</h2><a href="/industries">Explore all ${professions.length} professions ${icon('arrow')}</a></div><div class="industry-strip-choices" role="group" aria-label="Choose a sample industry">${industries.map(d=>`<button data-industry="${d.id}" class="industry-chip ${state.industry===d.id?'active':''}" aria-pressed="${state.industry===d.id}">${icon(d.icon)}${d.short}</button>`).join('')}</div></div></section><section class="section examples-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">DIFFERENT BUSINESSES. THOUGHTFUL DESIGN.</p><h2>Good businesses.<br><span class="serif">Beautiful possibilities.</span></h2></div><a class="button secondary" href="/examples">Explore the collection ${icon('arrow')}</a></div><div class="concept-grid">${industries.filter(x=>['home','spa'].includes(x.id)).map(conceptCard).join('')}</div></div></section><section class="section container how-preview"><div><p class="eyebrow">YOU’RE IN CONTROL</p><h2>A first look.<br>Not a commitment.</h2><p class="lead">Good decisions start with a little clarity. Explore the design, understand the scope and choose your own next step.</p>${button('How it works','/how-it-works','secondary')}</div><ol class="process-list"><li><span>01</span><div><h3>Explore the first look</h3><p>See what a website review and an industry-specific concept could offer.</p></div></li><li><span>02</span><div><h3>Make the scope your own</h3><p>Compare packages and choose only the features that fit your needs.</p></div></li><li><span>03</span><div><h3>Decide what happens next</h3><p>Keep the ideas, refine your estimate or prepare a proposal draft.</p></div></li></ol></section><section class="section container faq-section"><div><p class="eyebrow">A LITTLE MORE CLARITY</p><h2>Good questions.<br>Straight answers.</h2></div><div>${[['Is this analyzing my actual website?','Not yet. This is an interactive frontend demonstration. Entering a URL saves it as context for this browser session, then opens a clearly labeled fictional report. No website is fetched or evaluated.'],['Do I need to sign up or share my email?','No. All concepts, sample reports and illustrative estimates are available without an account or contact information.'],['Are these real client projects?','No. The gallery contains original concept designs for fictional businesses, with stock photography. They demonstrate the experience, not client results.'],['Is the estimate a final quote?','No. All amounts and timelines are illustrative. Final scope, pricing, ownership and delivery terms would need to be confirmed before any work.']].map(([q,a],i)=>`<details data-disclosure-id="home-faq-${i}"><summary>${h(q)}${icon('plus')}</summary><p>${h(a)}</p></details>`).join('')}</div></section><div class="container">${cta()}</div>`;}

function audit(){const d=currentIndustry();return `<div class="container journey-page">${journeyHeader('/audit')}${pageHeading('YOUR SAMPLE WEBSITE REVIEW','A little clarity.<br>A better starting point.',`Explore the opportunities in the fictional ${h(d.name)} website. These findings explain the sample design, not your entered URL.`,industrySelect(state))}<div class="audit-overview"><section class="card audit-score"><div><span class="eyebrow">SAMPLE WEBSITE HEALTH</span><h2>Room to grow.</h2><p>There’s a useful foundation here. A clearer structure and more considered design could make the next step easier to find.</p></div>${scoreRing()}</section><section class="card sample-business"><div class="business-image"><img src="${h(d.image)}" alt="${h(d.alt)}"></div><div><span class="eyebrow">FICTIONAL BUSINESS</span><h2>${h(d.name)}</h2><p>${h(d.label)} · ${h(d.domain)}</p><a href="/preview">Compare the designs ${icon('arrow')}</a></div></section></div><details class="audit-source" data-disclosure-id="audit-source"><summary>View the website behind this sample review ${icon('down')}</summary><div class="audit-source-content"><div class="audit-source-art">${demoSite(d,{before:true})}</div><div><p class="eyebrow">FICTIONAL ORIGINAL WEBSITE</p><h3>${h(d.name)} · ${h(d.label)}</h3><p>This rendered sample is the starting point for the observations below. It is not a capture of your entered website.</p><a class="button secondary" href="/preview">Compare with the redesign ${icon('arrow')}</a></div></div></details><div class="score-grid">${report.categories.map(c=>`<article class="card category-card"><div>${icon(c.icon)}<span class="sample-label">Sample</span></div><h3>${h(c.name)}</h3><strong>${c.score}<small>/100</small></strong><div class="score-track"><span style="width:${c.score}%"></span></div><p>${h(c.detail)}</p></article>`).join('')}</div><div class="section-heading report-heading"><div><p class="eyebrow">YOUR PRIORITIES, EXPLAINED</p><h2>Small changes. Clearer experiences.</h2></div><span class="small muted">${report.findings.length} illustrative recommendations</span></div><div class="recommendations">${report.findings.map((f,i)=>`<article class="card recommendation"><span class="recommendation-number">0${i+1}</span><div><div class="recommendation-title"><h3>${h(f.title)}</h3><span class="priority ${i<2?'high':''}">${h(f.priority)}</span></div><p>${h(f.observation)}</p><p class="fix"><b>Suggested improvement</b> ${h(f.fix)}</p><small>${icon('eye')}${h(f.location)} · ${h(f.category)}</small></div></article>`).join('')}</div><div class="report-bottom"><section class="card"><span class="icon-tile">${icon('check')}</span><h3>Keep what already works.</h3><p>The sample business has a recognizable name, clear services and a useful contact intent. A redesign should preserve those foundations.</p></section><section class="card"><span class="icon-tile">${icon('info')}</span><h3>What this report doesn’t measure.</h3><p>No live crawling, speed testing, rankings, traffic, accessibility certification or security assessment has been performed. Scores are fixed sample data.</p></section></div><div class="page-actions"><a href="/quote" class="button secondary">Explore estimated pricing ${icon('file')}</a>${button('See the redesign concept','/preview')}</div></div>`;}

function preview(){const d=currentIndustry();return `<div class="container journey-page">${journeyHeader('/preview')}${pageHeading('YOUR WEBSITE, REIMAGINED','Same business.<br><span class="blue">A fresh perspective.</span>',`Explore a fictional ${d.label.toLowerCase()} website. Drag to reveal the redesign, or show both complete designs. Explore the sample pages and styles.`,industrySelect(state))}<div class="preview-toolbar"><div class="segmented" role="group" aria-label="Sample page">${['home','services','about','contact'].map(p=>`<button data-page="${p}" aria-pressed="${state.page===p}" class="${state.page===p?'active':''}">${p[0].toUpperCase()+p.slice(1)}</button>`).join('')}</div><div class="style-control"><span>Design style</span><div class="segmented" role="group" aria-label="Design style">${['modern','editorial'].map(s=>`<button data-style="${s}" aria-pressed="${state.style===s}" class="${state.style===s?'active':''}">${s[0].toUpperCase()+s.slice(1)}</button>`).join('')}</div></div></div><div class="large-preview">${comparison(state,{id:'large-comparison'})}</div><div class="design-notes"><article><span>01</span><h3>A clearer first impression</h3><p>Give the main message room to breathe and use imagery that fits the business.</p></article><article><span>02</span><h3>A more natural next step</h3><p>${h(d.detail)}</p></article><article><span>03</span><h3>Details that feel connected</h3><p>Consistent typography, spacing and service presentation across every sample page.</p></article></div><div class="card next-step-card"><div><p class="eyebrow">LIKE THE DIRECTION?</p><h2>Make the scope your own.</h2><p>This concept is a starting point. Explore the package and features that would fit your business.</p></div>${button('Explore the investment','/quote')}</div></div>`;}

function quote(){return `<div class="container journey-page quote-page">${journeyHeader('/quote')}<section class="quote-intro"><div class="quote-intro-copy"><p class="eyebrow">YOUR WEBSITE REDESIGN ESTIMATE</p><h1>A considered website.<br><span class="serif">A clearer investment.</span></h1><p class="lead">Choose your scope and see the estimate take shape. One-time work and optional monthly care, clearly separated.</p><div class="quote-trust"><span>${icon('file')}Instant sample estimate</span><span>${icon('refresh')}Adjust anytime</span></div><a href="#estimate-builder" class="button primary quote-start">Explore your estimate ${icon('arrow')}</a><a href="/audit" class="quote-review-link">Start with the sample website review ${icon('arrow')}</a></div><div class="quote-intro-preview">${comparison({...state,page:'home'},{compact:true,id:'quote-comparison'})}</div></section><section class="builder" id="estimate-builder" aria-labelledby="builder-heading"><div class="builder-title"><span class="icon-tile">${icon('layout')}</span><div><h2 id="builder-heading">The right scope for your business.</h2><p>Start with a package. Add what you need. Every amount and timeline below is illustrative.</p></div></div><div class="builder-grid"><div class="package-column"><h3><span>1</span> Choose your package</h3><div class="package-options">${packages.map(p=>packageChoice(p,state)).join('')}</div><div class="scope-note">${icon('info')}Start with what you need. New copy and third-party subscriptions are separate from the base package.</div></div><div class="addon-column"><h3><span>2</span> Make it your own <small>optional</small></h3><div class="addon-options">${addons.map(a=>`<label class="addon-choice ${state.addons.includes(a.id)?'selected':''}"><input type="checkbox" name="addon" value="${h(a.id)}" ${state.addons.includes(a.id)?'checked':''}><span><b>${h(a.name)}</b><small>${h(a.description)}</small><em>+ ${range(a.min,a.max)}</em></span></label>`).join('')}</div><label class="care-choice"><input type="checkbox" name="care" ${state.care?'checked':''}><span><b>Ongoing website care</b><small>${range(care.min,care.max)}/month · illustrative, billed separately</small></span></label></div><div class="summary-column" id="estimate-summary"><h3><span>3</span> Your estimate</h3>${investment(state)}</div></div></section></div>`;}

function pricing(){return `<div class="container standard-page">${pageHeading('THOUGHTFUL SCOPE. CLEARER CHOICES.','A better website.<br>On your terms.','A focused refresh or a fresh foundation. Explore the scope that fits your next chapter.')}<div class="inline-note">${icon('info')}Demonstration pricing only. These are not approved offers, binding quotes or guaranteed timelines.</div><div class="pricing-grid">${packages.map(p=>`<article class="card pricing-card ${p.id==='growth'?'featured':''}"><span class="eyebrow">${p.tag}</span><h2>${p.name}</h2><p>${p.description}</p><strong class="price">${range(p.min,p.max)}</strong><span class="small muted">Illustrative one-time project</span><hr><ul class="check-list">${p.includes.map(t=>`<li>${icon('check')}${t}</li>`).join('')}</ul><p class="small muted">Sample planning range: ${p.weeks.join('–')} weeks</p><a href="/quote" data-package="${p.id}" class="button ${p.id==='growth'?'primary':'secondary'} full">Customize this package ${icon('arrow')}</a></article>`).join('')}</div><section class="care-section card"><div><span class="icon-tile">${icon('shield')}</span><h2>A little care,<br>after launch.</h2><p>${care.description}</p></div><div><span class="eyebrow">OPTIONAL ONGOING CARE</span><strong class="price">${range(care.min,care.max)}<small>/month</small></strong><p class="small muted">Illustrative range. Terms and service allowance are not finalized.</p><a href="/quote" class="button secondary">Explore care in your estimate ${icon('arrow')}</a></div></section><section class="section"><div class="section-heading"><div><p class="eyebrow">THE DETAILS MATTER</p><h2>Know what you’re choosing.</h2></div></div><div class="feature-grid">${[['file','Scope before commitment','Pages, content, integrations and review rounds would be agreed before production begins.'],['shield','Ownership, made explicit','Ownership, licenses, export and cancellation terms would be confirmed in the actual proposal.'],['heart','Keep what works','A focused fix may be a better fit than a rebuild. The right scope starts with understanding the need.']].map(([i,t,p])=>`<article class="feature-card"><span class="icon-tile">${icon(i)}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></section></div>`;}

function conceptCard(d){return `<article class="concept-card concept-${d.id}"><a href="/preview" data-industry="${d.id}" aria-label="Explore ${d.name} ${d.label} concept"><div class="concept-thumbnail"><span class="collection-number">0${industries.indexOf(d)+1} / THE COLLECTION</span><div class="template-browser"><div class="template-browser-bar"><span>● ● ●</span><span>${d.domain}</span></div>${demoSite(d)}</div><span class="template-open">Explore this direction ${icon('arrow')}</span></div><div class="concept-caption"><div><span>${d.label} · Original concept</span><h3>${d.name} <small>${d.descriptor.toLowerCase()}</small></h3></div><span class="circle-arrow">${icon('arrow')}</span></div></a></article>`;}
function examples(){return `<div class="container standard-page">${pageHeading('THE DESIGN COLLECTION','Find a direction.<br><span class="serif">Make it yours.</span>','A collection of starting points, shaped around different kinds of business. We handle the design and implementation. You choose what feels right.')}<a class="collection-feature" href="/preview" data-industry="spa"><div class="collection-feature-copy"><span class="eyebrow">FEATURED DIRECTION / 02</span><h2>A quieter kind<br>of <span class="serif">statement.</span></h2><p>Warm textures. Considered typography. A calm first impression for a care-led business.</p><span class="feature-project">Aurelia <small>Skin &amp; wellness · Fictional concept</small></span><span class="feature-explore">Explore the design ${icon('arrow')}</span></div><div class="collection-feature-photo"><img src="/assets/spa.jpg" alt="Stock photograph of a warm treatment room used for the fictional Aurelia design"><span>Aurelia<small>SKIN &amp; WELLNESS</small></span></div></a><div class="collection-intro"><span>05 original directions</span><p>Fictional businesses. Real design possibilities.</p><a href="/quote">Explore estimated pricing ${icon('arrow')}</a></div><div class="gallery-filters" role="group" aria-label="Filter concepts"><button data-filter="all" aria-pressed="${galleryFilter==='all'}" class="${galleryFilter==='all'?'active':''}">All concepts</button>${industries.map(d=>`<button data-filter="${d.id}" aria-pressed="${galleryFilter===d.id}" class="${galleryFilter===d.id?'active':''}">${d.label}</button>`).join('')}</div><div class="concept-grid gallery-grid">${industries.filter(d=>galleryFilter==='all'||galleryFilter===d.id).map(conceptCard).join('')}</div><div class="inline-note">${icon('info')}All business identities and designs are illustrative. Stock photography does not represent client locations or endorsements.</div>${cta()}</div>`;}

function about(){return `<div class="container standard-page"><section class="about-hero"><div><p class="eyebrow">ABOUT US · A LITTLE ART. A LOT OF CLARITY.</p><h1>Good websites<br>start with<br><span class="blue">understanding.</span></h1><p class="lead">Your business is more than a list of services. Your website should help people see that.</p></div><div class="about-visual"><img src="/assets/office.jpg" alt="Stock photograph of a bright workspace; not a Biz Da Vinci office"><div><span>THE BIZ DA VINCI APPROACH</span><strong>Understand.<br>Imagine.<br>Make it happen.</strong><small>Illustrative workspace imagery</small></div></div></section><section class="about-statement"><p class="eyebrow">WHY BIZ DA VINCI</p><h2>Less guesswork.<br>More possibility.</h2><div><p>Website decisions can feel complicated before you’ve even seen what’s possible. We’re designing a more useful starting point: clear observations, a visual direction and a transparent conversation about scope.</p><p>Biz Da Vinci brings website review, redesign and managed implementation into one experience. You bring the understanding of your business. The process should help you make an informed next decision.</p><p class="small muted">This frontend demonstration shows that intended experience. Live website analysis, production delivery and final service terms are not enabled here.</p></div></section><div class="feature-grid">${[['eye','Show, then explain','Make design decisions visible and connect each change to a real customer task.'],['file','Make the scope clear','Separate one-time work, optional features and ongoing care. No mystery bundles.'],['heart','Keep the owner in control','Useful guidance comes first. Contact details and paid help come when you choose them.']].map(([i,t,p])=>`<article class="feature-card"><span class="icon-tile">${icon(i)}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div><nav class="about-next" aria-label="Learn more"><a href="/what-we-do">What we do ${icon('arrow')}</a><a href="/industries">Who we help ${icon('arrow')}</a><a href="/faq">Your questions, answered ${icon('arrow')}</a></nav>${cta()}</div>`;}

function howItWorks(){return `<div class="container standard-page">${pageHeading('A CLEAR PATH FORWARD','From your first look<br>to your next chapter.','Explore the complete demonstration at your own pace. No account, sales call or contact details needed.')}<div class="how-steps">${[['01','Understand the starting point','Open a sample website review. See how findings, priorities and practical next steps are presented.','Sample report only. Your entered URL is not fetched or evaluated.','/audit','Explore the sample audit','search'],['02','See a different possibility','Compare an older sample website with a fresh concept. Switch industries, pages and design styles.','Original concepts for fictional businesses, not personalized redesigns.','/preview','Explore a redesign','layout'],['03','Shape the scope','Choose a package and optional features. The local estimate updates immediately as you explore.','Prices and timelines are illustrative, not approved offers.','/quote','Customize a package','file'],['04','Prepare your next step','Review your selections and prepare a proposal draft you can download and keep.','No proposal is sent. Production submissions are not connected.','/contact','See the proposal screen','arrow']].map(([n,t,p,note,to,a,i])=>`<article class="card how-step"><span class="large-number">${n}</span><div><h2>${t}</h2><p>${p}</p><small>${note}</small></div><a href="${to}" class="button secondary">${a}${icon(i)}</a></article>`).join('')}</div></div>`;}

function contact(){return `<div class="container journey-page">${journeyHeader('/contact')}${pageHeading('YOUR NEXT STEP','A clearer brief.<br>A better conversation.','Review your selections and prepare a local proposal draft. Nothing is submitted or sent to Biz Da Vinci.')}<div class="contact-layout"><section class="card contact-card">${draftPrepared?`<div class="draft-ready"><span class="success-icon">${icon('file')}</span><p class="eyebrow">LOCAL DRAFT PREPARED</p><h2>Your ideas, brought together.</h2><p>Your draft is ready to keep. <strong>It has not been sent.</strong> It includes your selected package, features and illustrative estimate.</p><div class="draft-summary"><b>${h(contactDraft.business||contactDraft.name)}</b><span>${h(contactDraft.email)}</span><p>${h(contactDraft.notes||'No additional project notes.')}</p></div><button class="button primary full" data-action="download">Download my proposal draft ${icon('download')}</button><button class="button secondary full" data-action="edit-draft">Edit draft details ${icon('pen')}</button></div>`:`<p class="eyebrow">REQUEST A PROPOSAL · DEMO</p><h2>Tell us what you have in mind.</h2><p class="muted">These details stay in memory for your local draft. They are not saved to a database or sent anywhere.</p><form id="proposal-form"><div class="form-two"><label>Your name<input name="name" required autocomplete="name" maxlength="120" value="${h(contactDraft.name)}" placeholder="Your name"></label><label>Email address<input name="email" type="email" required autocomplete="email" maxlength="200" value="${h(contactDraft.email)}" placeholder="you@business.com"></label></div><label>Business name <span class="optional">optional</span><input name="business" autocomplete="organization" maxlength="180" value="${h(contactDraft.business)}" placeholder="Your business"></label><label>What would you like to improve?<textarea name="notes" rows="5" maxlength="3000" placeholder="A little about your website, your customers and what you have in mind…">${h(contactDraft.notes)}</textarea></label><div class="inline-note">${icon('info')}Demo form. Preparing a draft does not contact the agency or create a service agreement.</div><button class="button primary full" type="submit">Prepare my proposal draft ${icon('arrow')}</button></form>`}</section>${investment(state,{proposal:true})}</div></div>`;}

const renderers={'/':home,'/audit':audit,'/preview':preview,'/quote':quote,'/pricing':pricing,'/examples':examples,'/about':about,'/how-it-works':howItWorks,'/contact':contact,'/industries':industriesPage,'/what-we-do':()=>{const id=new URLSearchParams(location.search).get('service');return id?servicePlanPage(id,state,serviceDrafts.get(id)||''):whatWeDoPage();},'/faq':faqPage,...Object.fromEntries(professions.map(p=>[professionPath(p.slug),()=>professionPage(p)]))};
function routePath(){return location.pathname.replace(/\/$/,'')||'/';}
function render({keepScroll=false,focus=null}={}){
 const route=routePath(),y=window.scrollY;
 const openDetails=keepScroll?new Map([...document.querySelectorAll('details[data-disclosure-id]')].map(el=>[el.dataset.disclosureId,el.open])):null;
 const service=route==='/what-we-do'?serviceChoices.find(x=>!x.free&&x.id===new URLSearchParams(location.search).get('service')):null;
 document.title=`${service?.title||routes[route]||'Page not found'} — Biz Da Vinci`;
 app.innerHTML=`${header(route)}<main id="main" tabindex="-1">${renderers[route]?renderers[route]():`<section class="container standard-page"><h1>This page isn’t here.</h1>${button('Back to home','/')}</section>`}</main>${footer()}${!storageAvailable?'<div class="storage-notice">Session storage is unavailable. Selections will last until this page is refreshed.</div>':''}`;
 document.querySelectorAll('.comparison').forEach(el=>{const saved=comparisonViews.get(el.id);if(saved)setComparisonView(el,saved.view,saved.amount);else if(el.id==='hero-compare'&&state.capture?.status==='ready')setComparisonView(el,'reveal',50);});
 if(keepScroll)document.querySelectorAll('details[data-disclosure-id]').forEach(el=>{if(openDetails?.get(el.dataset.disclosureId))el.open=true;});
 if(keepScroll)window.scrollTo(0,y);else window.scrollTo(0,0);
 if(focus){const target=document.querySelector(focus);target?.focus({preventScroll:true});} 
}
history.scrollRestoration='manual';
function scrollToSection(){
 if(!location.hash)return false;
 let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return false;}
 const section=document.getElementById(id);if(!section)return false;
 section.scrollIntoView({block:'start'});return true;
}
function applyProfessionQuery(){
 const params=new URLSearchParams(location.search);
 const packageId=params.get('package');
 if(routePath()==='/quote'&&packages.some(p=>p.id===packageId)){state.packageId=packageId;save();}
 if(!params.has('profession'))return;
 const slug=params.get('profession');
 const p=professionBySlug(slug);
 if(!p){
  params.delete('profession');
  history.replaceState(history.state,'',location.pathname+(params.toString()?`?${params}`:'')+location.hash);
  if(state.profession){state=sanitizeState({...state,profession:''});save();}
  return;
 }
 const changed=state.profession!==p.slug;
 state=sanitizeState({...state,profession:p.slug,industry:p.family,page:changed?'home':state.page,style:changed?(p.family==='spa'?'editorial':'modern'):state.style});save();
}
function clearProfession(){state.profession='';const url=new URL(location.href);url.searchParams.delete('profession');history.replaceState(history.state,'',url.pathname+url.search+url.hash);}
function filterProfessions(){
 const search=document.querySelector('#profession-search'),group=document.querySelector('#profession-group');if(!search||!group)return;
 const query=search.value;let count=0;
 document.querySelectorAll('[data-profession-card]').forEach(card=>{card.hidden=!(matchesProfessionSearch(card.dataset.search,query)&&(group.value==='all'||group.value===card.dataset.group));if(!card.hidden)count++;});
 document.querySelector('#profession-count').textContent=count+' '+(count===1?'profession':'professions');document.querySelector('#profession-empty').hidden=count!==0;
}
function navigate(path){
 history.replaceState({...history.state,scrollY:window.scrollY},'',location.href);
 if(path!==location.pathname+location.search+location.hash)history.pushState({},'',path);
 applyProfessionQuery();render();document.querySelector('main').focus({preventScroll:true});requestAnimationFrame(scrollToSection);announce(`${routes[routePath()]||'Page'} opened.`);
}
window.addEventListener('popstate',event=>{applyProfessionQuery();render();document.querySelector('main').focus({preventScroll:true});requestAnimationFrame(()=>{if(!scrollToSection())window.scrollTo(0,event.state?.scrollY||0);});});

function setComparisonView(comparison, view, progress) {
 const slider=comparison.querySelector('.comparison-range');
 const amount=Math.max(0,Math.min(100,Math.round(progress??(view==='before'?0:100))));
 const mode=view==='both'?'both':amount===0?'before':amount===100?'after':'reveal';
 comparisonViews.set(comparison.id,{view:mode,amount});
 comparison.dataset.view=mode;
 comparison.style.setProperty('--reveal',amount+'%');
 comparison.querySelector('[data-frame="before"]').hidden=mode==='after';
 comparison.querySelector('[data-frame="after"]').hidden=mode==='before';
 comparison.querySelectorAll('[data-compare-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.compareView===mode)));
 slider.value=amount;
 slider.setAttribute('aria-valuetext',mode==='both'?'Both complete designs shown':amount+'% redesign, '+(100-amount)+'% original');
 comparison.querySelector('.comparison-state').textContent=mode==='both'?'Before & after':mode==='before'?'Original sample':mode==='after'?'Redesign concept':'Original to redesign';
 comparison.querySelector('.reveal-value').textContent=mode==='both'?'Both designs':amount+'% redesign';
}
document.addEventListener('click',event=>{
 const compareButton=event.target.closest('[data-compare-view]');if(compareButton){setComparisonView(compareButton.closest('.comparison'),compareButton.dataset.compareView);return;}
 const menu=event.target.closest('.menu-toggle');if(menu){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('#main-nav').classList.toggle('open',open);return;}
 const action=event.target.closest('[data-action]');
 if(action){
  if(action.dataset.action==='clear-profession-search'){document.querySelector('#profession-search').value='';document.querySelector('#profession-group').value='all';filterProfessions();document.querySelector('#profession-search').focus();}
  if(action.dataset.action==='reset'){activeChoice='prompt';serviceDrafts.clear();clearProfession();state=sanitizeState(defaults);websiteDraft='';comparisonViews.clear();contactDraft={};draftPrepared=false;galleryFilter='all';save();render();announce('Demo selections reset.');}
  if(action.dataset.action==='download-prompt'){downloadText(freePromptText(state),'biz-da-vinci-free-website-prompt.txt');announce('Your free website prompt download started.');}
  if(action.dataset.action==='edit-draft'){draftPrepared=false;render({keepScroll:true,focus:'input[name="name"]'});}
  if(action.dataset.action==='download'){const blob=new Blob([proposalText(state,contactDraft)],{type:'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='biz-da-vinci-proposal-draft.md';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Local proposal draft download started. Nothing was submitted.');}
  return;
 }
 const filter=event.target.closest('[data-filter]');if(filter){galleryFilter=filter.dataset.filter;render({keepScroll:true,focus:`[data-filter="${galleryFilter}"]`});const label=industries.find(d=>d.id===galleryFilter)?.label;announce(galleryFilter==='all'?'Showing all concepts.':label?`Showing ${label} concepts.`:'Showing filtered concepts.');return;}
 const page=event.target.closest('[data-page]');if(page){state.page=page.dataset.page;save();render({keepScroll:true,focus:`[data-page="${state.page}"]`});announce(`${state.page} sample page shown.`);return;}
 const style=event.target.closest('[data-style]');if(style){state.style=style.dataset.style;save();render({keepScroll:true,focus:`[data-style="${state.style}"]`});announce(`${state.style} style selected.`);return;}
 const industry=event.target.closest('[data-industry]');if(industry){clearProfession();state.industry=industry.dataset.industry;state.page='home';save();if(industry.tagName!=='A'){render({keepScroll:true,focus:`button[data-industry="${state.industry}"]`});announce(`${currentIndustry().label} sample selected.`);return;}}
 const packageLink=event.target.closest('[data-package]');if(packageLink){state.packageId=packageLink.dataset.package;save();}
 const anchor=event.target.closest('a[href]');if(anchor&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){const dest=new URL(anchor.href);if(dest.origin===location.origin&&Object.hasOwn(routes,dest.pathname)&&!anchor.hasAttribute('download')&&(!dest.hash||dest.pathname!==location.pathname||dest.search!==location.search)){event.preventDefault();navigate(dest.pathname+dest.search+dest.hash);}}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const menu=document.querySelector('.menu-toggle');if(menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}}});
document.addEventListener('input',event=>{
 if(event.target.id==='service-notes')serviceDrafts.set(event.target.form.dataset.service,event.target.value);
 if(event.target.id==='profession-search')filterProfessions();
 if(event.target.id==='website-url'){websiteDraft=event.target.value;event.target.removeAttribute('aria-invalid');document.querySelector('#url-error').textContent='';}
 if(event.target.matches('.comparison-range'))setComparisonView(event.target.closest('.comparison'),'reveal',Number(event.target.value));
 if(event.target.closest('#proposal-form'))contactDraft=Object.fromEntries(new FormData(event.target.closest('form')));
});
document.addEventListener('change',event=>{
 const el=event.target;
 if(el.id==='profession-group')filterProfessions();
 if(el.name==='industry'){clearProfession();state.industry=el.value;state.page='home';save();render({keepScroll:true,focus:`#${el.id}`});announce(`${currentIndustry().label} sample selected.`);}
 if(el.name==='package'||el.name==='addon'||el.name==='care'){
  if(el.name==='package'){state.packageId=el.value;const url=new URL(location.href);url.searchParams.set('package',el.value);history.replaceState(history.state,'',url.pathname+url.search+url.hash);}
  if(el.name==='addon')state.addons=el.checked?[...new Set([...state.addons,el.value])]:state.addons.filter(id=>id!==el.value);
  if(el.name==='care')state.care=el.checked;
  save();render({keepScroll:true,focus:el.name==='care'?'input[name="care"]':`input[name="${el.name}"][value="${el.value}"]`});const e=estimate(state);announce(`Illustrative estimate updated: ${range(e.min,e.max)} one-time${e.monthly?', plus '+range(e.monthly.min,e.monthly.max)+' per month for care':''}.`);
 }
});
document.addEventListener('submit',event=>{
 if(event.target.id==='service-brief-form'){event.preventDefault();const id=event.target.dataset.service;const notes=new FormData(event.target).get('notes');serviceDrafts.set(id,notes);downloadText(serviceBriefText(id,state,notes),`biz-da-vinci-${id}-brief.txt`);document.querySelector('#service-download-status').textContent='Your planning brief download started. Nothing was sent.';}
 if(event.target.id==='website-form'){event.preventDefault();document.querySelector('#url-error').textContent='';document.querySelector('#website-url').removeAttribute('aria-invalid');try{const url=normalizeUrl(new FormData(event.target).get('website'));websiteDraft=url;state.url=url;save();void startCapture(url);}catch(error){document.querySelector('#url-error').textContent=error.message;document.querySelector('#website-url').setAttribute('aria-invalid','true');document.querySelector('#website-url').focus();}}
 if(event.target.id==='proposal-form'){event.preventDefault();contactDraft=Object.fromEntries(new FormData(event.target));draftPrepared=true;render({focus:'.draft-ready button'});announce('Your local proposal draft is ready. It has not been sent.');}
});
applyProfessionQuery();
render();
const initialScrollY=window.scrollY;
document.fonts.ready.then(()=>requestAnimationFrame(()=>{if(window.scrollY===initialScrollY)scrollToSection();}));


