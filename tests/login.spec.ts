import { test,expect } from "@playwright/test";
import { LoginPage } from "../PlaywrightDemoProject/Pages/LoginPage";
import { BASE_URL,USERNAME,PASSWORD } from "../PlaywrightDemoProject/Utils/envConfig";

test('Login to sauceDemo',async({page})=>
{
    const loginObj = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginObj.LoginMethod(USERNAME,PASSWORD);
    expect(page).toHaveURL("https://www.saucedemo.com/inventory.html"); 

});