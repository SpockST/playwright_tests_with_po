const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');

test.describe('Inventory Sorting', () => {
    const sortParamsName = ['az', 'za'];
    const sortParamsPrise = ['lohi', 'hilo'];
    // let sortedNameAZ = [];
    // let sortedNamesZA = [];
    // let sortedPricesLohi = [];
    // let sortedPricesHilo = [];
    const testParams = {
        // az: sortedNameAZ,
        // za: sortedNamesZA,
        // lohi: sortedPricesLohi,
        // hilo: sortedPricesHilo,
    };

    test.beforeEach(async ({ inventoryPage, loginPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);

        const itemNames = await inventoryPage.getAllProductNames();
        testParams.az = [...itemNames].sort();
        testParams.za = [...itemNames].sort().reverse();

        const itemPrices = await inventoryPage.getAllPrices();
        testParams.lohi = [...itemPrices].sort((a, b) => a - b);
        testParams.hilo = [...itemPrices].sort((a, b) => b - a);
    });

    for (const param in testParams) {
        test(`Sort items by ${param}`, async ({ inventoryPage }) => {
            let teatData = [];
            await inventoryPage.selectProductSort(param);
            if(param === 'az' || param === 'za') {
                teatData = await inventoryPage.getAllProductNames();
            } else {
                teatData = await inventoryPage.getAllPrices();
            }
            expect(teatData).toEqual(testParams[param]);
        });
    }

    // sortParamsName.forEach(sortParam => {
    //     test(`Sort items by Name ${sortParam}`, async ({ inventoryPage }) => {
    //         await inventoryPage.selectProductSort(sortParam);
    //         expect(itemNames).toEqual(sortedNames);
    //     });
    // })
});
