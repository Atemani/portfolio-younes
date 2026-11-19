import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
const browser = await chromium.launch({channel:'chrome'});
const errors=[];
const sizes=[[320,568],[360,800],[390,844],[430,932],[768,1024],[844,390],[1024,768],[1440,900],[1920,1080]];
const fit = async (page, selector) => {
 const bad=await page.locator(selector).evaluateAll(els=>els.flatMap(e=>{
  const r=e.getBoundingClientRect(), vw=document.documentElement.clientWidth;
  if(!r.width || !r.height) return [];
  return r.left < -1 || r.right > vw+1 || e.scrollWidth > e.clientWidth+2 ? [{text:e.textContent.slice(0,70),w:r.width,x:r.x,scroll:e.scrollWidth,client:e.clientWidth}] : [];
 }));
 assert.deepEqual(bad,[],selector);
};
for(const [width,height] of sizes){
 const page=await browser.newPage({viewport:{width,height},isMobile:width<768,hasTouch:width<1024,reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/portfolio');
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.evaluate(()=>innerWidth),width,'No mobile viewport expansion');
 await fit(page,'.cp-header,.cp-tools,.cp-tool-group,.cp-tool-heading,.cp-tool-heading h3,.cp-tool-heading > span,.cp-contact-bottom a');
 await fit(page,'.cp-main h2,.cp-main h3,.cp-dossier summary strong,.cp-skills summary strong');
 const clippedText=await page.evaluate(()=>{
  const walker=document.createTreeWalker(document.querySelector('.cp-main'),NodeFilter.SHOW_TEXT);
  const bad=[];let n;
  while(n=walker.nextNode()){
   if(!n.textContent.trim()||n.parentElement.closest('.cp-marquee-window,.cp-project-logos-window,details:not([open]) > :not(summary)'))continue;
   const range=document.createRange();range.selectNode(n);
   for(const r of range.getClientRects())if(r.width&&(r.left< -1||r.right>document.documentElement.clientWidth+1))bad.push(n.textContent);
  }
  return bad;
 });
 assert.deepEqual(clippedText,[],'Visible text not clipped by page boundaries');
 for(const summary of await page.locator('.cp-dossier > summary,.cp-skills details > summary').all()){
  await summary.click();
  await fit(page,'.cp-project-detail,.cp-skill-body,.cp-kpis');
  await summary.click();
 }
 if(width<=1000){
  const menu=page.locator('.cp-mobile-menu');
  await menu.locator('summary').click();
  await fit(page,'.cp-mobile-nav');
  await menu.getByRole('link',{name:'Contact',exact:true}).click();
  assert.equal(await menu.getAttribute('open'),null);
  assert.equal(new URL(page.url()).hash,'#contact');
  await menu.locator('summary').click();
  await page.keyboard.press('Escape');
  assert.equal(await menu.getAttribute('open'),null);
 }
 await page.locator('.cp-project-logos img').evaluateAll(els=>{els.forEach(e=>e.loading='eager');return Promise.all(els.map(e=>e.decode()))});
 assert.equal(await page.locator('.cp-project-logos a,.cp-project-logos button').count(),0);
 assert.equal(await page.locator('.cp-project-logos-sequence:not([aria-hidden]) img').count(),6);
 await page.locator('.cp-tools img').evaluateAll(els=>{els.forEach(e=>e.loading='eager');return Promise.all(els.map(e=>e.decode()))});
 await page.goto('http://127.0.0.1:4173/');
 await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.evaluate(()=>innerWidth),width);
 await fit(page,'.header-inner,.header-inner > a,.menu-toggle,.editorial,.intro h1,.intro p');
 const label=await page.locator('.intro').evaluate(e=>({height:getComputedStyle(e,'::before').height,width:getComputedStyle(e,'::before').width}));
 assert.notEqual(label.height,'3px');
 const points=page.locator('.hotspot');
 assert.equal(await points.count(),12);
 for(const point of await points.all()){
  await point.scrollIntoViewIfNeeded();
  await point.click();
  await page.locator('dialog').waitFor({state:'visible'});
  await fit(page,'dialog,.panel-bar,.close,.panel-content');
  assert.ok(await page.locator('.close').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0 && r.bottom<=innerHeight}));
  await page.locator('.close').click();
 }
 assert.match(await page.locator('.count').innerText(),/4 \/ 4/);
 await page.locator('[data-object="cafe"]').scrollIntoViewIfNeeded();
 await page.locator('[data-object="cafe"]').click();
 await page.keyboard.press('Escape');
 assert.match(await page.locator('.count').innerText(),/4 \/ 4/);
 for(const id of ['linlock','dieuzy','dynam8','mochiauto','gestion','web','automatisation','apropos']){
  await page.evaluate(id=>location.hash=id,id);
  await page.locator('dialog').waitFor({state:'visible'});
  await fit(page,'dialog,.panel-content,.case-metrics');
  await page.locator('.close').click();
 }
 if(await page.locator('.menu-toggle').isVisible()){
  await page.locator('.menu-toggle').click();
  await page.getByRole('button',{name:'Explorer les objets',exact:true}).last().click();
  assert.equal(await page.locator('.directory button').count(),8);
  await page.locator('.close').click();
 }
 const alignment=await points.evaluateAll(els=>els.every(e=>{
  const r=e.getBoundingClientRect(), s=e.parentElement.getBoundingClientRect();
  return Math.abs(r.x+r.width/2-(s.x+s.width*parseFloat(e.style.left)/100))<1 && Math.abs(r.y+r.height/2-(s.y+s.height*parseFloat(e.style.top)/100))<1 && r.width>=44 && r.height>=44;
 }));
 assert.ok(alignment,'Image-relative hotspots and touch targets');
 console.log('PASS',width,height,'both modes, menus, 12 hotspots, dossiers, counters, images, bounds');
 await page.close();
}
// Real touch gesture in the mobile panorama, then rotate without losing the explored area.
const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await mobile.goto('http://127.0.0.1:4173/');
const pan=mobile.locator('.viewport');
const before=await pan.evaluate(e=>e.scrollLeft);
const cdp=await mobile.context().newCDPSession(mobile);
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:310,y:280}]});
for(let x=290;x>=70;x-=20) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:280}]});
await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
await mobile.waitForTimeout(500);
assert.ok(await pan.evaluate(e=>e.scrollLeft)>before+60,'Native finger swipe pans');
const center=await pan.evaluate(e=>(e.scrollLeft+e.clientWidth/2)/e.firstElementChild.clientWidth);
await mobile.setViewportSize({width:844,height:390});
await mobile.waitForTimeout(200);
const rotation=await pan.evaluate(e=>({center:(e.scrollLeft+e.clientWidth/2)/e.firstElementChild.clientWidth,half:e.clientWidth/2/e.firstElementChild.clientWidth}));
const expected=Math.max(rotation.half,Math.min(1-rotation.half,center));
assert.ok(Math.abs(expected-rotation.center)<.005,'Orientation preserves position within actual scroll limits');
await pan.focus();
await mobile.keyboard.press('Tab');
assert.equal(await mobile.evaluate(()=>document.activeElement.classList.contains('hotspot')),true);
await mobile.keyboard.press('Enter');
assert.equal(await mobile.locator('dialog[open]').count(),1);
await mobile.keyboard.press('Escape');
assert.equal(await mobile.evaluate(()=>document.activeElement.classList.contains('hotspot')),true);
await mobile.goto('http://127.0.0.1:4173/portfolio');
for(const selector of ['.cp-project-logos-track','.cp-marquee-track']){
 assert.equal(await mobile.locator(selector).first().evaluate(e=>getComputedStyle(e).animationPlayState),'running');
}
assert.deepEqual(errors,[]);
console.log('PASS native touch panorama, rotation, normal/reduced motion, no runtime errors');
await browser.close();
