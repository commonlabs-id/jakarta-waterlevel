const Twit = require("twit");
const decode = require("unescape");

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
      status: { label, siaga }
    },
    siagaDiff,
    levelDiff
  } = notice;

  const weatherLabels = {
    T: "clear ☀️",
    MT: "slightly cloudy 🌤",
    M: "cloudy 🌥",
    G: "lightly raining 🌧",
    H: "raining ⛈⛈"
  };
  let hook = "";
  let tag = "";
  let siagaLabel = "";
  let risingOrDownTo = "";

  if (siagaDiff === "up") {
    tag = "Alert";
    hook = `🚨 [${tag}]`;
    siagaLabel = ` Siaga ${siaga} (${label})`;
  } else if (siaga < 4 && levelDiff === "up") {
    tag = "Warning";
    hook = `⚠️ [${tag}]`;
  } else {
    tag = "Notice";
    hook = `ℹ️ [${tag}]`;
  }

  if (levelDiff === "up") {
    risingOrDownTo = "rising 📈 to";
  } else if (levelDiff === "none") {
    risingOrDownTo = "staying ⚖️ at";
  } else {
    risingOrDownTo = "lowering 📉 to";
  }

  return [
    tag.toLowerCase(),
    `${hook} ${name}${siagaLabel}: Water level is ${risingOrDownTo} ${depth}cm (prev. ${
      old.depth
    }cm @ ${old.time}) - Weather on site: ${weatherLabels[weather] ||
      "unknown 🤔"}.`
  ];
};

const workProcessor = async job => {
  const [tag, tweetString] = createTweetFromNotice(job.data);
  const tweet = decode(tweetString, "all");
  if (tag !== "notice") {
    await T.post("statuses/update", {
      status: tweet,
      lat: location[job.data.name].lat,
      long: location[job.data.name].long
    });
  }
  return { value: "ok", tweet };
};

module.exports = workProcessor;
