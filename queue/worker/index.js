let throng = require("throng");
let Queue = require("bull");

let workProcessor = require("./work.js");
let scraperProcessor = require("./scraper.js");

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  let workQueue = new Queue("work", REDIS_URL);
  let scraperQueue = new Queue("scraper", REDIS_URL);
  let notifierQueue = new Queue("notifier", REDIS_URL);
  workQueue.process(maxJobsPerWorker, workProcessor);
  scraperQueue.process(2, scraperProcessor);
  notifierQueue.process(maxJobsPerWorker, workProcessor);
}

throng({ workers, start });
