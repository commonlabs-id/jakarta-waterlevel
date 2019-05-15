const { send } = require("micro");
const Queue = require("bull");

const { getDateString } = require("../utils/time");
const IS_DEV = require("../utils/is-dev");

const REDIS_URL = IS_DEV
  ? "redis://127.0.0.1:6379"
  : process.env.JW_F_REDIS_URL;

let workQueue;

async function handler(_, res) {
  const date = getDateString(new Date());
  try {
    if (!workQueue) {
      console.log(`connecting to ${REDIS_URL}`);
      workQueue = new Queue("scraper", REDIS_URL);
    }
    const job = await workQueue.add({ date });
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
