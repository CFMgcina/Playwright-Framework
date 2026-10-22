const {test, expect} = require('@playwright/test');

test('Special Locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //Get by label
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    //get By Placeholder
    await page.getByPlaceholder("Password").fill("clive1234");

    //Get By Role
    await page.getByRole("Button",{name:"Submit"}).click();

    //Get By Text
    const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    expect(bool).toBeTruthy();

    //5 seconds default timeout for expect assertion  - override timeout - Step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout : 10_000});

    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
})

test('Test level time out', async ({page})=>
{
    //Test timeout
    test.timeout(60000); // override whole test time out
    //Set expect in test level
    const slowExpect = expect.configure({timeout: 9000});
    //override actions timeout in test level
    page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //Get by label
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    //get By Placeholder
    await page.getByPlaceholder("Password").fill("clive1234");

    //Get By Role
    await page.getByRole("Button",{name:"Submit"}).click();

    //Get By Text
    const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    slowExpect(bool).toBeTruthy();

    //5 seconds default timeout for expect assertion  - override timeout - Step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link",{name:"Shop"}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
})

