const { executeStep } = require("../utilities/actions");
const data = require("../data/orangeHRMData.json");
require("dotenv").config();

exports.AdminPage = class AdminPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.labelAdmin = page.locator("//span[text()='Admin']");
    this.btnAdd = page.locator("//button[normalize-space()='Add']");
    this.ddUserRole = page.locator(
      "(//label[contains(text(),'User Role')]//parent::div//following::div[contains(@class,'text-input')])[1]"
    );
    this.optionESS = page.getByRole("option", { name: "ESS" });
    this.optionAdmin = page.getByRole("option", { name: "Admin" });
    this.ddStatus = page.locator(
      "//label[contains(text(),'Status')]//parent::div//following::div[contains(@class,'text-input')]"
    );
    this.optionEnabled = page.getByRole("option", { name: "Enabled" });
    this.inputEmployeeName = page.locator(
      "//input[contains(@placeholder,'Type')]"
    );
    // this.employeeName =
    //   page.getByRole("option", {
    //     name: `${data.create_user.employee_name}`,
    //   });
    this.employeeName = (name) =>
      page.getByRole("option", {
        name: `${name}`,
      });
    this.inputUsername = page.locator(
      "(//label[contains(text(),'Username')]//parent::div//following::div/input)[1]"
    );
    this.inputPassword = page.locator(
      "(//label[contains(text(),'Username')]//parent::div//following::div/input[@type='password'])[1]"
    );
    this.inputConfirmPassword = page.locator(
      "(//label[contains(text(),'Username')]//parent::div//following::div/input[@type='password'])[2]"
    );
    this.btnSave = page.locator("//button[normalize-space()='Save']");
    this.btnSearch = page.locator("//button[normalize-space()='Search']");
    this.iconEdit = page.locator("//button/i[contains(@class,'pencil')]");
  }

  async navigateToAdminPortal() {
    await executeStep(
      this.test,
      this.labelAdmin,
      "click",
      "Navigated to Admin Page"
    );
  }

  async navigateToAddUser() {
    this.navigateToAdminPortal();
    await executeStep(
      this.test,
      this.btnAdd,
      "click",
      "Navigated to Create user page"
    );
  }

  async setUserRole() {
    await executeStep(this.test, this.ddUserRole, "click");
  }

  async setUserRoleAsESS() {
    this.setUserRole();
    await executeStep(
      this.test,
      this.optionESS,
      "click",
      "Selected 'ESS' as user-role"
    );
  }

  async setUserStatus() {
    await executeStep(this.test, this.ddStatus, "click");
    await executeStep(
      this.test,
      this.optionEnabled,
      "click",
      "Set user status as 'Enabled'"
    );
  }

  async enterEmployeeName(employeeHint, name) {
    await executeStep(
      this.test,
      this.inputEmployeeName,
      "fill",
      "Given hint for employee name",
      employeeHint
    );
    await this.page.keyboard.press("Enter");

    await executeStep(
      this.test,
      this.employeeName(name),
      "click",
      "Selected employee name"
    );
  }

  async setUsername(username) {
    await executeStep(
      this.test,
      this.inputUsername,
      "fill",
      "Created username",
      username
    );
  }

  async setPassword(password) {
    await executeStep(
      this.test,
      this.inputPassword,
      "fill",
      "Entered password",
      password
    );
    await executeStep(
      this.test,
      this.inputConfirmPassword,
      "fill",
      "Re-entered password to confirm",
      password
    );
  }

  async setUserCredentials(employeeHint, name, username, password) {
    await this.enterEmployeeName(employeeHint, name);
    await this.setUsername(username);
    await this.setPassword(password);
  }

  async savingInfo() {
    await executeStep(
      this.test,
      this.btnSave,
      "click",
      "Clicking Save button to save user-info"
    );
  }

  async clickSearchButton() {
    await executeStep(
      this.test,
      this.btnSearch,
      "click",
      "Clicking 'Search' button"
    );
  }

  async clickEditIcon() {
    await executeStep(this.test, this.iconEdit, "click", "Clicking Edit icon");
  }

  async editUserRoleAsAdmin() {
    await this.clickEditIcon();
    await this.setUserRole();
    await executeStep(
      this.test,
      this.optionAdmin,
      "click",
      "Changing User-role to 'Admin'"
    );
    await this.savingInfo();
  }
};
