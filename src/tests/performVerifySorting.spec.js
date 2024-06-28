const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    const testParams = [
        { name: ['az', 'Name'] },
        { name: ['za', 'Name'] },
        { name: ['lohi', 'Price'] },
        { name: ['hilo', 'Price'] },
    ];

    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);
    });

    testParams.forEach((elem) => {
        test.only(`Sort Products by ${elem.name[1]} ${elem.name[0]}`, async ({ inventoryPage }) => {
            let testData = [];
            await inventoryPage.selectProductSort(elem.name[0]);

            if (elem.name[0] === 'az') {
                testData = await inventoryPage.getAllProductNames();
                testParams[0].sort = [...testData].sort();

            } else if (elem.name[0] === 'za') {
                testData = await inventoryPage.getAllProductNames();
                testParams[1].sort = [...testData].sort().reverse();

            } else if (elem.name[0] === 'lohi') {
                testData = await inventoryPage.getAllPrices();
                testParams[2].sort = [...testData].sort((a, b) => a - b);

            } else {
                testData = await inventoryPage.getAllPrices();
                testParams[3].sort = [...testData].sort((a, b) => b - a);

            }
            expect(testData).toEqual(elem.sort);
        });
    });
});
