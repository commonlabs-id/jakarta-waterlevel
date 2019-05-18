let throng = require("throng");
let Queue = require("bull");

let workProcessor = require("./work.js");
let scraperProcessor = require("./scraper.js");
let notifierProcessor = require("./notifier.js");

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  let work = new Queue("work", REDIS_URL);
  let scraper = new Queue("scraper", REDIS_URL);
  let notifier = new Queue("notifier", REDIS_URL);
  work.process("*", maxJobsPerWorker, workProcessor);
  scraper.process("*", 1, scraperProcessor);
  notifier.process("*", maxJobsPerWorker, notifierProcessor);
}

throng({ workers, start });
