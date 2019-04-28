const { extractLevels } = require("./chromium");

const URL = "https://bpbd.jakarta.go.id/waterlevel/";

async function getLevelsData() {
  const [limits, levels] = await extractLevels(URL);
  return processData(limits, levels);
}

function processData(limitsRaw, levelsRaw) {
  const [_, __, ...limitsData] = limitsRaw.split("\n");
  const [___, hourstext, ...levelsData] = levelsRaw.split("\n");
  const hours = hourstext.split("\t");

  const points = limitsData.map((datatext, index) => {
    const [name, s3, s2, s1] = datatext.split("\t");
    const levelData = levelsData[index];
    const levelsText = levelData.split("\t");

    const levels = {};
    let current = {};

    const limits = processLimits({ s3, s2, s1 });

    levelsText.forEach((level, hoursIndex) => {
      const [heightS, weather] = level.split(" ");
      const hour = hours[hoursIndex];
      const height = Number(heightS);
      const hourData = {
        height,
        weather,
        weatherLabel: getWeatherLabel(weather),
        status: getStatus(height, limits)
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
      current,
      levels,
      limits
    };
  });

  return {
    hours,
    points
  };
}

function getWeatherLabel(weather) {
  const valid = ["T", "MT", "M", "G", "H"];
  const labels = ["Terang", "Mendung Tipis", "Mendung", "Gerimis", "Hujan"];
  return valid.indexOf(weather) > -1 ? labels[valid.indexOf(weather)] : "";
}

function processLimit(limitString) {
  const [minS, maxS] = limitString.split(" ~ ");
  if (!maxS) {
    return {
      min: Number(minS.split(" ")[1])
    };
  } else {
    return {
      min: Number(minS),
      max: Number(maxS)
    };
  }
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
  } else if (height < s2.min) {
    return {
      siaga: 3,
      label: "Waspada"
    };
  } else if (height < s1.min) {
    return {
      siaga: 2,
      label: "Kritis"
    };
  } else {
    return {
      siaga: 1,
      label: "Bencana"
    };
  }
}

module.exports = { getLevelsData };
