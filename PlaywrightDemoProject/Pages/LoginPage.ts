import { Page } from "@playwright/test";
import { LoginLocators } from "../Locators/LoginLocators";

export class LoginPage
{
    constructor(private page : Page)
    {

    }

    async LoginMethod(username:string, passwrod:string)
    {
        await this.page.fill(LoginLocators.userNameInput,username);
        await this.page.fill(LoginLocators.passwordInput,passwrod);
        await this.page.click(LoginLocators.loginButton);
    }

}