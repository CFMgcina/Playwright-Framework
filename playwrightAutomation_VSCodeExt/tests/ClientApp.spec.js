const {test} = require('@playwright/test');


test('Client App', async ({page})=>
    {

        //const context = await browser.newContext();
        //const page = await context.newPage();
        const emailTXT = page.locator("#userEmail");//clivedemo@gmail.com passwprd : @Clive1234
        const pass =  page.locator("#userPassword");
        const loginBtn = page.locator("#login");
        const titles = page.locator(".card-body b");

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        await emailTXT.fill("clivedemo@gmail.com");
        await pass.fill("@Clive1234");
        await loginBtn.click();

        await page.waitForLoadState('networkidle');// wait for the network to be idle before proceeding
        await titles.last().waitFor();// wait for the last title to be visible before proceeding
        console.log(await titles.allTextContents());


    });