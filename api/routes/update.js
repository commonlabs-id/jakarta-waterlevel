const { send } = require("micro");
const { format } = require("date-fns");

const { updateLevelsOnDate } = require("../firebase/firestore");
const { getLevelsData } = require("../levels");

async function handler(_, res) {
  try {
    const now = new Date();
    const date = format(now, "dd-MM-yyyy", { timeZone: "Asia/Jakarta" });
    const levels = await getLevelsData();
    const body = {
      date,
      ...levels
    };
    await updateLevelsOnDate(date, body);
    return send(res, 200, {
      date,
      now,
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
