const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    productNamesSelector = '.inventory_item_name';

    pricesSelector = '.inventory_item_price';
    
    productSortContainerSelector = '.product_sort_container';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async selectProductSort(sortParams) {
        await this.page.selectOption(this.productSortContainerSelector, sortParams);
    }

    async getAllProductNames() {
        return this.page.locator(this.productNamesSelector).allInnerTexts( (names) => names.map((name) => name.textContent));
    }

    async getAllPrices() {
        return this.page.locator(this.pricesSelector).allInnerTexts( (prices) => prices.map((price) => parseFloat(price.textContent.replace('$', ''))));
    }
}
