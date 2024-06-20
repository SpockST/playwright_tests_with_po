const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

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
        await this.page.selectOption('.product_sort_container', sortParams);
    }

    async getAllItems() {
        return this.page.$$eval('.inventory_item_name', (items) => items.map((item) => item.textContent));
    }

    async getAllPrices() {
        return this.page.$$eval('.inventory_item_price', (prices) => prices.map((price) => parseFloat(price.textContent.replace('$', ''))));
    }
}
