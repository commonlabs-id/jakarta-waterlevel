const { createReadStream } = require("fs");
const { join } = require("path");

const csv = require("fast-csv");

// const { db } = require("../api/firebase/firestore");
const { updateLevelsOnDate } = require("../api/firebase/operations");

const file = join(__dirname, "data-tinggi-muka-air-april-2019.csv");
const stream = createReadStream(file);

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

const levels = {};

const createDocFromData = data => {
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
    status: getStatus(status.split(" : ")[1])
  };
  return doc;
};

const mergeDocWithPoints = (doc, points) => {
  let index = points.findIndex(e => e.name === doc.name);
  if (index === -1) {
    points.push({
      name: doc.name,
      location: doc.location,
      hours: [],
      current: {
        depth: null,
        status: {
          label: null,
          siaga: null
        },
        time: null,
        weather: null,
        weatherLabel: null
      },
      levels: {}
    });
    index = points.length - 1;
  }
  if (points[index].hours.find(e => e === doc.time)) {
    return;
  }
  const newHoursLength = points[index].hours.push(doc.time);
  points[index].levels[doc.time] = {
    depth: doc.depth,
    status: doc.status,
    weather: "NA",
    weatherLabel: "Tidak Tersedia"
  };
  points[index].hours.sort();
  const currentHour = points[index].hours[newHoursLength - 1];
  points[index].current = points[index].levels[currentHour];
};

const getStatus = status => {
  const code = status.split(" ")[1];
  switch (code) {
    case "3":
      return {
        siaga: 3,
        label: "Waspada"
      };
    case "2":
      return {
        siaga: 2,
        label: "Kritis"
      };
    case "1":
      return {
        siaga: 1,
        label: "Bencana"
      };
    default:
      return {
        siaga: 4,
        label: "Aman"
      };
  }
};

const pushDocToLevels = doc => {
  if (!levels[doc.date]) {
    levels[doc.date] = {
      date: doc.date,
      points: []
    };
  }
  mergeDocWithPoints(doc, levels[doc.date].points);
};

const csvStream = csv({
  renameHeaders: true,
  headers: HEADERS.APRIL
})
  .on("data", async function(data) {
    // count += 1;
    // console.log(count);
    const doc = createDocFromData(data);
    pushDocToLevels(doc);
    // console.log(doc);
  })
  .on("end", function() {
    console.log("done");
    // console.log(levels);
    // const hours = levels["2019-03-31"].points[0];
    // console.log(hours);
    Object.entries(levels).forEach(async ([date, doc]) => {
      await updateLevelsOnDate(date, doc);
      console.log(`Written ${date}`);
    });
  });

stream.pipe(csvStream);
