const { executeStep } = require("../utilities/actions");
exports.PIMPage = class PIMPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.labelPIM = page.locator("//span[text()='PIM']");
    this.labelAddEmployee = page.locator("//a[text()='Add Employee']");
    this.labelFullName = page.locator("//label[contains(text(),'Full Name')]");
    this.inputFirtName = page.locator("//input[@name='firstName']");
    this.inputLastName = page.locator("//input[@name='lastName']");
    this.checkboxCreateLogin = page.locator(
      "//p[text()='Create Login Details']/parent::div/div/label/input[@type='checkbox']"
    );
    this.inputCheckbox = page.locator(
      "//input[@type='checkbox']/following::span"
    );
    this.radioBtnEnabled = page.locator("//label[text()='Enabled']/span");
    this.headerEmployeeName = page.locator(
      "//div[contains(@class,'employee-name')]//h6"
    );
    this.labelEmployeeList = page.locator("//a[text()='Add Employee']");
  }

  async navigateToPIMPortal() {
    await executeStep(
      this.test,
      this.labelPIM,
      "click",
      "Navigating to PIM portal"
    );
  }

  async navigateToAddEmployee() {
    await executeStep(
      this.test,
      this.labelAddEmployee,
      "click",
      "Clicking on Add Employee"
    );
  }

  async enterEmployeeFullName(firtsName, lastName) {
    await executeStep(
      this.test,
      this.inputFirtName,
      "fill",
      "Entering employee firts name",
      firtsName
    );
    await executeStep(
      this.test,
      this.inputLastName,
      "fill",
      "Entering employee last name",
      lastName
    );
  }

  async enableCreateLoginDetails() {
    await executeStep(
      this.test,
      this.inputCheckbox,
      "click",
      "Enabling checkbox to create Login details"
    );
  }

  async navigateToViewEmployeeList() {
    await executeStep(
      this.test,
      this.labelEmployeeList,
      "click",
      "Clicking on Employee List"
    );
  }
};
