const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const results = [];
const sites = {
  hub: 'https://kenziehub-qfwq-13de0g0ty-pedrohenriquebarrosns-projects.vercel.app/?lang=pt',
  nukenzie: 'https://entrega-nukenzie-pedro-g9tk-iqgcbph2g.vercel.app/?lang=pt',
  burger: 'https://kenzie-burguer-v2-template-pedro-henrique-eoyd-c5ec30mk6.vercel.app/?lang=pt',
  weartake: 'https://weartake-store-preview-b8u4grwle-pedrohenriquebarrosns-projects.vercel.app/?lang=pt'
};
fs.mkdirSync('test-results/pinned-live', {recursive:true});
const browser = await chromium.launch({headless:true});
async function run(name, width, fn){
  const context = await browser.newContext({viewport: {width,height: width===390 ? 844 : 900}});
  const page = await context.newPage();
  const jsErrors = [];
  page.on('pageerror', error => jsErrors.push(error.message));
  page.setDefaultTimeout(12000);
  try{
    const res = await page.goto(sites[name], {waitUntil:'domcontentloaded',timeout:25000});
    if(!res || res.status() !== 200) throw new Error('Page HTTP status: '+(res?.status()??'no response'));
    await fn(page);
    if(jsErrors.length) throw new Error('Browser JS errors: '+jsErrors.join(' | '));
    await page.screenshot({path:`test-results/pinned-live/${name}-${width}.png`,fullPage:true});
    results.push({name,width,result:'PASS',http:res.status(),jsErrors:0});
  }catch(error){
    await page.screenshot({path:`test-results/pinned-live/${name}-${width}-failure.png`,fullPage:true}).catch(()=>{});
    results.push({name,width,result:'FAIL',reason:String(error.message).slice(0,500),jsErrors:jsErrors.slice(0,4)});
  }finally{await context.close();}
}
for (const width of [1280,390]){
  await run('hub',width,async page=>{
    await page.getByRole('button',{name:/Acessar demonstração/i}).click();
    await page.getByText(/Demonstração local:/i).waitFor();
    await page.locator('.titleTechs button').click();
    await page.getByPlaceholder('Digite aqui o nome da tecnologia').fill('Playwright');
    await page.getByRole('button',{name:'Cadastrar Tecnologia'}).click();
    await page.getByText('Playwright',{exact:true}).waitFor();
  });
  await run('burger',width,async page=>{
    await page.getByRole('button',{name:/Acessar demonstração/i}).click();
    await page.getByText(/Loja demonstrativa/i).waitFor();
    await page.getByRole('button',{name:'Adicionar'}).first().click();
    await page.getByRole('button',{name:'Abrir carrinho'}).click();
    await page.getByRole('heading',{name:'Carrinho de compras'}).waitFor();
    const value=await page.locator('.total').innerText();
    if(!value.includes('22,90')) throw new Error('Unexpected cart amount: '+value);
  });
  await run('weartake',width,async page=>{
    await page.locator('.product-card').first().waitFor();
    const count=await page.locator('.product-card').count();
    if(count!==6) throw new Error('Expected 6 catalog products, saw '+count);
    await page.getByRole('button',{name:'Adicionar Lightweight Jacket à sacola'}).click();
    const total=await page.locator('#cart-total').innerText();
    if(!total.includes('100,00')) throw new Error('Unexpected cart amount: '+total);
    await page.reload();
    const persisted=await page.locator('#cart-total').innerText();
    if(!persisted.includes('100,00')) throw new Error('Cart not preserved on reload: '+persisted);
  });
  await run('nukenzie',width,async page=>{
    await page.getByRole('button',{name:/iniciar/i}).click();
    await page.locator('#input__text').fill('Salário');
    await page.locator('#input__number').fill('100');
    await page.locator('#select__type').selectOption('Entrada');
    await page.getByRole('button',{name:'Inserir valor'}).click();
    await page.locator('#input__text').fill('Mercado');
    await page.locator('#input__number').fill('30');
    await page.locator('#select__type').selectOption('Despesa');
    await page.getByRole('button',{name:'Inserir valor'}).click();
    const balance=await page.locator('.total__value h3').innerText();
    if(!balance.includes('70,00')) throw new Error('Expected balance 70 BRL, saw '+balance);
  });
}
await browser.close();
fs.writeFileSync('test-results/pinned-live/summary.json',JSON.stringify(results,null,2));
console.log('PINNED_LIVE_QA_SUMMARY',JSON.stringify(results));
if(results.some(r=>r.result==='FAIL')) process.exitCode=1;
