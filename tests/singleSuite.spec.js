const { test, expect } = require("@playwright/test");
const sections = require("../pages/pageIndex");
const data = require("../data/orangeHRMData.json");
require("dotenv").config();
let context, page;

test.beforeAll(
  "TC_001, TC_002, TC_003 - Verify Forgot your password interface & Login the Application with valid credentials",
  async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new sections.Login(page, test);
    await loginPage.launchMainUrl();
    await expect(
      loginPage.labelForgotPassword,
      "Checking whether 'Forgot your password' label is visible"
    ).toBeVisible();
    await loginPage.clickForgotPassword();
    await expect(
      page,
      "Checking whether it navigated to Reset Password page"
    ).toHaveURL(process.env.RESET_PSWD_URL);
    await loginPage.resetPassword([process.env.BASE_USERNAME]);
    await expect(
      loginPage.titleSentLink,
      "Sent reset password link successfully"
    ).toHaveText(data.reset_password.title);

    await page.goBack();
    await page.goBack();

    await loginPage.loginApplication(
      [process.env.BASE_USERNAME],
      [process.env.PASSWORD]
    );
    await expect(page, "Navigated to Home Page").toHaveURL(
      process.env.DASHBOARD_URL
    );
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  }
);

test.afterAll(async () => {
  const homePage = new sections.HomePage(page, test);
  await homePage.logOut();
  await context.close();
});

test("TC_004 - Create User", async () => {
  const adminPage = new sections.AdminPage(page, test);
  await adminPage.navigateToAddUser();
  await adminPage.setUserRoleAsESS();
  await adminPage.setUserStatus();
  await adminPage.setUserCredentials(
    [data.create_user.name_hint],
    [data.create_user.employee_username],
    [data.create_user.password]
  );
  await adminPage.savingInfo();
  await page.goBack();
});

test("TC_005 - Make user an Admin", async () => {
  const adminPage = new sections.AdminPage(page, test);
  await expect(
    page,
    "Checking whether user landed on Admin interface"
  ).toHaveURL(process.env.ADMIN_PAGE_URL);
  await adminPage.setUsername([data.create_user.employee_username]);
  await adminPage.setUserRoleAsESS();
  await adminPage.enterEmployeeName([data.create_user.name_hint]);
  await adminPage.setUserStatus();
  await adminPage.clickSearchButton();
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  const iconVisible = await adminPage.iconEdit.isVisible();
  if (iconVisible) {
    await adminPage.editUserRoleAsAdmin();
  } else {
    console.log("No Records Found");
  }
  page.goBack();
});

test("TC_006 - Validating Buzz Interface", async () => {
  const buzzPage = new sections.BuzzPage(page, test);
  await buzzPage.navigateToBuzzPortal();
  await expect(
    page,
    "Checking whether it navigated to Buzz interface"
  ).toHaveURL(data.url.buzz);
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await buzzPage.naviagteToUploadPhoto([data.buzz_page.playwright_text]);
  await expect(
    buzzPage.btnShare,
    "Checking whether 'Share' button is disabled or not.."
  ).toBeDisabled();
  const filePath = process.cwd() + "/Files/playwright_image.png";
  await buzzPage.uploadImage.setInputFiles(filePath);
  await expect(
    buzzPage.btnShare,
    "Checking whether 'Share' button is enabled or not.."
  ).toBeEnabled();
  await buzzPage.clickShareButton();
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
});

test("TC_007 - Comments scenario in Buzz Interface", async () => {
  const buzzPage = new sections.BuzzPage(page, test);
  await buzzPage.addComment([data.buzz_page.comment]);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await expect(
    buzzPage.commentText,
    "Checking whether the comment is added or not"
  ).toHaveText(data.buzz_page.comment);
  await buzzPage.likeComment();
  await expect(
    buzzPage.iconLike,
    "Checking whether Like is added "
  ).toBeVisible();
  await buzzPage.editComment([data.buzz_page.edit_comment]);
  await expect(
    buzzPage.commentText,
    "Checking whether the comment is edited or not"
  ).toHaveText(data.buzz_page.edit_comment);
  await buzzPage.deleteComment();
  await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
  await expect(
    buzzPage.commentText,
    "Checking whether comment is deleted "
  ).not.toBeVisible();
  await page.goBack();
});

test("TC_008 - Add Employee Scenario in PIM Interface", async ({ page }) => {
  const pimPage = new sections.PIMPage(page, test);
  await pimPage.navigateToPIMPortal();
  await pimPage.navigateToAddEmployee();
  await expect(
    page,
    "Checking whether it navigated to 'Add Employee' in PIM portal"
  ).toHaveURL(data.url.add_employee);
  const attribute = await pimPage.labelFullName.getAttribute("class");
  //console.log("class ----------------->", attribute);
  const isRequired = attribute.includes("required");
  //console.log("isRequired ------------------>", isRequired);
  await expect(
    isRequired,
    "Checking whether 'Employee Full Name' field is mandatory"
  ).not.toBeFalsy();
  await pimPage.enterEmployeeFullName(
    [data.pim_page.add_employee.first_name],
    [data.pim_page.add_employee.last_name]
  );
  await expect(
    pimPage.checkboxCreateLogin,
    "Checking whether Create Login is in disable mode"
  ).not.toBeChecked();
  await pimPage.enableCreateLoginDetails();
  await expect(
    pimPage.checkboxCreateLogin,
    "Checking whether Create Login is enabled"
  ).toBeChecked();
  const adminPage = new sections.AdminPage(page, test);
  await adminPage.setUsername([data.pim_page.add_employee.userName]);
  await adminPage.setPassword([data.pim_page.add_employee.password]);
  await expect(
    pimPage.radioBtnEnabled,
    "Checking whether Enabled radio button is selected  "
  ).toBeChecked();
  await adminPage.savingInfo();
});
