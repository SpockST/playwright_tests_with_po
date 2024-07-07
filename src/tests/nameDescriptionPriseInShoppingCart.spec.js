const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { login, password } = require('../auth/user.json');
const { getRandomNumbers } = require('../utilits/randomNumberProduct');
let randomArr = getRandomNumbers();

test.describe('Checking the name, prise and description of the attached product card', () => {
    
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await inventoryPage.navigate();
        await loginPage.performLogin(login, password);
    });

    randomArr.forEach((indexProduct) => {
        test.describe('', () => {
            let name = '';
            let price = 0;
            let description = '';

            test.beforeEach(async ({ shopingCartPage, inventoryPage }) => {
                await inventoryPage.addItemToCartById(indexProduct);
                name = await inventoryPage.geItemsNameById(indexProduct);
                price = await inventoryPage.getItemsPricesById(indexProduct);
                description = await inventoryPage.getItemsDescriptionById(indexProduct);
                await shopingCartPage.navigate();
                
            });

            test(`Checking the card name of the product added to Shopping Cart with index ${indexProduct}`, async ({ shopingCartPage }) => {
                const card = await shopingCartPage.geItemsNameById(0);
                expect(card).toEqual(name);
            });

            test(`Checking the card prise of the product added to Shopping Cart with index ${indexProduct}`, async ({ shopingCartPage }) => {
                const priceShopinCart = await shopingCartPage.getItemsPricesById(0);
                expect(priceShopinCart).toEqual(price);
            });

            test(`Checking the card description of the product added to Shopping Cart with index ${indexProduct}`, async ({ shopingCartPage }) => {
                const descrShopinCart = await shopingCartPage.getItemsDescriptionById(0);
                expect(descrShopinCart).toEqual(description);
            });

            test.afterEach(async ({ shopingCartPage }) => {
                await shopingCartPage.removeCartItemById(0);
            });
        });
    });
});
