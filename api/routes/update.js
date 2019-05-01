const { send } = require("micro");
const { format } = require("date-fns");

const { db } = require("../firebase/firestore");
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
    const docRef = db.collection("levels").doc(date);
    await docRef.set(body);
    return send(res, 200, {
      date,
      now,
      status: "updated",
      hours: levels.hours
    });
  } catch (e) {
    return send(res, 500, {
      status: "error",
      message: e.message
    });
    console.error(e);
  }
}
module.exports = handler;
