const throng = require("throng");

const { scraperQ, notifierQ } = require("./queues.js");
const scraperProcessor = require("./scraper.js");
const notifierProcessor = require("./notifier.js");

const workers = process.env.WEB_CONCURRENCY || 2;

const maxJobsPerWorker = 50;

function start() {
  scraperQ.process("*", 1, scraperProcessor);
  notifierQ.process("*", maxJobsPerWorker, notifierProcessor);
}

throng({ workers, start });
