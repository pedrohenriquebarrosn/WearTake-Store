const {test,expect}=require('@playwright/test');
const published='https://weartake-store-preview-qpves526e-pedrohenriquebarrosns-projects.vercel.app/';

for (const width of [1280,390]) test('published master storefront '+width+'px: live products, local cart and language',async({page})=>{
  await page.setViewportSize({width,height:width===390?844:900});
  const js=[];page.on('pageerror',e=>js.push(e.message));
  const response=await page.goto(published+'?lang=pt',{waitUntil:'domcontentloaded',timeout:25000});
  expect(response?.status()).toBe(200);
  await expect(page.locator('.product-card')).toHaveCount(6);
  await page.locator('[data-add-product="1"]').click();
  await expect(page.locator('#cart-total')).toContainText('100,00');
  await page.reload();
  await expect(page.locator('#cart-total')).toContainText('100,00');
  await page.locator('[data-language="en"]').click();
  await expect(page.getByRole('heading',{name:'Explore the collection'})).toBeVisible();
  await expect(page.locator('#cart-total')).toContainText('100.00');
  const hasHorizontalOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
  expect(hasHorizontalOverflow).toBe(false);
  expect(js).toEqual([]);
  await page.screenshot({path:'test-results/weartake-published-'+width+'.png',fullPage:true});
});
