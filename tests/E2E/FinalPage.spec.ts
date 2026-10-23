import {test, expect} from "@playwright/test"
import { CheckoutOverviewPage } from "../../PlaywrightDemoProject/Pages/CheckoutOverviewPage"
import { LoginPage } from "../../PlaywrightDemoProject/Pages/LoginPage";
import { ProductPage } from "../../PlaywrightDemoProject/Pages/ProductPage";
import { CartPage } from "../../PlaywrightDemoProject/Pages/CartPage";
import { CheckoutPage } from "../../PlaywrightDemoProject/Pages/CheckoutPage";
import { BASE_URL,USERNAME,PASSWORD} from "../../PlaywrightDemoProject/Utils/envConfig";
import { CheckoutData } from "../../PlaywrightDemoProject/TestData/checkoutData";
import { productsToCart } from "../../PlaywrightDemoProject/TestData/Products";
import { FinalPage } from "../../PlaywrightDemoProject/Pages/FinalPage";

test.describe("Final Page Validation", async()=>{
    let loginPage : LoginPage
    let productPage : ProductPage
    let cartPage : CartPage
    let checkoutPage : CheckoutPage
    let checkoutOverviewPage : CheckoutOverviewPage
    let finalPage : FinalPage

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);

        //perfom login before each test
        await page.goto(BASE_URL);
        await loginPage.LoginMethod(USERNAME,PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        //add products before each test
        await productPage.AddSpecificProductsToCart(productsToCart);
        await productPage.ClickOnCartLink();
        //click on checkout button
        await cartPage.clickChekoutBtn();
        //fill-in checkout information and continue
        await checkoutPage.enterCheckoutInfo(CheckoutData.firstName, CheckoutData.lastName,CheckoutData.zipCode);
        await checkoutPage.clickOnContinueButton();
        //click finish button from overview page
        await checkoutOverviewPage.clickFinishButton();
    });

    test("Validate Final Page UI Elenents and  URL", async ({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        const elements = await finalPage.getFinalPageElements();
        await expect(elements.successMsg).toBeVisible();
        await expect(elements.backHomeButton).toBeVisible();
        await expect(elements.generatePdfButton).toBeVisible();

    });

    test("Validate the Success Message", async({page})=>
    {
        const successMsg = await finalPage.getSuccessMessage();
        expect(successMsg).toBe("Thank you for your order!");
    });

    test("Validate Back Home Button",async({page})=>
    {
        await finalPage.clickOnBackHomeButton();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });



});