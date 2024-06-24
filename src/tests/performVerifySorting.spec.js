const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);
    });

    test('Sort items by Name (A to Z)', async ({ inventoryPage }) => {
        await inventoryPage.selectProductSort('az');
        const itemNames = await inventoryPage.getAllProductNames();
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    test('Sort items by Name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.selectProductSort('za');
        const itemNames = await inventoryPage.getAllProductNames();
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
    });

    test('Sort items by Price (low to high)', async ({ inventoryPage }) => {
        await inventoryPage.selectProductSort('lohi');
        const itemPrices = await inventoryPage.getAllPrices();
        const sortedPrices = [...itemPrices].sort((a, b) => a - b);
        expect(itemPrices).toEqual(sortedPrices);
    });

    test('Sort items by Price (high to low)', async ({ inventoryPage }) => {
        await inventoryPage.selectProductSort('hilo');
        const itemPrices = await inventoryPage.getAllPrices();
        const sortedPrices = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedPrices);
    });
});
