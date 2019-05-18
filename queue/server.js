const express = require("express");
const Arena = require("bull-arena");
const { scraperQ, notifierQ, REDIS_URL } = require("./worker/queues");

const PORT = process.env.PORT || "5000";

const app = express();

const arena = Arena(
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
  const { queue } = req.params;
  const q = queue === "notifier" ? notifierQ : scraperQ;
  const { id } = req.params;
  const job = await q.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    const state = await job.getState();
    const progress = job._progress;
    const reason = job.failedReason;
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
