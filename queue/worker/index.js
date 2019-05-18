let throng = require("throng");

let {workQ, scraperQ, notifierQ} = require('./queues.js')
let workProcessor = require("./work.js");
let scraperProcessor = require("./scraper.js");
let notifierProcessor = require("./notifier.js");

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
  workQ.process("*", maxJobsPerWorker, workProcessor);
  scraperQ.process("*", 1, scraperProcessor);
  notifierQ.process("*", maxJobsPerWorker, notifierProcessor);
}

throng({ workers, start });
