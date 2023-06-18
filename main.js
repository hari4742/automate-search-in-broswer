const puppeteer = require("puppeteer");
require("dotenv").config();
const devices = puppeteer.KnownDevices;
const iPhonex = devices["iPhone XR"];

const NUM_SEARCHES = process.env.NUM_SEARCHES;
const EXE_PATH = process.env.EXE_PATH;

const WATI_TIME = 3000;

const credentials = [
  { email: "edge-rewards-hari4742-2001-1@outlook.com", password: "hari-1234" },
  { email: "edge-rewards-hari4742-2001-2@outlook.com", password: "hari-1234" },
];

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

const searchWeb = async (page) => {
  for (let i = 0; i < NUM_SEARCHES; i++) {
    //   const page1 = await browser.newPage();
    await page.goto(`https://www.bing.com/search?q=${makeid(5)}`);
  }
};

const searchMobile = async (page) => {
  // For mobile
  await page.emulate(iPhonex);
  for (let i = 0; i < NUM_SEARCHES; i++) {
    //   const page1 = await browser.newPage();
    await page.goto(`https://www.bing.com/search?q=${makeid(5)}`);
  }
};

const singOut = async (page) => {
  await wait(page, WATI_TIME);
  await page.click("#id_l");
  await wait(page, WATI_TIME);
  await page.click(".b_toggle.b_imi");
  await page.waitForNavigation();
};

const wait = async (page, time) => {
  await page.waitForTimeout(time);
};

const login = async (page, email, password) => {
  await wait(page, WATI_TIME);
  await page.click("#id_l");
  await page.waitForNavigation();
  await page.type("[type='email']", email);
  await page.click('[type="submit"]');
  await wait(page, WATI_TIME);
  await page.type("[type='password']", password);
  await page.click('[type="submit"]');
  await wait(page, WATI_TIME);

  await page.evaluate(() => {
    let el = document.querySelector("div.row.text-title");
    const innText = el ? el.innerText : "";
    if (innText === "Stay signed in?") {
      document.querySelector("[type='checkbox']").click();
      document.querySelector("[type='submit']").click();
    }
  });
  // if (staySignIn === "Stay signed in?") {
  //   await page.click('[type="submit"]');
  // }
};

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    executablePath: EXE_PATH,
    headless: false,
  });

  // Create a page
  // const page = await browser.newPage();

  // Go to your site
  // await page.goto(`https://www.bing.com/`);

  // await wait(page, 5000);

  // await singOut(page);

  for (let i = 0; i < credentials.length; i++) {
    let page = await browser.newPage();
    await page.goto(`https://www.bing.com/`);
    await singOut(page);
    await login(page, credentials[i].email, credentials[i].password);
    await wait(page, WATI_TIME);
    await searchWeb(page);
    await searchMobile(page);
    await page.close();
  }

  // await login(page, credentials[0].email, credentials[0].password);
  // await wait(page, WATI_TIME);
  // await singOut(page);
  // await login(page, credentials[1].email, credentials[1].password);

  // Close browser.
  // await browser.close();
})();
