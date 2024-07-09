const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const USER = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    const testParams = [
        { sortingTitle: 'Title A to Z', sortingType: 'az', func: function(param) {return [...param].sort();}},
        { sortingTitle: 'Title Z to A', sortingType:'za', func: function(param) {return [...param].sort().reverse();} },
        { sortingTitle: 'PriceLow to High', sortingType: 'lohi', func: function(param) {return [...param].sort((a, b) => a - b);} },
        { sortingTitle: 'Price High to Low', sortingType: 'hilo', func: function(param) {return [...param].sort((a, b) => b - a);} }
    ];

    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(USER.login, USER.password);
    });

    testParams.forEach((elem) => {
        test(`Sort Products by ${elem.sortingTitle}`, async ({ inventoryPage }) => {
            await inventoryPage.selectProductSort(elem.sortingType);

            let testData = [];
            if (elem.sortingType === 'az' || elem.sortingType === 'za') {
                testData = await inventoryPage.getAllProductNames();
            } else {
                testData = await inventoryPage.getAllPrices();
            }
            expect(testData).toEqual(elem.func(testData));
        });
    });
}); 