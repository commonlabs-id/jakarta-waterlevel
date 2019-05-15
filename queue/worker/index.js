let throng = require("throng");
let Queue = require("bull");

let workProcessor = require("./work.js");
let scraperProcessor = require("./scraper.js");

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  let workQueue = new Queue("waterlevel", REDIS_URL);
  workQueue.process("work", maxJobsPerWorker, workProcessor);
  workQueue.process("scraper", 2, scraperProcessor);
  workQueue.process("notifier", maxJobsPerWorker, workProcessor);
}

throng({ workers, start });
