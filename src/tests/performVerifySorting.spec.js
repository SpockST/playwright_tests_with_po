const { test, expect } = require('@playwright/test');

const url = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Inventory Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.fill('#user-name', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#login-button');
    await expect(page).toHaveURL(`${url}inventory.html`);
  });

  test('Sort items by Name (A to Z)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    const itemNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
    const sortedNames = [...itemNames].sort();
    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort items by Name (Z to A)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'za');
    const itemNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
    const sortedNames = [...itemNames].sort().reverse();
    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort items by Price (low to high)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    const itemPrices = await page.$$eval('.inventory_item_price', prices => prices.map(price => parseFloat(price.textContent.replace('$', ''))));
    const sortedPrices = [...itemPrices].sort((a, b) => a - b);
    expect(itemPrices).toEqual(sortedPrices);
  });

  test('Sort items by Price (high to low)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'hilo');
    const itemPrices = await page.$$eval('.inventory_item_price', prices => prices.map(price => parseFloat(price.textContent.replace('$', ''))));
    const sortedPrices = [...itemPrices].sort((a, b) => b - a);
    expect(itemPrices).toEqual(sortedPrices);
  });
});
