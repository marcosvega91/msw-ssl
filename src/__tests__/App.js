const { chromium } = require('playwright');
let browser;
let page;
beforeAll(async () => {
  browser = await chromium.launch();
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => {
  await page.close();
});
it('should work', async () => {
  await page.goto('https://localhost:3000');
  await page.waitForSelector("#myName")
  const textContent = await page.$eval("#myName", el => el.textContent)
  expect(textContent).toBe("Marco")
});