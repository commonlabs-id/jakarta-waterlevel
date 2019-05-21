const Twit = require("twit");
const decode = require("unescape");

const { readPointWithName, updatePointWithName } = require("jw-database");

const location = require("../util/location");

const T = new Twit({
  consumer_key: process.env.JW_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.JW_TWITTER_CONSUMER_SECRET,
  access_token: process.env.JW_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.JW_TWITTER_ACCESS_TOKEN_SECRET
});

const createTweetFromNotice = notice => {
  const {
    name,
    old,
    new: {
      depth,
      weather,
      weatherLabel,
      status: { label, siaga }
    },
    siagaDiff,
    levelDiff
  } = notice;

  const weatherLabels = {
    T: "☀️",
    MT: "🌤",
    M: "🌥",
    G: "🌧",
    H: "⛈⛈"
  };
  let hook = "";
  let tag = "";
  let siagaLabel = "";
  let risingOrDownTo = "";

  if (siagaDiff === "up") {
    tag = "alert";
    hook = `🚨`.repeat(4 - siaga);
    siagaLabel = ` Siaga ${siaga} -> ${old.status.siaga}`;
  } else if (siaga < 4 && levelDiff === "up") {
    tag = "warning";
    hook = `⚠️`.repeat(4 - siaga);
  } else if (siagaDiff === "down") {
    tag = "down";
    hook = `⏬`;
    siagaLabel = ` Siaga ${old.status.siaga} -> ${siaga}`;
  } else {
    tag = "notice";
    hook = `ℹ️`;
  }

  if (levelDiff === "up") {
    risingOrDownTo = "naik 📈 ke";
  } else if (levelDiff === "none") {
    risingOrDownTo = "tetap ⚖️ di";
  } else {
    risingOrDownTo = "turun 📉 ke";
  }

  const weatherMessage = `Cuaca: ${weatherLabel} ${weatherLabels[weather] ||
    "🤔"}.`;

  const tweetString = `${hook} [${name}]${siagaLabel} #TinggiMukaAir ${risingOrDownTo} ${depth}cm (sblm. ${
    old.depth
  }cm @ ${old.time}) | ${label} | ${weatherMessage} `;

  const status = decode(tweetString, "all");

  return {
    tag,
    status,
    lat: location[name].lat,
    long: location[name].long
  };
};

const sendTweet = async (tweet, inReplyTo) =>
  // process.env.IS_PROD === "true"
  true
    ? T.post("statuses/update", {
        in_reply_to_status_id: inReplyTo,
        ...tweet
      })
    : new Promise(res => {
        // console.log(tweet);
        res({ data: { id_str: "0xdeadbeef" } });
      });

const workProcessor = async job => {
  const { tag, ...tweet } = createTweetFromNotice(job.data);
  if (tag !== "notice") {
    const point = await readPointWithName(job.data.name);
    // console.log("point", point);
    let { currentThread } = point;
    const { data } = await sendTweet(tweet, currentThread);
    // console.log("data", data);
    if (tag === "down" && job.data.new.status.siaga === 4) {
      currentThread = null;
    } else {
      currentThread = data.id_str;
    }
    const newDoc = {
      ...point,
      currentThread,
      name: job.data.name
    };
    // console.log("newDoc", newDoc);
    await updatePointWithName(job.data.name, newDoc);
    // console.log("ref", ref);
  }
  return { value: "ok", tweet };
};

module.exports = workProcessor;
