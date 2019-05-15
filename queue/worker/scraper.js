const { getLevelsData } = require("../util/levels.js");
const { updateLevelsOnDate } = require("../firebase/operations");

const workProcessor = async job => {
  const { date } = job.data;
  const levels = await getLevelsData();
  job.progress(100);
  await updateLevelsOnDate(date, {
    date,
    ...levels
  });
  return { status: "ok", date };
};

module.exports = workProcessor;
