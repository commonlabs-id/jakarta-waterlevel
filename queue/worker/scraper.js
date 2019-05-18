const { subDays } = require("date-fns");

const { updateLevelsOnDate, readLevelsOnDate } = require("jw-database");
const { scraperQ, notifierQ } = require("./queues.js");
const { getLevelsData } = require("../util/levels.js");
const { getDateString } = require("../util/time.js");

const compareLevels = async (oldLevel, newLevel) => {
  let levelDiff;
  let siagaDiff;
  let weatherDiff;

  const weatherArray = ["T", "MT", "M", "G", "H"];
  const oldWeatherIndex = weatherArray.indexOf(oldLevel.weather);
  const newWeatherIndex = weatherArray.indexOf(newLevel.weather);

  if (oldLevel.depth > newLevel.depth) {
    levelDiff = "down";
  } else if (oldLevel.depth === newLevel.depth) {
    levelDiff = "none";
  } else {
    levelDiff = "up";
  }

  if (oldLevel.status.siaga > newLevel.status.siaga) {
    siagaDiff = "up";
  } else if (oldLevel.status.siaga === newLevel.status.siaga) {
    siagaDiff = "none";
  } else {
    siagaDiff = "down";
  }
  if (oldWeatherIndex > newWeatherIndex) {
    weatherDiff = "down";
  } else if (oldWeatherIndex === newWeatherIndex) {
    weatherDiff = "none";
  } else {
    weatherDiff = "up";
  }

  return {
    levelDiff,
    siagaDiff,
    weatherDiff
  };
};

const scraper = async job => {
  console.log("working on job id", job.id);
  const { date, days = 0 } = job.data;
  const dateString = getDateString(date);
  const [y, m, d] = dateString.split("-");
  const dmy = `${d}-${m}-${y}`;

  try {
    let yesterdayData;

    const { points } = await getLevelsData(dmy);
    await job.progress(25);

    const doc = {
      date: dateString,
      points
    };

    const shouldCompareToYesterday = points[0].hours.length === 1;
    if (shouldCompareToYesterday) {
      yesterdayData = await readLevelsOnDate(getDateString(date, 1));
    }
    await job.progress(50);

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const currentTime = point.current.time;
      const currentTimeIndex = point.hours.indexOf(currentTime);
      const oldLevel = shouldCompareToYesterday
        ? yesterdayData.points[i].current
        : point.levels[point.hours[currentTimeIndex - 1]];
      const newLevel = point.levels[currentTime];
      const { levelDiff, siagaDiff, weatherDiff } = compareLevels(
        oldLevel,
        newLevel
      );

      if (siagaDiff === "up") {
        notifierQ.add("notify", {
          name: point.name,
          date: dateString,
          old: oldLevel,
          new: newLevel,
          levelDiff,
          siagaDiff,
          weatherDiff
        });
      }
    }

    await updateLevelsOnDate(dateString, doc);
    console.log("updated levels on date", dateString);
    job.progress(100);

    if (days > 0) {
      await scraperQ.add(
        "scrape",
        { date: subDays(new Date(date), 1), days: days - 1 },
        {
          attempts: 10,
          backoff: 500
        }
      );
    }

    return { status: "updated", date, dateString };
  } catch (e) {
    console.error(date, e);
    throw e;
  }
};

module.exports = scraper;
