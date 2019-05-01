const { send } = require("micro");
const { format } = require("date-fns");

const { readLevelsOnDate } = require("../firebase/firestore");

async function handler(req, res) {
  try {
    const now = new Date();
    const date = format(now, "dd-MM-yyyy", { timeZone: "Asia/Jakarta" });
    const data = await readLevelsOnDate(date);
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
