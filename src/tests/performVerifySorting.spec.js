const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    const sortParamsName = ['az', 'za'];
    const sortParamsPrise = ['lohi', 'hilo'];
    
    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);
    });

    sortParamsName.forEach(sortParam => {
        test.only(`Sort items by Name ${sortParam}`, async ({ inventoryPage }) => {
            let sortedNames = [];
            await inventoryPage.selectProductSort(sortParam);
            const itemNames = await inventoryPage.getAllProductNames();
            if(sortParam === 'az') {
                sortedNames = [...itemNames].sort();
            } else {
                sortedNames = [...itemNames].sort().reverse();
            }
            expect(itemNames).toEqual(sortedNames);
        }); 
    })

    sortParamsPrise.forEach(sortParam => {
        test.only(`Sort items by Name ${sortParam}`, async ({ inventoryPage }) => {
            let sortedPrices = [];
            await inventoryPage.selectProductSort(sortParam);
            const itemPrices = await inventoryPage.getAllPrices();
            if(sortParam === 'lohi') {
                sortedPrices = [...itemPrices].sort((a, b) => a - b);
            } else {
                sortedPrices = [...itemPrices].sort((a, b) => b - a);
            }
            expect(itemPrices).toEqual(sortedPrices);
        }); 
    })
});
