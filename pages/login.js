const { executeStep } = require("../utilities/actions");
require("dotenv").config();

exports.Login = class Login {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.labelForgotPassword = page.locator(
      "//div[contains(@class,'forgot')]/p"
    );
    this.btnResetPassword = page.locator("//button[@type='submit']");
    this.inputUsername = page.locator("//input[@name='username']");
    this.titleSentLink = page.locator("//h6");
    this.inputPassword = page.locator("//input[@name='password']");
    this.btnLogin = page.locator("//button");
  }

  async launchMainUrl() {
    await executeStep(
      this.test,
      this.page,
      "navigate",
      "Navigating to OrangeHRM main page",
      [process.env.BASE_URL]
    );
  }

  async clickForgotPassword() {
    await executeStep(
      this.test,
      this.labelForgotPassword,
      "click",
      "Clicking Forgot Your Password"
    );
  }
  async resetPassword(username) {
    await executeStep(
      this.test,
      this.inputUsername,
      "fill",
      "Entering username in Reset password portal",
      username
    );
    await executeStep(
      this.test,
      this.btnResetPassword,
      "click",
      "Submitted username to reset password"
    );
  }

  async loginApplication(username, password) {
    await executeStep(
      this.test,
      this.inputUsername,
      "fill",
      "Entered valid username",
      username
    );
    await executeStep(
      this.test,
      this.inputPassword,
      "fill",
      "Entered correct password",
      password
    );
    await executeStep(
      this.test,
      this.btnLogin,
      "click",
      "Clicking login button"
    );
  }
};
