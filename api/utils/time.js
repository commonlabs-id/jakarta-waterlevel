const { format } = require("date-fns");

const getDateString = date =>
  format(date, "yyyy-MM-dd", { timeZone: "Asia/Jakarta" });

module.exports = {
  getDateString
};
