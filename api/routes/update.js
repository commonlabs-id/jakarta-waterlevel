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
    send(res, 200, body);
  } catch (e) {
    send(
      res,
      500,
      `<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${
        e.message
      }</p>`
    );
    console.error(e.message);
  }
}
module.exports = handler;
