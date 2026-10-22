const {test, expect} = require('@playwright/test');

test('Popip Vcalidations', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    /*await page.goto("http://google.com");
    await page.goBack();
    await page.goForward();*/

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.getByText("Reload").click();
    //await page.locator("div.mouse-hover-content").nth(1).click();

    const framePage = page.frameLocator("#courses-iframe");
    await page.locator("li a[href='lifetime-access']:visible").click();
    
    const textCheck  = await framePage.locator(".text h2").textContent();
    const subNumber = textCheck.split(" ")[1];
    console.log(subNumber);
});