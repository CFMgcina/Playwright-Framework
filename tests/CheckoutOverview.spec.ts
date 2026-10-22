import {test, expect} from "@playwright/test"
import { CheckoutOverviewPage } from "../PlaywrightDemoProject/Pages/CheckoutOverviewPage"
import { LoginPage } from "../PlaywrightDemoProject/Pages/LoginPage";
import { ProductPage } from "../PlaywrightDemoProject/Pages/ProductPage";
import { CartPage } from "../PlaywrightDemoProject/Pages/CartPage";
import { CheckoutPage } from "../PlaywrightDemoProject/Pages/CheckoutPage";
import { BASE_URL,USERNAME,PASSWORD} from "../PlaywrightDemoProject/Utils/envConfig";
import { CheckoutData } from "../PlaywrightDemoProject/TestData/checkoutData";
import { productsToCart } from "../PlaywrightDemoProject/TestData/Products";

test.describe("Chechout Overview Page Validation", async()=>{
    let loginPage : LoginPage
    let productPage : ProductPage
    let cartPage : CartPage
    let checkoutPage : CheckoutPage
    let checkoutOverviewPage : CheckoutOverviewPage

    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);

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
    });

    test("Validate Checkout Overview UI Elements and URL", async ({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        const elements = await checkoutOverviewPage.getUIElements();
        await expect(elements.overviewInfo).toHaveText("Checkout: Overview");
        await expect(elements.cancel_Btn).toBeVisible();
        await expect(elements.finish_Btn).toBeVisible();
        
    });
    test("Validate Cancel Button Functionality", async ({page})=>
    {
        await checkoutOverviewPage.clickCancelButton();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Validate Product On Checkout Overview", async ({page})=>
    {
        const overviewProduts = await checkoutOverviewPage.getCheckoutOverviewProductDetails();
        const calculatedTotal = overviewProduts.reduce((sum,{price}) => sum + parseFloat(price.replace("$","")),0);
        const UIitemTotal = await checkoutOverviewPage.getItemTotal();
        expect(calculatedTotal).toBe(UIitemTotal);
        
    });

    test("Validate Final Total (ItemTotal + Tax)",async ({page})=>
    {
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        const tax = await checkoutOverviewPage.getTax();
        const finalTotal  = await checkoutOverviewPage.getTotal();

        const expectedFinalTotal = itemTotal + tax;
        expect(finalTotal).toBe(expectedFinalTotal);
    });




});