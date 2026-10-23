import {test, expect}  from "@playwright/test";
import { ProductPage } from "../PlaywrightDemoProject/Pages/ProductPage";
import { LoginPage } from "../PlaywrightDemoProject/Pages/LoginPage";
import { BASE_URL,USERNAME,PASSWORD } from "../PlaywrightDemoProject/Utils/envConfig";
import { LoginLocators } from "../PlaywrightDemoProject/Locators/LoginLocators";
import { ProdutLocators } from "../PlaywrightDemoProject/Locators/ProductLocators";
import { productsToCart } from "../PlaywrightDemoProject/TestData/Products";
test.describe("Product Page Validation",async()=>
{
    let loginPage : LoginPage
    let productPage : ProductPage

    test.beforeEach(async({page})=>
    {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.LoginMethod(USERNAME,PASSWORD);       
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await page.evaluate(() => {
        document.body.style.zoom = '0.6';
        });
    });

    test("Validate Logout Functionality", async ({page})=>
    {
        await productPage.LogOut();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    });

    test("Open About Page and Navigating Back", async ({page})=>
    {
        await productPage.openAboutPage();
        
        //page.on('dialog', dialog => dialog.dismiss());
        //await expect(page.locator(ProdutLocators.bookDemoButton)).toBeVisible();
        //await expect(page.locator(ProdutLocators.startFree)).toBeVisible();
        await page.goBack();
        await expect(page.locator(ProdutLocators.settingIcon)).toBeVisible();
    });

    test('validate product page', async ({page})=>
    {
        await productPage.validateProductPage(); 
        await productPage.addFirstProductToCard();
        await productPage.addAllProductToCart();
    });

    test('Validate Adding Specific Products To Cart', async ({page})=>
    {
        await productPage.AddSpecificProductsToCart(productsToCart);
    });

    test("filerByName A to Z", async({page})=>
    {
        await productPage.filterName_A_Z();
        const names = await productPage.getProductNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);

    });
    test("filerByName Z to A", async({page})=>
    {
        await productPage.filterName_Z_A();
        const names = await productPage.getProductNames();
        const reversed = [...names].sort().reverse();
        expect(names).toEqual(reversed);

    });
    test("filerByPrice low to High", async({page})=>
    {
        await productPage.filterPrice_Low_High();
        const prices = await productPage.getProductPrices();
        const sortedPrices = [...prices].sort((a,b)=>a-b);
        expect(prices).toEqual(sortedPrices);

    });
    test("filerByPrice High to Low", async({page})=>
    {
        await productPage.filterPrice_High_Low();
        const prices = await productPage.getProductPrices();
        const sortedPrice_H_L = [...prices].sort((a,b)=>b-a);
        expect(prices).toEqual(sortedPrice_H_L);
    });



});






 