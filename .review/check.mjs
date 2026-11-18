import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import { objects, personalNotes, deskImage } from '../src/content.js';
assert.equal(createHash('sha256').update(await readFile('assets/bureau-v3.png')).digest('hex'),'ac5951bcabff63c0c504f2dab2e09fd50652d0516e14a038d747f769dee176d2');
const browser = await chromium.launch({channel:'chrome'});
const errors=[];
for(const [width,height] of [[1440,900],[1920,1080],[1920,720],[768,1024],[390,844],[320,670],[844,390]]) {
 const mobile=width<=760 || width/height<=1.2 || (width<=1000 && height<=500);
 const page=await browser.newPage({viewport:{width,height},hasTouch:mobile,reducedMotion:'reduce'});
 page.on('pageerror', e=>errors.push(e.message));
 const response=await page.goto('http://127.0.0.1:4173/');
 assert.ok(response.ok());
 await page.locator('.scene img').evaluate(el=>el.decode());
 await page.evaluate(()=>document.fonts.ready);
 assert.deepEqual(await page.locator('.scene img').evaluate(el=>[el.naturalWidth,el.naturalHeight]),[1672,941]);
 assert.match(await page.locator('.scene img').getAttribute('src'),/atelier-v3.webp/);
 assert.equal(await page.locator('.hotspot:not(.secret)').count(),8);
 assert.equal(await page.locator('.hotspot.secret').count(),4);
 assert.equal(await page.locator('h1').innerText(),'DES IDÉES. DU CONCRET.');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 async function alignment() {
   const photo=await page.locator('.scene img').boundingBox();
   for(const item of objects) {
     const dot=await page.locator('[data-object="'+item.id+'"] .marker').boundingBox();
     assert.ok(Math.abs((dot.x+dot.width/2-photo.x)/photo.width*100-item.x)<.05,item.id+' X');
     assert.ok(Math.abs((dot.y+dot.height/2-photo.y)/photo.height*100-item.y)<.05,item.id+' Y');
   }
 }
 await alignment();
 const targets=await page.locator('.hotspot').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {id:el.dataset.object,x:r.x,y:r.y,w:r.width,h:r.height};}));
 for(let a=0;a<targets.length;a++) {
  assert.ok(targets[a].w>=44 && targets[a].h>=44);
  for(let b=a+1;b<targets.length;b++) {
   const i=targets[a],j=targets[b];
   assert.ok(i.x+i.w<=j.x || j.x+j.w<=i.x || i.y+i.h<=j.y || j.y+j.h<=i.y,'Touch targets overlap: '+i.id+' / '+j.id);
  }
 }
 assert.equal(await page.locator('.marker').first().evaluate(el=>getComputedStyle(el,'::after').animationName),'none');
 if(mobile) {
   assert.ok(await page.locator('.menu-toggle').isVisible());
   const spot=await page.locator('[data-object="projets"]').boundingBox();
   assert.ok(Math.abs(spot.x+spot.width/2-width/2)<2,'Initial panorama centered on screen');
   const start=await page.locator('.viewport').evaluate(el=>el.scrollLeft);
   const cdp=await page.context().newCDPSession(page);
   const yy=Math.min(height-70,230);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:width*.8,y:yy}]});
   for(let i=1;i<=6;i++) await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:width*(.8-i*.08),y:yy}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await page.waitForTimeout(400);
   assert.ok(Math.abs(await page.locator('.viewport').evaluate(el=>el.scrollLeft)-start)>20,'Finger pans panorama');
   await alignment();
   assert.equal(await page.locator('dialog').count(),0,'Swipe does not activate a point');
 }
 for(const item of objects) {
   const spot=page.locator('[data-object="'+item.id+'"]');
   await spot.scrollIntoViewIfNeeded();
   if(mobile) await spot.tap(); else {await spot.hover();await spot.click();}
   await page.locator('dialog[open]').waitFor();
   assert.ok(page.url().endsWith('#'+item.action),item.id+' route');
   if(item.type==='secret') {
     assert.equal(await page.locator('.personal-note p').innerText(),personalNotes[item.id]);
   } else {
     assert.equal(await page.locator('#panel-title').textContent(),item.title);
   }
   const bounds=await page.locator('dialog').boundingBox();
   assert.ok(bounds.x>=0 && bounds.y>=0 && bounds.x+bounds.width<=width+1 && bounds.y+bounds.height<=height+1,'Panel fits');
   assert.ok(await page.locator('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1),'No panel horizontal overflow');
   await page.keyboard.press('Escape');
   await page.locator('dialog').waitFor({state:'detached'});
   assert.ok(await spot.evaluate(el=>el===document.activeElement),'Focus restored');
 }
 assert.match(await page.locator('.count').innerText(),/4\s*\/\s*4/);
 await page.locator('[data-object="cafe"]').scrollIntoViewIfNeeded();
 await page.locator('[data-object="cafe"]').click();
 await page.locator('dialog[open]').waitFor();
 await page.getByRole('button',{name:'Fermer la fenêtre'}).click();
 await page.locator('dialog').waitFor({state:'detached'});
 assert.match(await page.locator('.count').innerText(),/4\s*\/\s*4/);
 await page.getByRole('button',{name:'Explorer les objets',exact:true}).click();
 assert.equal(await page.locator('.directory button').count(),8);
 await page.locator('.directory').getByRole('button',{name:/Stratégie YouTube/}).click();
 await page.getByRole('heading',{name:'Stratégie YouTube',exact:true}).waitFor();
 assert.match(await page.locator('dialog').innerText(),/CTR/);
 await page.keyboard.press('Escape');
 await page.locator('dialog').waitFor({state:'detached'});
 if(mobile) {await page.getByRole('button',{name:'Menu',exact:true}).click(); await page.getByRole('navigation',{name:'Navigation mobile'}).getByRole('button',{name:'Compétences',exact:true}).click();}
 else await page.getByRole('navigation',{name:'Navigation principale'}).getByRole('button',{name:'Compétences',exact:true}).click();
 await page.locator('.choices').waitFor();
 assert.equal(await page.locator('.choices button').count(),6);
 await page.keyboard.press('Escape');
 await page.locator('dialog').waitFor({state:'detached'});
 await page.keyboard.press('Tab');
 await page.locator('[data-object="maroc"]').focus();
 assert.equal(await page.locator('[data-object="maroc"] .tag').evaluate(el=>getComputedStyle(el).visibility),'visible');
 await page.keyboard.press('Enter');
 await page.locator('.personal-note p').waitFor();
 assert.equal(await page.locator('.personal-note p').innerText(),'Le Maroc.');
 await page.keyboard.press('Escape');
 await page.locator('dialog').waitFor({state:'detached'});
 await page.setViewportSize({width:width+57,height:height+20});
 await page.waitForTimeout(80);
 await alignment();
 await page.goto('http://127.0.0.1:4173/#contact');
 assert.equal(await page.getByRole('link',{name:'Mon profil GitHub'}).getAttribute('href'),'https://github.com/Atemani');
 await page.close();
 console.log('Bureau v3 validé : '+width+' × '+height);
}
await browser.close();
assert.deepEqual(errors,[]);
