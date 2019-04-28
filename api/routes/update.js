const { send } = require("micro");
const { format } = require("date-fns");

const { db } = require("../firebase/firestore");
const { getLevelsData } = require("../levels");

async function handler(req, res) {
  try {
    const date = format(new Date(), "DD-MM-YYYY");
    const levels = await getLevelsData();
    const body = {
      date,
      ...levels
    };
    const docRef = db.collection("levels").doc(date);
    await docRef.set(body);
    send(res, 200, {
      date,
      status: "updated",
      hours: levels.hours
    });
  } catch (e) {
    send(res, 500, {
      status: "error",
      message: e.message
    });
    console.error(e.message);
  }
}
module.exports = handler;
