import {test, expect} from "@playwright/test";
import { Page } from "@playwright/test";
import { LoginPage } from "../PlaywrightDemoProject/Pages/LoginPage";
import { CartPage } from "../PlaywrightDemoProject/Pages/CartPage";
import { ProductPage} from "../PlaywrightDemoProject/Pages/ProductPage";
import { BASE_URL, USERNAME,PASSWORD } from "../PlaywrightDemoProject/Utils/envConfig";
import { productsToCart } from "../PlaywrightDemoProject/TestData/Products";
import { CartPageLocators } from "../PlaywrightDemoProject/Locators/CartPageLocators";

test.describe("Cart Page Validation", async()=>{
    let loginPage : LoginPage
    let productPage : ProductPage
    let cartPage : CartPage
    
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.LoginMethod(USERNAME,PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        
    })
    test('Validate Cart Page URL and UI Elements ', async ({page})=>
    {
        await productPage.addFirstProductToCard();
        await productPage.ClickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        const cartUI = await cartPage.getCartPageElements();
        await expect(cartUI.cartTitle).toBeVisible();
        await expect(cartUI.cartTitle).toHaveText("Your Cart");
        await expect(cartUI.checkOutBtn).toBeVisible();
        await expect(cartUI.contiuneShoppingBtn).toBeVisible();
    });
    
    test('Validate Continue Button Functionality', async ({page})=>
    {
        await productPage.addFirstProductToCard();
        await productPage.ClickOnCartLink();
        await cartPage.clickOnContinueButton();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
    });
    test('Validate First Product in the Cart page', async ({page})=>
    {
        
        const firstProduct_ProdPage  = await productPage.getFirstProductDetails(); 
        await productPage.addFirstProductToCard();
        await productPage.ClickOnCartLink();

        const cartProduts = await cartPage.getCartProducts();
        expect(cartProduts[0]).toEqual(firstProduct_ProdPage);
    });

    test('Validate All Products Addded to the Cart Page',async ({page})=>
    {
        const allProduts = await productPage.getAllProductsDetails();
        await productPage.addAllProductToCart();
        await productPage.ClickOnCartLink();
        const allCartProducts = await cartPage.getCartProducts();
        expect(allProduts).toEqual(allCartProducts);
    });

    test('Validate Specific products Added tp the Cart page', async ({page})=>
    {
        await productPage.AddSpecificProductsToCart(productsToCart);
        await productPage.ClickOnCartLink();
        const cartProductsNames = await cartPage.getCartProductNames();
        expect(productsToCart).toEqual(cartProductsNames);
    });

    test('Validate Remove Button Functionality', async ({page})=>
    {

        await productPage.addAllProductToCart();
        await productPage.ClickOnCartLink();
        const initialLength = (await cartPage.getCartProducts()).length;
        await cartPage.removeFirstProduct();
        const currentLength = (await cartPage.getCartProducts()).length;
        expect(currentLength).toBeLessThan(initialLength);

        /*
        //Add and Remove all Products from Cart
        await productPage.addAllProductToCart();
        await productPage.ClickOnCartLink();
        const produtsCount = cartPage.getCartProducts.length;
        console.log("Produts in Cart Count",produtsCount);
        await cartPage.RemoveAllProdutsInCart();
        expect(produtsCount).toEqual(0);
        //Add and Remove Single Product 
        
        await productPage.addFirstProductToCard();
        await productPage.ClickOnCartLink();
        await page.locator(CartPageLocators.cartProductRemove_Btn).first().click();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toHaveLength(0);*/
    });


});