let express = require("express");
let Queue = require("bull");
let Arena = require("bull-arena");

let PORT = process.env.PORT || "5000";
let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let arenaConfig = Arena(
  {
    queues: [
      {
        name: "work",
        hostId: "Waterlevel",
        redis: {
          url: REDIS_URL
        }
      }
    ]
  },
  {
    basePath: "/",
    disableListen: true
  }
);

let app = express();

let workQueue = new Queue("work", REDIS_URL);

app.post("/job", async (req, res) => {
  let job = await workQueue.add();
  res.json({ id: job.id });
});

app.get("/job/:id", async (req, res) => {
  let id = req.params.id;
  let job = await workQueue.getJob(id);

  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason });
  }
});

app.use("/", arenaConfig);

workQueue.on("global:completed", (jobId, result) => {
  console.log(`Job ${jobId} completed with result ${result}`);
});

app.listen(PORT, () => console.log("Server started!"));
