const { subDays } = require("date-fns");

const { updateLevelsOnDate, readLevelsOnDate } = require("jw-database");
const { scraperQ, notifierQ } = require("./queues.js");
const { getLevelsData } = require("../util/levels.js");
const { getDateString } = require("../util/time.js");

const scraper = async job => {
  console.log("working on job id", job.id);
  const { date, days = 0 } = job.data;
  const dateString = getDateString(date);
  console.log("scraping", dateString);

  try {
    let existing;
    existing = await readLevelsOnDate(dateString);
    job.progress(20);

    if (!existing) {
      existing = await readLevelsOnDate(getDateString(date, 1));
    }

    job.progress(25);
    const [y, m, d] = dateString.split("-");
    const levels = await getLevelsData(`${d}-${m}-${y}`);
    job.progress(50);

    const doc = {
      date: dateString,
      ...levels
    };

    if (typeof existing !== "undefined") {
      for (let i = 0; i < doc.points.length; i++) {
        const { name, current } = doc.points[i];
        const existingPoint = existing.points.find(ep => ep.name === name);
        if (typeof existingPoint !== "undefined") {
          if (existingPoint.current.status.siaga !== current.status.siaga) {
            console.log(
              name,
              existing.date,
              existingPoint.current.time,
              existingPoint.current.status.siaga,
              "->",
              current.status.siaga,
              doc.date,
              current.time
            );
            notifierQ.add("notify", {
              name,
              current: {
                ...current,
                date: doc.date
              },
              existingCurrent: {
                ...existingPoint.current,
                date: existing.date
              }
            });
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
