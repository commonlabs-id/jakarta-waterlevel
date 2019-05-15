const puppeteer = require("puppeteer");

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const blockThese = ["image", "stylesheet", "font", "script"];
const selectorTable = "table#listdatatable";
let _page = null;

async function getOptions(isDev) {
  let options = {};
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true
    };
  } else {
    options = {
      args: ["--no-sandbox"]
    };
  }
  return options;
}

async function getPage(isDev) {
  if (_page) {
    console.log("reusing page");
    return _page;
  }
  console.log("creating new page");
  const options = await getOptions(isDev);
  console.log("got options");
  const browser = await puppeteer.launch(options);
  console.log("browser launched");
  _page = await browser.newPage();
  await _page.setRequestInterception(true);
  _page.on("request", request => {
    if (blockThese.indexOf(request.resourceType()) !== -1) request.abort();
    else request.continue();
  });
  return _page;
}

async function getTables(url, isDev) {
  const page = await getPage(isDev);
  console.log("page ready");
  console.log("going to ", url);
  await page.goto(url, {
    timeout: 3000000
  });

  await page.waitForSelector(selectorTable);
  console.log("selector ready, evaluating");
  const [limits, levels] = await page.evaluate(s => {
    const tables = Array.from(document.querySelectorAll(s));
    return tables.map(table => {
      return table.innerText;
    });
  }, selectorTable);

  console.log("evaluated");

  return [limits, levels];
}

module.exports = { getTables, extractLevels: getTables };
