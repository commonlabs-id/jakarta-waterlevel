const { subDays } = require("date-fns");

const { updateLevelsOnDate, readLevelsOnDate } = require("jw-database");
const { scraperQ, notifierQ } = require("./queues.js");
const { getLevelsData } = require("../util/levels.js");
const { getDateString } = require("../util/time.js");

const compareLevels = (oldLevel, newLevel) => {
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
  const { date, days = 0, shouldNotify = false } = job.data;
  const dateString = getDateString(date);
  const [y, m, d] = dateString.split("-");
  const dmy = `${d}-${m}-${y}`;

  try {
    let existingData = await readLevelsOnDate(getDateString(date));
    if (typeof existingData === "undefined") {
      existingData = await readLevelsOnDate(getDateString(date, 1));
    }

    const { points } = await getLevelsData(dmy);
    if (
      points.every(point => {
        return point.current.depth === 0;
      })
    ) {
      throw new Error("Data not ready");
    }
    await job.progress(25);

    const doc = {
      date: dateString,
      points
    };

    await job.progress(50);
    console.log("should notify", shouldNotify);
    if (shouldNotify) {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const oldPoint = existingData.points.find(p => p.name === point.name);
        if (oldPoint) {
          const oldLevel = oldPoint.current;
          const newLevel = point.current;
          if (
            existingData.date !== dateString ||
            newLevel.time !== oldLevel.time
          ) {
            const { levelDiff, siagaDiff, weatherDiff } = compareLevels(
              oldLevel,
              newLevel
            );
            const diff = {
              name: point.name,
              date: dateString,
              old: oldLevel,
              new: newLevel,
              levelDiff,
              siagaDiff,
              weatherDiff
            };
            notifierQ.add("notify", diff);
          }
        }
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
