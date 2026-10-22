const {test, expect} = require('@playwright/test');


test('Client App', async ({page})=>
    {

        //const context = await browser.newContext();
        //const page = await context.newPage();
        const emailTXT = page.getByPlaceholder("email@example.com");//clivedemo@gmail.com passwprd : @Clive1234
        const pass =  page.getByPlaceholder("enter your passsword");
        const loginBtn = page.getByRole("button",{name:"login"});
        const titles = page.locator(".card-body b");

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

        await emailTXT.fill("clivedemo@gmail.com");
        await pass.fill("@Clive1234");
        await loginBtn.click();

        //await page.waitForLoadState('networkidle');// wait for the network to be idle before proceeding
        await page.waitForLoadState("networkidle");
        await titles.last().waitFor();// wait for the last title to be visible before proceeding    
        console.log(await titles.allTextContents());

        await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
        .getByRole("button",{name: " Add To Cart"}).click();
        //add to cart
        await page.getByRole('listitem').getByRole('button',{name:"  Cart "}).click();
        await page.locator("div li").first().waitFor();

        await expect(page.getByText("ZARA COAT 3")).toBeVisible();
        await page.getByRole('button',{name:"Checkout"}).click();

        await page.getByPlaceholder("Select Country").pressSequentially("So");
        await page.getByRole('button',{name:"South Africa"}).click();

        await page.getByText("Place Order ").click();




    });