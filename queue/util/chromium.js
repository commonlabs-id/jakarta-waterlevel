const puppeteer = require("puppeteer");

const blockThese = ["image", "stylesheet", "font", "script"];
const selectorSecondTable = "div#table2 table#listdatatable";
const selectorForm = "form#waterlevelform";
const selectorFormInput = "#datepicker-example1";
const selectorEnd = "#chartContainer";
let _page = null;

async function getOptions(isDev) {
  let options = {};
  if (isDev) {
    options = {
      args: ["--no-sandbox"],
      headless: false
    };
  } else {
    options = {
      args: ["--no-sandbox"]
    };
  }
  return options;
}

async function getPage(isDev, date = null) {
  if (_page) {
    console.log(date, "reusing page");
    return _page;
  }
  console.log(date, "creating new page");
  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);
  _page = await browser.newPage();
  await _page.setRequestInterception(true);
  _page.on("request", request => {
    if (blockThese.indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });
  return _page;
}

async function getTables(url, isDev, date = null) {
  const page = await getPage(isDev, date);
  console.log(date, "page ready");

  await page.goto(url, {
    timeout: 3000000
  });

  console.log(date, "arrived at", url);
  if (date) {
    await page.$eval(
      selectorFormInput,
      (i, d) => {
        i.value = d; // eslint-disable-line no-param-reassign
      },
      date
    );

    console.log(date, "going to date", date);
    await page.$eval(selectorForm, form => form.submit());
  }

  console.log(date, "waiting for selector", selectorEnd);
  await Promise.all([page.waitForSelector(selectorEnd)]);
  console.log(date, "selector ready, evaluating");

  const levels = await page.$eval(
    selectorSecondTable,
    table => table.innerText
  );

  console.log(date, "scraped levels data");
  return levels;
}

module.exports = { getTables, extractLevels: getTables };
