const { send } = require("micro");
const { readLevelsOnDate } = require("jw-database");

const { getDateString } = require("../utils/time");

async function handler(req, res) {
  try {
    const now = getDateString(new Date());
    const data = await readLevelsOnDate(now);
    send(res, 200, data);
  } catch (e) {
    console.error(e);
    send(res, 500, e.message);
  }
}
module.exports = handler;
