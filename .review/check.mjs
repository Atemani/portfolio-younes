import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
const browser = await chromium.launch({channel: 'chrome'});
const pages = ['projets','competences','podcast','creation','strategie','inspirations','cafe','lectures'];
const errors = [];
for (const [width,height] of [[1440,900],[768,1024],[390,844],[320,670],[1920,720]]) {
  const page = await browser.newPage({viewport:{width,height}, hasTouch:width<1000, reducedMotion:'reduce'});
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.scene img').evaluate(img => img.decode());
  assert.equal(await page.locator('.scene img').evaluate(img => img.naturalWidth),1671);
  assert.equal(await page.locator('.hotspot').count(),8);
  await page.evaluate(() => document.fonts.ready);
  assert.ok(await page.evaluate(() => document.fonts.check('400 16px Montserrat') && document.fonts.check('700 16px Montserrat')));
  assert.equal(await page.locator('.hotspot:not(.secret) .tag').count(),6);
  for (const tag of await page.locator('.hotspot:not(.secret) .tag').all()) {
    assert.equal(await tag.evaluate(el => getComputedStyle(el).visibility),'visible');
    assert.equal(await tag.evaluate(el => getComputedStyle(el).opacity),'1');
  }
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  for (const key of pages) {
    const spot=page.locator('[data-object="'+key+'"]');
    await spot.click();
    await page.locator('dialog[open]').waitFor();
    assert.ok(page.url().endsWith('#'+key));
    assert.equal(await page.locator('dialog').evaluate(el => getComputedStyle(el).borderRadius),'0px');
    if (key === 'inspirations') {
      const cta = page.getByRole('button',{name:'Parcourir ma pile de livres'});
      assert.equal(await cta.evaluate(el => getComputedStyle(el).borderRadius),'0px');
      assert.equal(await cta.evaluate(el => getComputedStyle(el).fontWeight),'700');
      assert.equal(await cta.evaluate(el => getComputedStyle(el).backgroundColor),'rgb(255, 209, 106)');
      await cta.click();
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
  await page.close();
  console.log('Parcours validé : '+width+' × '+height);
}
await browser.close();
assert.deepEqual(errors,[]);
