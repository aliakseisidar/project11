const puppeteer = require('puppeteer');
describe('H1 Text', async () => {
  let browser
  let page
  beforeAll(async () => {
     browser = await puppeteer.launch({
      headless: false,
      //slowMo: 100,
    });
     page = await browser.newPage();
    page.emulate({
      viewport: {
        width: 1024,
        height: 2400,
      },
      userAgent: '',
    });
  })

  test('h1 loads correctly', async () => {
    await page.goto('https://lloyds-chorus-dt3.pegacloud.net/prweb/');
    await page.waitForSelector('#credentialsForm');
    await page.type('#txtUserID', 'dev2');
    await page.type('#txtPassword', 'defari00');
    await page.click('#sub');
    await page.waitForSelector('#error');
    const errorText = await page.$eval('#error', e => e.innerText);
    expect(errorText).toEqual('The information you entered was not recognized.');
      }, 60000);

  test('h1 loads correctly2', async () => {
    await page.type('#txtUserID', 'as_BKFittingUG2RWS@lloyds.com');
    await page.type('#txtPassword', 'Dcom2020!');
    await page.click('#sub');
    await page.waitForSelector('#error');
    const errorText = await page.$eval('#error', e => e.innerText);
    expect(errorText).toEqual('The information you entered was not recognized.');
  }, 60000);

});
