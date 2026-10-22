const {test, expect} = require('@playwright/test');
const { only } = require('node:test');

test('Browser Context Playwright test', async ({browser})=>
{
   // chrome - plugin/cookies
   
   const context = await browser.newContext();
   const page = await context.newPage();

   const userName = page.locator('#username');
   const passWord = page.locator('#password');
   const signIn = page.locator('#signInBtn');
   const cardTitle = page.locator("[class='card-title']");
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   console.log(await page.title());

   await userName.fill("clive");
   await passWord.fill('learning');
   await signIn.click();

   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   await userName.fill("rahulshettyacademy");
   await passWord.fill('Learning@830$3mK2');
   await signIn.click();

  
   console.log(await cardTitle.first().textContent());
   console.log(await cardTitle.nth(1).textContent());
   const allTitles = await cardTitle.allTextContents();
   console.log(allTitles);

});

test('UI Basics', async ({page})=>
{

   const userName = page.locator('#username');
   const passWord = page.locator('#password');
   const signIn = page.locator('#signInBtn');
   
   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   //Dropdown selection
   const dropDown = page.locator("select.form-control");
   await dropDown.selectOption("Consultant");

   //Select radio button
   const radioBtn = page.locator("span.checkmark");
   await radioBtn.last().click();
   await page.locator("#okayBtn").click();
   //Check if the radio is successfully checked
   await expect(radioBtn.last()).toBeChecked();
   const Checked = await radioBtn.last().isChecked();
   console.log(Checked);
   
   //Checkbox
   const checkBox = page.locator("#terms");
   await checkBox.click(); // check the checkbox
   await expect(checkBox).toBeChecked(); // check if is checked
   await checkBox.uncheck(); // unchecks the checkbox
   await expect(checkBox).not.toBeChecked(); //check is unchecked
   expect( await checkBox.isChecked()).toBeFalsy();
   
   const documentLink = page.locator("[href*='documents-request']");
   await expect(documentLink).toHaveAttribute("class","blinkingText");
   
});

test('Child window handling', async({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   const documentLink = page.locator("[href*='documents-request']");
   const username = page.locator("#username");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

   
   const [newPage] =await Promise.all([
         context.waitForEvent('page'),
         documentLink.click(),
      ]); 

   const text = await newPage.locator("p.red").textContent();
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);

   await username.fill(domain); // fill in the email in the original page
   console.log("New Value : ",await username.inputValue());
   
}


);
test('Add Product To Cart', async ({browser})=>
{
   const getProduct = "ZARA COAT 3";
   const contrySelect = " South Africa"
   const email = "clivedemo@gmail.com";
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client/");

   const userName = page.locator('#userEmail');
   const passWord = page.locator('#userPassword');
   const signIn = page.locator("#login");
   
   const productList = page.locator("div.card-body");
   
   //login
   await userName.fill(email);
   await passWord.fill('@Clive1234');
   await signIn.click();
   //Waiting for elements to load
   await page.waitForLoadState("networkidle");
   // Zoom out to 80%
   await page.evaluate(() => {
    document.body.style.zoom = '0.6';
   });

   await page.locator(".card-body b").first().waitFor();
   const tittles = await page.locator(".card-body b").allTextContents();
   console.log(tittles);

   const count=await productList.count();
   for(let i=0;i<count;++i)
   {
      
      if(await productList.nth(i).locator("b").textContent()===getProduct)
         {
            //add to cart
            await productList.nth(i).locator("text= Add To Cart").click(); //button[class='btn w-40 rounded']
            break;
         };
      
   }
   await page.locator("button[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*=Country]").pressSequentially(contrySelect);
   //page.locator("[placeholder*=Country]").pressSequentially(contrySelect,{delay: 150});

   //Selecting a country from search box
   const countries = page.locator("ta-item list-group-item ng-star-inserted");
   const countCountries = countries.count();
   for(let i=0;i<countCountries;++i)
   {
      if(countries.nth(i).locator("i").textContent()==="South Africa")
      {
         countries.nth(i).click();
         break;
      }  
   }
   //Element returning two, and first() choose the first element
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   
   //await page.getByLabel("Place Order ").click();
   await page.getByRole('button',{name: 'Place Order'}).click();
   //await expect(submitBtn).toBeEnabled();
   /*
   if(await submitBtn.isEnabled)
   {
      await submitBtn.click();
      console.log("Button enable")
   }else{
      console.log("Button NOT enable")
   }
   */
   
   //const submitBtn =  page.locator(".action__submit").waitFor({state:'visible'});
   //await submitBtn.waitFor({state:'visible'});
   //await submitBtn.click;
   //await page.locator(".action__submit").filter({isVisible: false}).click();

   const pageTitle = await page.locator(".hero-primary").textContent();
   
   await expect(pageTitle).toHaveText(" Thankyou for the order. ");
   const oderID = page.locator(".em-spacer-1 [class='ng-star-inserted']").textContent();
   console.log(oderID);
   

});