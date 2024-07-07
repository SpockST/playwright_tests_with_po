const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    pricesSelector = '.inventory_item_price';

    productNamesSelector = '.inventory_item_name';

    productDescriptionsSelector = '.inventory_item_desc';

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

    async geItemsNameById(id) {
        return await this.page.locator(this.productNamesSelector).nth(id).innerText();
    }

    async getItemsPricesById(id) {
        const price = await this.page.locator(this.pricesSelector).nth(id).innerText();
        return parseFloat(price.replace('$', ''));
    }

    async getItemsDescriptionById(id) {
        return await this.page.locator(this.productDescriptionsSelector).nth(id).innerText();
    }

}

