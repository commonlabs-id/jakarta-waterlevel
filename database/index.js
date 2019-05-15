const { db } = require("./firestore");
const { readLevelsOnDate, updateLevelsOnDate } = require("./operations");

module.exports = {
  db,
  readLevelsOnDate,
  updateLevelsOnDate
};
