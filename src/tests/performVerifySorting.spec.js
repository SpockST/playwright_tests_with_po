const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    const testParams = [
        { name: 'az', sort: [] },
        { name: 'za', sort: [] },
        { name: 'lohi', sort: [] },
        { name: 'hilo', sort: [] },
    ];

    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);

        const itemNames = await inventoryPage.getAllProductNames();
        testParams[0].sort = [...itemNames].sort();
        testParams[1].sort = [...itemNames].sort().reverse();

        const itemPrices = await inventoryPage.getAllPrices();
        testParams[2].sort = [...itemPrices].sort((a, b) => a - b);
        testParams[3].sort = [...itemPrices].sort((a, b) => b - a);
    });

    testParams.forEach((elem) => {
        test.only(`Sort items by ${elem.name}`, async ({ inventoryPage }) => {
            let testData = [];
            await inventoryPage.selectProductSort(elem.name);
            if (elem.name === 'az' || elem.name === 'za') {
                testData = await inventoryPage.getAllProductNames();
            } else {
                testData = await inventoryPage.getAllPrices();
            }
            expect(testData).toEqual(elem.sort);
        });
    });
});
