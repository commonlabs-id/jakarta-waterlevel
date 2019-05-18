const { send } = require("micro");
const Queue = require("bull");

const IS_DEV = require("../utils/is-dev");

const REDIS_URL = IS_DEV ? "redis://127.0.0.1:6379" : process.env.JW_REDIS_URL;

async function handler(_, res) {
  const date = new Date().toISOString();
  try {
    const scraperQ = new Queue("scraper", REDIS_URL);
    const job = await scraperQ.add("scrape", { date });
    await scraperQ.close();
    const body = {
      date,
      id: job.id
    };
    return send(res, 200, body);
  } catch (e) {
    console.error(e);
    return send(res, 500, {
      status: "error",
      message: e.message
    });
  }
}

module.exports = handler;
