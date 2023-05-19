const puppeteer = require("puppeteer");
require("dotenv").config();
const devices = puppeteer.devices;
const iPhonex = devices["iPhone XR"];

const NUM_SEARCHES = process.env.NUM_SEARCHES;
const EXE_PATH = process.env.EXE_PATH;

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    executablePath: EXE_PATH,
    headless: false,
  });

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto(`https://www.bing.com/search?q=${makeid(5)}`);

  await page.waitForTimeout(7000);

  for (let i = 0; i < NUM_SEARCHES; i++) {
    //   const page1 = await browser.newPage();
    await page.goto(`https://www.bing.com/search?q=${makeid(5)}`);
  }

  // For mobile
  await page.emulate(iPhonex);
  for (let i = 0; i < NUM_SEARCHES; i++) {
    //   const page1 = await browser.newPage();
    await page.goto(`https://www.bing.com/search?q=${makeid(5)}`);
  }
  // Close browser.

  //   await browser.close();
})();
