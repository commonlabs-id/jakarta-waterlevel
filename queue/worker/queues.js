const Queue = require("bull");

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const scraperQ = new Queue("scraper", REDIS_URL);
const notifierQ = new Queue("notifier", REDIS_URL);

module.exports = {
  scraperQ,
  notifierQ,
  REDIS_URL
};
