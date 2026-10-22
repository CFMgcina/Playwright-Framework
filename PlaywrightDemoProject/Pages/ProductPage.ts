import { Page } from "@playwright/test";
import { ProdutLocators } from "../Locators/ProductLocators";

export class ProductPage 
{
    constructor(private page: Page){}
    async LogOut()
    {
        await this.page.click(ProdutLocators.settingIcon);
        await this.page.click(ProdutLocators.logoutLint);
    }

    async openAboutPage()
    {
        await this.page.click(ProdutLocators.settingIcon);
        await this.page.click(ProdutLocators.aboutLint);
    }
    async validateProductPage()
    {
        const prodNames = await this.page.locator(ProdutLocators.productNames).allTextContents();
        const prodDescriptions = await this.page.locator(ProdutLocators.productDescription).allTextContents();
        const prices = await this.page.locator(ProdutLocators.productPrice).allTextContents();
        const cartButtonsCount = await this.page.locator(ProdutLocators.productAddCartButton).count();

        if(prodNames.length!==6)
            throw new Error("No products found")

        if(prodNames.length!==prodDescriptions.length||prodNames.length!==prices.length||
            prodNames.length!==cartButtonsCount)
            throw new Error("There is mismatch in products")      
    }
    async addFirstProductToCard()
    {
        await this.page.locator(ProdutLocators.productAddCartButton).nth(0).click();
    }
    async addAllProductToCart()
    {
        const cartsBtn = this.page.locator(ProdutLocators.productAddCartButton);
        const count = await cartsBtn.count();
        for(let i=0;i<count;++i)
        {
            await cartsBtn.nth(i).click();
            await this.page.waitForTimeout(1000);
        }
    }
    async AddSpecificProductsToCart(productNames : string[])
    {
        const allProductNames = this.page.locator(ProdutLocators.productNames);
        const count = await allProductNames.count();
        for(let i=0;i<count;++i)
        {
            const name = await allProductNames.nth(i).textContent();
            if(name && productNames.includes(name.trim()))
            {
                await this.page.locator(ProdutLocators.productAddCartButton).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }
    async filterName_A_Z()
    {
        await this.page.selectOption(ProdutLocators.filterDropDown,"az");
    }
    async filterName_Z_A()
    {
        await this.page.selectOption(ProdutLocators.filterDropDown,"za")
    }
    async filterPrice_Low_High()
    {
        await this.page.selectOption(ProdutLocators.filterDropDown,"lohi")
        await this.page.waitForTimeout(3000);
    }
    async filterPrice_High_Low()
    {
        await this.page.selectOption(ProdutLocators.filterDropDown,"hilo")
        await this.page.waitForTimeout(3000);
    }
    async getProductNames()
    {
        return await this.page.locator(ProdutLocators.productNames).allTextContents();
        
    }
    async getProductPrices()
    {
        const prices =  await this.page.locator(ProdutLocators.productPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace("$",'')));

    }
    async ClickOnCartLink()
    {
        await this.page.locator(ProdutLocators.cartPageLink).click();
    }
    async getFirstProductDetails()
    {
        const name =await this.page.locator(ProdutLocators.productNames).first().textContent();
        const description =await this.page.locator(ProdutLocators.productDescription).first().textContent();
        const price = await this.page.locator(ProdutLocators.productPrice).first().textContent();

        return {
            name : name?.trim(),
            description : description?.trim(),
            price : price?.trim(),
        };
    }
    async getAllProductsDetails()
    {
        const allNames = await  this.page.locator(ProdutLocators.productNames).allTextContents();
        const allDescriptions = await this.page.locator(ProdutLocators.productDescription).allInnerTexts();
        const allPrices = (await this.page.locator(ProdutLocators.productPrice).allTextContents());
        
        const allProducts = allNames.map((_,i)=>({
            name : allNames[i].trim(),
            description : allDescriptions[i].trim(),
            price : allPrices[i].trim()

        }));
        return allProducts;

        
    }
    async getSingleProductDetails(prodname : string)
    {
        const namesCount = await this.page.locator(ProdutLocators.productNames).count();
        for(let i=0;i<namesCount;i++)
        {   
            const currenName = await this.page.locator(ProdutLocators.productNames).nth(i).textContent();
            if(currenName?.includes(prodname))
                {
                    return{
                        name : this.page.locator(ProdutLocators.productNames).nth(i).textContent(),
                        description : this.page.locator(ProdutLocators.productDescription).nth(i).textContent(),
                        price : this.page.locator(ProdutLocators.productPrice).nth(i).textContent()
                    }
                }
        }
    }
    async getSpecificProductsDetails(productName : string[])
    {
        const allNames = await this.page.locator(ProdutLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(ProdutLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(ProdutLocators.productPrice).allTextContents();

        const allProduts = allNames.map((_,i)=>({
            name : allNames[i].trim(),
            description : allDescription[i].trim(),
            price : allPrices[i].trim()
        }))

        return allProduts.filter(p =>productName.includes(p.name));

    }


}
