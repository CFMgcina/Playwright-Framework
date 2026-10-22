import {Page} from "@playwright/test"
import { LoginPage } from "./LoginPage"
import { ProductPage } from "./ProductPage"
import { CartPage } from "./CartPage"
import { CheckoutPage } from "./CheckoutPage"
import { CheckoutOverviewLocators } from "../Locators/CheckoutOverviewLocators"
import { BASE_URL,USERNAME,PASSWORD } from "../Utils/envConfig"

export class CheckoutOverviewPage
{
    constructor(private page : Page){}

    async getUIElements()
    {
        return {
            overviewInfo : this.page.locator(CheckoutOverviewLocators.overviewInfo),
            cancel_Btn : this.page.locator(CheckoutOverviewLocators.cancel_Btn),
            finish_Btn : this.page.locator(CheckoutOverviewLocators.finish_Btn) 
        }
    }
    async clickCancelButton()
    {
        await this.page.locator(CheckoutOverviewLocators.cancel_Btn).click();
    }
    async clickFinishButton()
    {
        await this.page.locator(CheckoutOverviewLocators.finish_Btn).click();
    }
    async getCheckoutOverviewProductDetails()
    {
        const allNames  = await this.page.locator(CheckoutOverviewLocators.productNames).allTextContents();
        const allDescriptions = await this.page.locator(CheckoutOverviewLocators.productDescriptions).allTextContents();
        const allPrices = await this.page.locator(CheckoutOverviewLocators.productPrices).allTextContents();
        
        const allProdutsDetails = allNames.map((_,i)=>({
            name : allNames[i].trim(),
            description : allDescriptions[i].trim(),
            price : allPrices[i].trim()
        }));

        return allProdutsDetails;
    }

    async getItemTotal()
    {
        const totalNum = await this.page.locator(CheckoutOverviewLocators.itemTotal).textContent();
        return parseFloat(totalNum!.replace("Item total: $","").trim());
    }
    async getTax()
    {
        const taxNum = await this.page.locator(CheckoutOverviewLocators.tax).textContent();
        return parseFloat(taxNum!.replace("Tax: $","").trim());
    }
    async getTotal()
    {
        const totalNum = await this.page.locator(CheckoutOverviewLocators.total).textContent();
        return parseFloat(totalNum!.replace("Total: $","").trim());
    }
}
