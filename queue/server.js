let express = require("express");
let Queue = require("bull");
let Arena = require("bull-arena");

let PORT = process.env.PORT || "5000";
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let app = express();

let workQ = new Queue("work", REDIS_URL);
let scraperQ = new Queue("scraper", REDIS_URL);
let notifierQ = new Queue("notifier", REDIS_URL);

let arena = Arena(
  {
    queues: [
      {
        name: "work",
        hostId: "waterlevel",
        type: "bull",
        url: REDIS_URL
      },
      {
        name: "scraper",
        hostId: "waterlevel",
        type: "bull",
        url: REDIS_URL
      },
      {
        name: "notifier",
        hostId: "waterlevel",
        type: "bull",
        url: REDIS_URL
      }
    ]
  },
  {
    disableListen: true
  }
);

app.post("/job", async (req, res) => {
  let job = await workQueue.add("work");
  res.json({ id: job.id });
});

app.get("/job/:queue/:id", async (req, res) => {
  let queue = req.params.queue;
  let q =
    queue === "scraper" ? scraperQ : queue === "notifier" ? notifierQ : workQ;
  let id = req.params.id;
  let job = await q.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason, queue });
  }
});

app.use("/", arena);

workQ.on("global:completed", (jobId, result) => {
  console.log(`[work] Job ${jobId} completed with result ${result}`);
});

scraperQ.on("global:completed", (jobId, result) => {
  console.log(`[scraper] Job ${jobId} completed with result ${result}`);
});

notifierQ.on("global:completed", (jobId, result) => {
  console.log(`[notifier] Job ${jobId} completed with result ${result}`);
});

app.listen(PORT, () => console.log("Server started!"));
