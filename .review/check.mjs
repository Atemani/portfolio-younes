import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
const browser = await chromium.launch({channel: 'chrome'});
const pages = ['projets','competences','podcast','creation','strategie','inspirations','cafe','lectures'];
const errors = [];
for (const [width,height] of [[1440,900],[768,1024],[390,844],[320,670],[1920,720],[844,390]]) {
  const page = await browser.newPage({viewport:{width,height}, hasTouch:width<1000, reducedMotion:'reduce'});
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.scene img').evaluate(img => img.decode());
  assert.equal(await page.locator('.scene img').evaluate(img => img.naturalWidth),1671);
  assert.equal(await page.locator('.hotspot').count(),8);
  await page.evaluate(() => document.fonts.ready);
  assert.ok(await page.evaluate(() => document.fonts.check('800 64px "Barlow Condensed"')));
  assert.equal(await page.locator('h1').innerText(), 'DES IDÉES. DU CONCRET.');
  assert.equal(await page.locator('.scene-footer').count(),0);
  assert.equal(await page.locator('.marker').count(),8);
  assert.equal(await page.locator('.hotspot:not(.secret) .tag').first().evaluate(el => getComputedStyle(el).visibility),'hidden');
  const positions = {projets:[54.5,38.3],competences:[29.1,58.5],podcast:[11.4,61],creation:[95.2,66],strategie:[73.6,74],inspirations:[77,55],cafe:[48.4,73.6],lectures:[80.5,63.8]};
  for (const [id,[x,y]] of Object.entries(positions)) {
    const dot = page.locator('[data-object="'+id+'"] .marker');
    const size = await dot.boundingBox();
    const photo = await page.locator('.scene img').boundingBox();
    assert.ok(Math.abs((size.x+size.width/2-photo.x)/photo.width*100-x)<.1, id+' horizontal alignment');
    assert.ok(Math.abs((size.y+size.height/2-photo.y)/photo.height*100-y)<.1, id+' vertical alignment');
    assert.ok(size.width>=10 && size.width<=12, id+' dot size');
    assert.equal(await dot.evaluate(el=>getComputedStyle(el).backgroundColor), ['cafe','lectures'].includes(id)?'rgb(245, 240, 232)':'rgb(230, 173, 25)');
    assert.equal(await dot.evaluate(el=>getComputedStyle(el,'::after').animationName),'none');
    const target = await page.locator('[data-object="'+id+'"]').boundingBox();
    assert.ok(target.width>=44 && target.height>=44, id+' touch target');
  }
  assert.equal(await page.locator('.interaction-legend li').count(),2);
  const before = await page.locator('.scene img').boundingBox();
  const screen = await page.locator('[data-object="projets"]').boundingBox();
  assert.ok(Math.abs((screen.x + screen.width/2 - before.x)/before.width - .545) < .005);
  if (width === 1440) {
    const intro = await page.locator('.intro').boundingBox();
    const notebook = await page.locator('[data-object="strategie"]').boundingBox();
    assert.ok(intro.y >= notebook.y + notebook.height, 'Introduction overlapping notebook');
  }
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  for (const key of pages) {
    const spot=page.locator('[data-object="'+key+'"]');
    if (width<1000) { await spot.scrollIntoViewIfNeeded(); await spot.tap(); }
    else { await spot.hover(); await page.waitForFunction(id=>getComputedStyle(document.querySelector('[data-object="'+id+'"] .tag')).visibility==='visible',key); await spot.click(); }
    await page.locator('dialog[open]').waitFor();
    assert.ok(page.url().endsWith('#'+key));
    assert.match(await page.locator('.panel-bar .mono').innerText(), /Dossier [0-9]{2}/i);
    if (key === 'inspirations') {
      await page.getByRole('button',{name:'Parcourir ma pile de livres'}).click();
      await page.locator('.books').waitFor();
      assert.equal(await page.locator('.books li').count(),4);
    }
    await page.keyboard.press('Escape');
    await page.locator('dialog').waitFor({state:'detached'});
    assert.ok(await spot.evaluate(el => el===document.activeElement));
  }
  assert.match(await page.locator('.count').innerText(), /2\s*\/\s*2/);
  await page.getByRole('button',{name:/Explorer les objets/}).click();
  await page.locator('.directory button').first().click();
  await page.getByText('Dynam8 Services',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Fermer la fenêtre'}).click();
  await page.getByRole('button',{name:'Compétences',exact:true}).focus();
  await page.keyboard.press('Enter');
  await page.locator('.choices').waitFor();
  assert.equal(await page.locator('.choices button').count(),6);
  await page.locator('.choices button').getByText('Intelligence artificielle & automatisation').click();
  await page.getByRole('heading',{name:'Intelligence artificielle & automatisation'}).waitFor();
  await page.goto('http://127.0.0.1:4173/#contact');
  assert.equal(await page.getByRole('link',{name:/Mon profil GitHub/}).getAttribute('href'),'https://github.com/Atemani');
  await page.getByRole('button',{name:'Fermer la fenêtre'}).click();
  await page.locator('dialog').waitFor({state:'detached'});
  await page.keyboard.press('Tab');
  const keyboardSpot = page.locator('[data-object="cafe"]');
  await keyboardSpot.focus();
  assert.equal(await keyboardSpot.locator('.tag').evaluate(el=>getComputedStyle(el).visibility),'visible');
  await page.keyboard.press('Enter');
  await page.getByRole('heading',{name:'La pause café'}).waitFor();
  await page.keyboard.press('Escape');
  await page.locator('dialog').waitFor({state:'detached'});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('button',{name:'Projets',exact:true}).focus();
  await page.mouse.move(0,0);
  assert.equal(await page.locator('[data-object="cafe"] .marker').evaluate(el=>getComputedStyle(el,'::after').animationName),'point-pulse');
  await page.close();
  console.log('Parcours validé : '+width+' × '+height);
}
await browser.close();
assert.deepEqual(errors,[]);
