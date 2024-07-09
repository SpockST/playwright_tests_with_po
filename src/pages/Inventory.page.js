const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    productNamesSelector = '.inventory_item_name';

    pricesSelector = '.inventory_item_price';

    productSortContainerSelector = '.product_sort_container';

    productDescriptionsSelector = '.inventory_item_desc';

    shoppingCartLinkSelector = '.shopping_cart_link';

    pricesSelector = '.inventory_item_price';

    productNamesSelector = '.inventory_item_name';

    productDescriptionsSelector = '.inventory_item_desc';

    get headerTitle() { return this.page.locator('.title'); }
    get headerTitle() { return this.page.locator('.title'); }

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async addItemToCartFirst(id) {
        await this.page.locator(`.inventory_item:nth-of-type(${id}) [id^="add-to-cart"]`).click();
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

    async getAllProductDescriptions() {
        return this.page.locator(this.productDescriptionsSelector).allInnerTexts((descriptions) => descriptions.map((descr) => descr.textContent));
    }

    async openShoppingCart() {
        await this.page.locator(this.shoppingCartLinkSelector).click();
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

    async getNamesDescriptionsPricesAndTotalPrise(arr) {
        const objResult = {
            name: [],
            description: [],
            prices: [],
            totalPrice: 0
        };
        
        for (const indexProduct of arr) {
            await this.addItemToCartById(indexProduct);
            objResult.name.push(await this.geItemsNameById(indexProduct));
            objResult.description.push(await this.getItemsDescriptionById(indexProduct));
            const price = await this.getItemsPricesById(indexProduct); // Предполагаем, что здесь должно быть получение цены
            objResult.prices.push(price);
            objResult.totalPrice += price;
        }
    
        return objResult;
    }
}
