const { getLevelsData } = require("../util/levels.js");
const { updateLevelsOnDate } = require("jw-database");

const scraper = async job => {
  const { date } = job.data;
  try {
    const levels = await getLevelsData();
    job.progress(50);
    await updateLevelsOnDate(date, {
      date,
      ...levels
    });
    job.progress(100);
    return { status: "updated", date };
  } catch (e) {
    console.error(date, e);
  }
};

module.exports = scraper;
