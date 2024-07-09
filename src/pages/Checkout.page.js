const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutPage extends BaseSwagLabPage {

        firstNameInput = '#first-name';

        lastNameInput = '#last-name';

        postalCodeInput = '#postal-code';

        continueButton = '#continue';

        pricesSelector = '.inventory_item_price';

        productNamesSelector = '.inventory_item_name';

        productDescriptionsSelector = '.inventory_item_desc';

        totalPrice = '.summary_subtotal_label';

        async informationInputAndContinue(firstName, lastName, postalCode) {
            await this.page.locator(this.firstNameInput).fill(firstName);
            await this.page.locator(this.lastNameInput).fill(lastName);
            await this.page.locator(this.postalCodeInput).fill(postalCode);
            await this.page.locator(this.continueButton).click();
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

        async getTotalPrice() {
            const price =  await this.page.locator(this.totalPrice).innerText();
            return parseFloat(price.split('$')[1].trim());
        }
}