const { send } = require("micro");
const { format } = require("date-fns");

const { db } = require("../firebase/firestore");

async function handler(req, res) {
  try {
    const now = new Date();
    const date = format(now, "dd-MM-yyyy", { timeZone: "Asia/Jakarta" });
    const docRef = db.collection("levels").doc(date);
    const doc = await docRef.get();
    const data = doc.data();
    send(res, 200, data);
  } catch (e) {
    send(res, 500, {
      status: "error",
      message: e.message
    });
    console.error(e.message);
  }
}
module.exports = handler;
