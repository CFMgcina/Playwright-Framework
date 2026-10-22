import {Page} from "@playwright/test"
import { FinalPageLocators } from "../Locators/FinalPageLocators"
import { CheckoutOverviewPage } from "./CheckoutOverviewPage"

export class FinalPage
{
    constructor(private page : Page){}

    async getFinalPageElements()
    {
        return{
            finalPageInfo : await this.page.locator(FinalPageLocators.finalPageInfo).textContent(),
            backHomeButton : this.page.locator(FinalPageLocators.backHome_Btn),
            generatePdfButton : this.page.locator(FinalPageLocators.generatePdf_Btn),
            successMsg : await this.page.locator(FinalPageLocators.successMsg)
        }
    }
    async getSuccessMessage()
    {
        const text = await this.page.locator(FinalPageLocators.successMsg).innerText();
        return text.trim();
    }
    
    async clickOnBackHomeButton()
    {
        await this.page.locator(FinalPageLocators.backHome_Btn).click();
    }

    async clickOnGeneratePdfButton()
    {
        await this.page.locator(FinalPageLocators.generatePdf_Btn).click();
    }

} 