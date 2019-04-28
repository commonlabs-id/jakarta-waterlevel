const IS_DEV = process.env.NODE_ENV !== "production";

const chrome = require("chrome-aws-lambda");
const pptr = IS_DEV ? require("puppeteer") : require("puppeteer-core");

const selectorTable = "table#listdatatable";

async function extractLevels(url) {
  const browser = await pptr.launch(
    IS_DEV
      ? {}
      : {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless
        }
  );

  const page = await browser.newPage();

  // block these
  const blockThese = ["image", "stylesheet", "font", "script"];

  await page.setRequestInterception(true);
  page.on("request", request => {
    if (blockThese.indexOf(request.resourceType()) !== -1) request.abort();
    else request.continue();
  });

  await page.goto(url, {
    timeout: 3000000
  });

  await page.waitForSelector(selectorTable);

  const [limits, levels] = await page.evaluate(s => {
    const tables = Array.from(document.querySelectorAll(s));
    return tables.map(table => {
      return table.innerText;
    });
  }, selectorTable);

  await browser.close();

  return [limits, levels];
}

module.exports = { extractLevels };
