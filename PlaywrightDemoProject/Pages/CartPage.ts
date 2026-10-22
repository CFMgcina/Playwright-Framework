import { Page } from "@playwright/test";
import { CartPageLocators } from "../Locators/CartPageLocators";

export class CartPage
{
    constructor(private page : Page){}
    
    async clickOnContinueButton()
    {
        await this.page.locator(CartPageLocators.continueShopping_Btn).click();
    }
    async getCartPageElements()
    {
        return{
        cartTitle : this.page.locator(CartPageLocators.cartPageTitle),
        contiuneShoppingBtn : this.page.locator(CartPageLocators.continueShopping_Btn),
        checkOutBtn : this.page.locator(CartPageLocators.checkout_Btn)
        }
    }
    async getCartProducts()
    {
        const allName =  await this.page.locator(CartPageLocators.cartProductNames).allTextContents();
        const allDescription = await this.page.locator(CartPageLocators.cartProductDesc).allTextContents();
        const allPrices = await this.page.locator(CartPageLocators.cartProductPrice).allTextContents();
        
        const allCartProducts = allName.map((_,i)=>({

            name : allName[i].trim(),
            description : allDescription[i].trim(),
            price : allPrices[i].trim()
        }));
        return allCartProducts;
    }

    async RemoveAllProdutsInCart()
    {
        const removeBtn = this.page.locator(CartPageLocators.cartProductRemove_Btn);
        const countRemoveBtn = await removeBtn.count();
        for(let i=0;i<countRemoveBtn;i++)
        {
            await removeBtn.nth(i).click();
        }
    }

    async removeFirstProduct()
    {
        await this.page.locator(CartPageLocators.cartProductRemove_Btn).first().click();
    }
    async getCartProductNames()
    {
        return await this.page.locator(CartPageLocators.cartProductNames).allTextContents();
    }
    async GetProductPricesFromCart()
    {
        const prices = await this.page.locator(CartPageLocators.cartProductPrice).allTextContents();
        return prices.map(price=>(price.replace("$","")));
    }

    async clickChekoutBtn()
    {
        await this.page.locator(CartPageLocators.checkout_Btn).click();
    }
}