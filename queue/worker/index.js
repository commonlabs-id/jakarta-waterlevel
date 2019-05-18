let throng = require("throng");

let { scraperQ, notifierQ } = require("./queues.js");
let scraperProcessor = require("./scraper.js");
let notifierProcessor = require("./notifier.js");

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  scraperQ.process("*", 1, scraperProcessor);
  notifierQ.process("*", maxJobsPerWorker, notifierProcessor);
}

throng({ workers, start });
