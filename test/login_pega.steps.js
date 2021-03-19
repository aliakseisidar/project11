const puppeteer = require('puppeteer');
describe('PEGA core', async () => {
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
        width: 1280,
        height: 800,
      },
      userAgent: '',
    });
  })

  test('Success login', async () => {
    await page.goto('https://lloyds-chorus-dt3.pegacloud.net/prweb/');
    await page.waitForSelector('#credentialsForm');
    await page.type('#txtUserID', 'as_BKFittingUG2RWS@lloyds.com');
    await page.type('#txtPassword', 'Dcom2020!');
    await page.click('#sub');
    await page.waitForSelector('.layout-noheader-portal_header');
    const headerText = await page.$eval('a.Header_nav', e => e.innerText);
    expect(headerText).toEqual('Delegated contract manager');
      }, 60000);

  test('Agreement Template page loads', async () => {
    await page.waitForSelector('div#workarea');
    await page.waitForSelector('iframe');
    const elementHandle = await page.$('iframe');
    const frame1 = await elementHandle.contentFrame();
    await frame1.waitForSelector('div.content-item.content-layout.item-2.flex.flex-row');
    await frame1.waitForSelector('div.lloyds-quickstart-container-contract');
    await frame1.click('div.lloyds-quickstart-container-contract');
      }, 60000);

  test('Agreement Template page loads', async () => {
    await page.waitForSelector('div[title^="CON"] ~ div>iframe')
    const elementHandle = await page.$('div[title^="CON"] ~ div>iframe');
    const frame2 = await elementHandle.contentFrame();
    await frame2.waitForSelector('div[node_name="pyTabbedScreenFlow7Main"]');
    const headerText = await frame2.$eval('div[param_name="EXPANDEDSubSectionAboutContractB"]>div[node_type="HEADER"] h1', e => e.innerText);
    expect(headerText).toEqual('Agreement template');
      }, 60000);

  test('Fill Agreement Template page', async () => {
    const elementHandle = await page.$('div[title^="CON"] ~ div>iframe');
    const frame2 = await elementHandle.contentFrame();
    await frame2.waitForSelector('.content-layout.item-3');
    await frame2.click('.content-layout.item-3 button');
    await frame2.waitForSelector('ul#apresults-list')
    await frame2.waitFor(1000)
    await frame2.click('li[category-header="Binding Authority Agreement"]');
    await frame2.waitFor(1000)
    await frame2.click('ul#apresults-list>li:nth-child(2)');
  }, 60000);
});
