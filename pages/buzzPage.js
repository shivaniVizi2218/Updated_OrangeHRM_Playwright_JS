const { executeStep } = require("../utilities/actions");

exports.BuzzPage = class BuzzPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.labelBuzz = page.locator("//span[text()='Buzz']");
    this.textarea = page.locator(
      "(//textarea[contains(@class,'post-input')])[2]"
    );
    this.btnSharePhotos = page.locator(
      "//button[normalize-space()='Share Photos']"
    );
    this.labelAddPhotos = page.locator("//p[text()='Add Photos']");
    this.uploadImage = page.locator("//input[@type='file']");
    this.btnShare = page.locator("//button[normalize-space()='Share']");
    this.imgBuzzPhoto = page.locator(
      "(//div[contains(@class,'buzz-photos')])[1]"
    );
    this.inputComment = page.locator(
      "//input[contains(@placeholder,'comment')]"
    );
    this.commentText = page.locator("//span[contains(@class,'comment-text')]");
    this.optionLike = page.locator("//p[text()='Like']");
    this.iconLike = page.locator("//div[contains(@class,'comment-stats')]/i");
    this.optionEdit = page.locator("//p[text()='Edit']");
    this.inputEditComment = page.locator(
      "//div[contains(@class,'post-comment')]//following::input"
    );
    this.optionDelete = page.locator("//p[text()='Delete']");
    this.btnConfirmDelete = page.locator(
      "//i[contains(@class,'trash')]/parent::button"
    );
  }

  async navigateToBuzzPortal() {
    await executeStep(
      this.test,
      this.labelBuzz,
      "click",
      "Clicking on 'Buzz' label"
    );
  }

  async naviagteToUploadPhoto(text) {
    await executeStep(
      this.test,
      this.btnSharePhotos,
      "click",
      "Clicking on 'Share Photos' button"
    );
    await this.fillTextarea(text);
    await executeStep(
      this.test,
      this.labelAddPhotos,
      "click",
      "Clicking on 'Add Photos'"
    );
  }

  async fillTextarea(text) {
    await executeStep(
      this.test,
      this.textarea,
      "fill",
      "Entering text before adding image",
      text
    );
  }

  async clickShareButton() {
    await executeStep(
      this.test,
      this.btnShare,
      "click",
      "Clicking Share button"
    );
  }

  async addComment(comment) {
    await executeStep(
      this.test,
      this.imgBuzzPhoto,
      "click",
      "Navigating to add comment"
    );
    await executeStep(
      this.test,
      this.inputComment,
      "fill",
      "Entering comment in input-box",
      comment
    );
  }

  async likeComment() {
    await executeStep(
      this.test,
      this.optionLike,
      "click",
      "Adding like to the comment."
    );
  }

  async editComment(edit) {
    await executeStep(
      this.test,
      this.optionEdit,
      "click",
      "Clicking Edit to edit the comment."
    );
    await this.inputEditComment.clear();
    await executeStep(
      this.test,
      this.inputEditComment,
      "fill",
      "Editing the comment",
      edit
    );
    await this.page.keyboard.press("Enter");
  }

  async deleteComment() {
    await executeStep(this.test, this.optionDelete, "click", "Clicking Delete");
    await executeStep(
      this.test,
      this.btnConfirmDelete,
      "click",
      "Confirming to delete the comment"
    );
  }
};
