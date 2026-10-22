import { Page } from "@playwright/test";
import { CheckoutPageLocators } from "../Locators/CheckoutPageLocators";
import { CheckoutData } from "../TestData/checkoutData";

export class CheckoutPage
{
    constructor(private page: Page){}

    async getCheckoutElements()
    {
        return{
            pageInfo : this.page.locator(CheckoutPageLocators.pageInfo),
            cancel_Btn : this.page.locator(CheckoutPageLocators.cancel_Btn),
            continue_Btn : this.page.locator(CheckoutPageLocators.continue_Btn)
        }
    }
    async clickOnContinueButton()
    {
        await this.page.locator(CheckoutPageLocators.continue_Btn).click();
    }
    async clickOnCancelButton()
    {
        await this.page.locator(CheckoutPageLocators.cancel_Btn).click();
    }
    async enterCheckoutInfo(fNmae:string, lName:string, zCode:string)
    {
        await this.page.locator(CheckoutPageLocators.firstName_Txt).fill(fNmae);
        await this.page.locator(CheckoutPageLocators.lastName_Txt).fill(lName);
        await this.page.locator(CheckoutPageLocators.zipCode_Txt).fill(zCode);
    }
    async getErrorMessage()
    {
        return await this.page.locator(CheckoutPageLocators.errorMessage).textContent();
    }
    
}