function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const workProcessor = async job => {
  let progress = 0;

  // throw an error 5% of the time
  if (Math.random() < 0.05) {
    throw new Error("This job failed!");
  }

  while (progress < 100) {
    await sleep(50);
    progress += 1;
    job.progress(progress);
  }

  return { value: "This will be stored" };
};

module.exports = workProcessor;
