const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Inventory Sorting', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });

    test('Sort items by Name (A to Z)', async ({ shopingCartPage }) => {
        await shopingCartPage.selectProductSort('az');
        const itemNames = await shopingCartPage.getAllItems();
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    test('Sort items by Name (Z to A)', async ({ shopingCartPage }) => {
        await shopingCartPage.selectProductSort('za');
        const itemNames = await shopingCartPage.getAllItems();
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
    });

    test('Sort items by Price (low to high)', async ({ shopingCartPage }) => {
        await shopingCartPage.selectProductSort('lohi');
        const itemPrices = await shopingCartPage.getAllPrices();
        const sortedPrices = [...itemPrices].sort((a, b) => a - b);
        expect(itemPrices).toEqual(sortedPrices);
    });

    test('Sort items by Price (high to low)', async ({ shopingCartPage }) => {
        await shopingCartPage.selectProductSort('hilo');
        const itemPrices = await shopingCartPage.getAllPrices();
        const sortedPrices = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedPrices);
    });
});
