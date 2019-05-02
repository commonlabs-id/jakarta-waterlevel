const { send } = require("micro");

const { updateLevelsOnDate } = require("../firebase/operations");
const { getLevelsData } = require("../levels");
const { getDateString } = require("../utils/time");

async function handler(_, res) {
  const date = getDateString(new Date());
  try {
    const levels = await getLevelsData();
    const body = {
      date,
      ...levels
    };
    await updateLevelsOnDate(date, body);
    return send(res, 200, {
      status: "updated",
      hours: levels.hours
    });
  } catch (e) {
    console.error(e);
    return send(res, 500, {
      status: "error",
      message: e.message
    });
  }
}

module.exports = handler;
