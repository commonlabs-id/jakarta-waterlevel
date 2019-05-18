const puppeteer = require("puppeteer");

const blockThese = ["image", "stylesheet", "font", "script"];
const selectorSecondTable = "div#table2 > table";
const selectorForm = "form#waterlevelform";
const selectorFormInput = "#datepicker-example1";
let _page = null;

async function getOptions(isDev) {
  let options = {};
  if (isDev) {
    options = {
      args: ["--no-sandbox"],
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
  console.log("got options", options);
  const browser = await puppeteer.launch(options);
  console.log("browser launched");
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
  const page = await getPage(isDev);
  console.log(date, "page ready");
  console.log(date, "going to", url);
  await page.goto(url, {
    timeout: 3000000
  });

  if (date) {
    console.log(date, "waiting for form", selectorForm);
    await page.$eval(
      selectorFormInput,
      (i, d) => {
        i.value = d; // eslint-disable-line no-param-reassign
      },
      date
    );
    await page.$eval(selectorForm, form => form.submit());
  }

  console.log(date, "waiting for selectors", selectorSecondTable);
  await Promise.all([page.waitForSelector(selectorSecondTable)]);
  console.log(date, "selector ready, evaluating");

  const levels = await page.evaluate(s => {
    const l = document.querySelector(s);
    return l.innerText;
  }, selectorSecondTable);
  console.log(levels);

  console.log(date, "evaluated");
  return levels;
}

module.exports = { getTables, extractLevels: getTables };
