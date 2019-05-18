const { extractLevels } = require("./chromium");

const URL = "https://bpbd.jakarta.go.id/waterlevel/";
const isDev = !process.env.IS_PROD;

function getWeatherLabel(weather) {
  const valid = ["T", "MT", "M", "G", "H", "NA"];
  const labels = [
    "Terang",
    "Mendung Tipis",
    "Mendung",
    "Gerimis",
    "Hujan",
    "Tidak Tersedia"
  ];
  return valid.indexOf(weather) > -1 ? labels[valid.indexOf(weather)] : "";
}

function processLimit(limitString) {
  const [minS, maxS] = limitString.split(" ~ ");
  if (!maxS) {
    return {
      min: Number(minS.split(" ")[1])
    };
  }
  return {
    min: Number(minS),
    max: Number(maxS)
  };
}

function processLimits({ s3, s2, s1 }) {
  return {
    s3: processLimit(s3),
    s2: processLimit(s2),
    s1: processLimit(s1)
  };
}

function getStatus(height, { s3, s2, s1 }) {
  if (height < s3.min) {
    return {
      siaga: 4,
      label: "Aman"
    };
  }
  if (height < s2.min) {
    return {
      siaga: 3,
      label: "Waspada"
    };
  }
  if (height < s1.min) {
    return {
      siaga: 2,
      label: "Kritis"
    };
  }
  return {
    siaga: 1,
    label: "Bencana"
  };
}

function processData(levelsRaw) {
  const limitsData = [
    "Bendung Katulampa\t81 ~ 150\t151 ~ 200\t≥ 201",
    "Pos Depok\t201 ~ 270\t271 ~ 350\t≥ 351",
    "PA Manggarai\t751 ~ 850\t851 ~ 950\t≥ 951",
    "PA Karet\t451 ~ 550\t551 ~ 600\t≥ 601",
    "Pos Krukut Hulu\t151 ~ 250\t251 ~ 300\t≥ 301",
    "Pos Pesanggrahan\t151 ~ 250\t251 ~ 350\t≥ 351",
    "Pos Angke Hulu\t151 ~ 250\t251 ~ 300\t≥ 301",
    "Waduk Pluit\t-51 ~ 0\t1 ~ 45\t≥ 46",
    "Pasar Ikan\t171 ~ 200\t201 ~ 250\t≥ 251",
    "Pos Cipinang Hulu\t151 ~ 200\t201 ~ 250\t≥ 251",
    "Pos Sunter Hulu\t151 ~ 200\t201 ~ 250\t≥ 251",
    "PA Pulo Gadung\t551 ~ 700\t701 ~ 770\t≥ 771"
  ];

  const [, hourstext, ...levelsData] = levelsRaw.split("\n");
  const hours = hourstext.split("\t");
  console.log(levelsData);
  const points = limitsData.map((datatext, index) => {
    const [name, s3, s2, s1] = datatext.split("\t");
    const levelData = levelsData[index];
    const levelsText = levelData.split("\t");

    const levels = {};
    let current = {};

    const limits = processLimits({ s3, s2, s1 });

    levelsText.forEach((level, hoursIndex) => {
      const [heightS, weather = "NA"] = level.split(" ");
      const hour = hours[hoursIndex];
      const depth = Number(heightS);
      const hourData = {
        depth,
        weather,
        weatherLabel: getWeatherLabel(weather),
        status: getStatus(depth, limits)
      };
      levels[hour] = hourData;
      if (hoursIndex === levelsText.length - 1) {
        current = {
          ...hourData,
          time: hour
        };
      }
    });

    return {
      name,
      hours,
      current,
      levels,
      limits
    };
  });

  return {
    points
  };
}

async function getLevelsData(date = null) {
  const levels = await extractLevels(URL, isDev, date);
  return processData(levels);
}

module.exports = { getLevelsData };
