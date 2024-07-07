const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const  USER = require('../auth/user.json');
const { getRandomNumbers } = require('../utilits/randomNumberProduct');
let randomArr = getRandomNumbers(5);

test.describe('Checking the name, description and price of the product on the checkout page', () => {
    let testData = {};

    test.beforeEach(async ({ loginPage, inventoryPage, shopingCartPage, checkoutPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(USER.login, USER.password);
        testData = await inventoryPage.getNamesDescriptionsPricesAndTotalPrise(randomArr);
        await shopingCartPage.navigate();
        await shopingCartPage.cheskout();
        await checkoutPage.informationInputAndContinue(USER.firstName, USER.lastName, USER.postalCode);

    });

    test.only('Checking the product name on the checkout page', async ({ checkoutPage }) => {
        for (let key in testData.name) {
            let rez = await checkoutPage.geItemsNameById(key);
            expect(rez).toEqual(testData.name[key]);
        }
        
    });

    test.only('Checking the product description on the checkout page', async ({ checkoutPage }) => {
        for (let key in testData.description) {
            let rez = await checkoutPage.getItemsDescriptionById(key);
            expect(rez).toEqual(testData.description[key]);
        }
        
    });

    test.only('Checking the product prices on the checkout page', async ({ checkoutPage }) => {
        for (let key in testData.prices) {
            let rez = await checkoutPage.getItemsPricesById(key);
            expect(rez).toEqual(testData.prices[key]);
        }
        
    });

    test.only('Checking the product totalPrice on the checkout page', async ({ checkoutPage }) => {
            let rez = await checkoutPage.getTotalPrice();
            console.log(rez);
            expect(rez).toEqual(testData.totalPrice);
    });
});
