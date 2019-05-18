const { subDays } = require("date-fns");
const { format, utcToZonedTime } = require("date-fns-tz");

const JAKARTA_TZ = "Asia/Jakarta";

const getDateString = (date, sub = 0) =>
  format(
    utcToZonedTime(subDays(new Date(date), sub), JAKARTA_TZ),
    "yyyy-MM-dd",
    {
      timeZone: JAKARTA_TZ
    }
  );

module.exports = {
  getDateString
};
