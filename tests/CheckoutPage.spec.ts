import { test } from "@playwright/test";
import { Page, expect } from "@playwright/test";
import { LoginPage } from "../PlaywrightDemoProject/Pages/LoginPage";
import { ProductPage } from "../PlaywrightDemoProject/Pages/ProductPage";
import { CartPage } from "../PlaywrightDemoProject/Pages/CartPage";
import { CheckoutPage } from "../PlaywrightDemoProject/Pages/CheckoutPage";
import { BASE_URL,USERNAME,PASSWORD } from "../PlaywrightDemoProject/Utils/envConfig";
import {CheckoutData} from "../PlaywrightDemoProject/TestData/checkoutData";

test.describe("Checkout Page Validations",()=>{
    let loginPage : LoginPage
    let productPage : ProductPage
    let cartPage : CartPage
    let checkoutPage : CheckoutPage

    test.beforeEach( async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        
        //Peform login before every test
        await page.goto(BASE_URL);
        await loginPage.LoginMethod(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await productPage.addFirstProductToCard();
        await productPage.ClickOnCartLink();
    });

    test("Validate Checkout Page UI Elements and URL", async({page})=>
    {
       await cartPage.clickChekoutBtn();
       await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
       const UIElements = await checkoutPage.getCheckoutElements();
       expect(UIElements.pageInfo).toContainText("Checkout: Your Information");
       expect(UIElements.continue_Btn).toBeVisible();
       expect(UIElements.cancel_Btn).toBeVisible();
    });

    test("Validate Cancel button Funtionality", async ({page})=>
    {
        await cartPage.clickChekoutBtn(); 
        await checkoutPage.clickOnCancelButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    });

    test("Validate Continue Functionality", async ({page})=>
    {
        await cartPage.clickChekoutBtn();
        await checkoutPage.enterCheckoutInfo(CheckoutData.firstName, CheckoutData.lastName,CheckoutData.zipCode);
        await checkoutPage.clickOnContinueButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");

    });
    test("Validate Checkout Page Error Message",async({page})=>
    {
        await cartPage.clickChekoutBtn();
        await checkoutPage.clickOnContinueButton();
        const error =  await checkoutPage.getErrorMessage();
        expect(error?.trim()).toBe("Error: First Name is required");
    });
});