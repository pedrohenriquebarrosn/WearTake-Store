const { test, expect } = require("@playwright/test");
test("English storefront and reversible translation preserve cart",async({page})=>{
  await page.goto("/?lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang","en");
  await expect(page.getByRole("heading",{name:"Explore the collection"})).toBeVisible();
  await page.getByRole("button",{name:"Add Lightweight Jacket to the bag"}).click();
  await expect(page.locator("#cart-quantity")).toHaveText("1");
  await page.getByRole("button",{name:"Português"}).click();
  await expect(page.getByRole("heading",{name:"Explore a coleção"})).toBeVisible();
  await expect(page.locator("#cart-quantity")).toHaveText("1");
  await page.reload();
  await expect(page.locator("#cart-quantity")).toHaveText("1");
});
