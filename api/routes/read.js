const { send } = require("micro");
const { format } = require("date-fns");

const { db } = require("../firebase/firestore");

async function handler(req, res) {
  try {
    const date = format(new Date(), "DD-MM-YYYY");
    const docRef = db.collection("levels").doc(date);
    const doc = await docRef.get();
    const data = doc.data();
    send(res, 200, data);
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
