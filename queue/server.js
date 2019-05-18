let express = require("express");
let Arena = require("bull-arena");
const { scraperQ, notifierQ, REDIS_URL } = require("./worker/queues");

let PORT = process.env.PORT || "5000";

let app = express();

let arena = Arena(
  {
    queues: [
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

app.get("/job/:queue/:id", async (req, res) => {
  let queue = req.params.queue;
  let q = (queue === queue) === "notifier" ? notifierQ : scraperQ;
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

scraperQ.on("global:completed", (jobId, result) => {
  console.log(`[scraper] Job ${jobId} completed with result ${result}`);
});

notifierQ.on("global:completed", (jobId, result) => {
  console.log(`[notifier] Job ${jobId} completed with result ${result}`);
});

app.listen(PORT, () => console.log("Server started!"));
