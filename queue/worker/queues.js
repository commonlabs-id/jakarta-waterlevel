let Queue = require("bull");

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let scraperQ = new Queue("scraper", REDIS_URL);
let notifierQ = new Queue("notifier", REDIS_URL);

module.exports = {
  scraperQ,
  notifierQ,
  REDIS_URL
};
