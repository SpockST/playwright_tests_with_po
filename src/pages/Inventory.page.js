const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    productNamesSelector = '.inventory_item_name';

    pricesSelector = '.inventory_item_price';

    productSortContainerSelector = '.product_sort_container';

    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async selectProductSort(sortParams) {
        await this.page.selectOption(this.productSortContainerSelector, sortParams);
    }

    async getAllProductNames() {
        return this.page.locator(this.productNamesSelector)
            .allInnerTexts((names) => names.map((name) => name.textContent));
    }

    async getAllPrices() {
        const priceTexts = await this.page.locator(this.pricesSelector).allInnerTexts();
        return priceTexts.map(price => parseFloat(price.replace('$', '')));
    }
}
