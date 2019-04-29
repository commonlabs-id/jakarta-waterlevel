const { createReadStream } = require("fs");
const { join } = require("path");

const csv = require("fast-csv");
const subHours = require("date-fns/subHours");

const { db } = require("../firebase/firestore");

const timeZone = "Asia/Jakarta";

const file = join(
  __dirname,
  "..",
  "..",
  "data",
  "data-tinggi-muka-air-april-2019.csv"
);
var stream = createReadStream(file);

let count = 0;

const HEADERS = {
  JANUARY: [
    "date",
    "time",
    "name",
    "location",
    "lat",
    "long",
    "depth",
    "status"
  ],
  APRIL: ["name", "location", "lat", "long", "datetime", "depth", "status"]
};

const levels = {}

var csvStream = csv({
  renameHeaders: true,
  headers: HEADERS.APRIL
})
  .on("data", async function(data) {
    const {
      date: dateRaw,
      time: timeRaw,
      datetime,
      name,
      location,
      lat,
      long,
      depth,
      status
    } = data;
    const date = datetime ? datetime.split(" ")[0] : dateRaw;
    const time = datetime
      ? datetime.split(" ")[1]
      : timeRaw
          .slice(0, -2)
          .split(":")
          .map(digits => digits.padStart(2, "0"))
          .join(":");
    const timestamp = new Date(`${date}T${time}`);
    const doc = {
      date,
      time,
      timestamp,
      name,
      location,
      coords: [Number(lat), Number(long)],
      depth: Number(depth),
      status: status.split(" : ")[1]
    };

    // console.log({ timestamp, date, time });
    // const docRef = await db.collection("readings").add(doc);
    count += 1;
    // console.log(`written document with ID: ${docRef.id}, total doc: ${count}`);
    console.log(count, doc);
    if (!levels[date]) {
      levels[date] = {
        date,
        hours = [],
        points = [{
          name,
          levels: []
        }]
      }
    }
  })
  .on("end", function() {
    console.log("done");
  });

stream.pipe(csvStream);
