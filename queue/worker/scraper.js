const { getLevelsData } = require("../util/levels.js");

const workProcessor = async job => {
  // let progress = 0;

  const levels = await getLevelsData();
  job.progress(100);
  return { levels };
};

module.exports = workProcessor;
