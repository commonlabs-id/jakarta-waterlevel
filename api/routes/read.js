const { send } = require("micro");
const { readLevelsOnDate } = require("jw-database");

const { getDateString } = require("../utils/time");

async function handler(req, res) {
  const date = new Date();
  try {
    const dateString = getDateString(date);
    const data = await readLevelsOnDate(dateString);
    if (data) {
      send(res, 200, data);
    } else {
      console.log(dateString, `isn't ready yet, using yesterday data.`);
      const yesterday = getDateString(date, 1);
      const yData = await readLevelsOnDate(yesterday);
      send(res, 200, yData);
    }
  } catch (e) {
    console.error(e);
    send(res, 500, e.message);
  }
}
module.exports = handler;
