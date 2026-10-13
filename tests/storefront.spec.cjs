const { test, expect } = require("@playwright/test");

test("catalog renders six products, category navigation and combined search", async ({page}) => {
  await page.goto("/");
  await expect(page.locator(".product-card")).toHaveCount(6);
  await expect(page.locator("#catalog-count")).toHaveText("6 produtos");
  await page.getByRole("button", {name:"Camisetas", exact:true}).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(page.getByRole("button", {name:"Camisetas", exact:true})).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Pesquisar na vitrine").fill("Short-Sleeve");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Pesquisar na vitrine").fill("inexistente");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await expect(page.getByText("Nenhum produto encontrado.")).toBeVisible();
  await page.getByLabel("Pesquisar na vitrine").fill("");
  await page.getByRole("button",{name:"Todos",exact:true}).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
});

test("cart maintains independent items and prices across reload and removals", async ({page}) => {
  await page.goto("/");
  await page.locator('[data-add-product="1"]').click();
  await page.locator('[data-add-product="2"]').click();
  await page.locator('[data-add-product="3"]').click();
  await expect(page.locator("#cart-quantity")).toHaveText("3");
  await expect(page.locator("#cart-total")).toContainText("240,00");
  await page.locator('[data-remove="2"]').click();
  await expect(page.locator("#cart-items li")).toHaveCount(2);
  await expect(page.locator("#cart-items")).not.toContainText("Black Hat");
  await expect(page.locator("#cart-total")).toContainText("140,00");
  await page.reload();
  await expect(page.locator("#cart-total")).toContainText("140,00");
  await expect(page.locator("#cart-items li")).toHaveCount(2);
  await page.locator('[data-increase="3"]').click();
  await expect(page.locator("#cart-quantity")).toHaveText("3");
  await expect(page.locator("#cart-total")).toContainText("180,00");
  await page.locator('[data-decrease="1"]').click();
  await expect(page.locator("#cart-total")).toContainText("80,00");
  await expect(page.locator("#cart-items li")).toHaveCount(1);
  await page.getByRole("button",{name:"Limpar sacola"}).click();
  await expect(page.locator("#cart-total")).toContainText("0,00");
  await expect(page.getByText("Sacola vazia")).toBeVisible();
  await page.reload();
  await expect(page.locator("#cart-items li")).toHaveCount(0);
});

test("store is usable on mobile and images load",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  await expect(page.getByRole("heading",{name:"Explore a coleção"})).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(6);
  const loaded=await page.locator(".product-image img").first().evaluate(img=>img.complete && img.naturalWidth>0);
  expect(loaded).toBe(true);
  await page.locator('[data-add-product="1"]').click();
  await expect(page.locator("#cart-total")).toContainText("100,00");
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
  expect(overflow).toBe(false);
  await page.screenshot({path:"test-results/weartake-mobile.png",fullPage:true});
});
