function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const workProcessor = async job => {
  let progress = 0;

  console.log("Notice", job.data);

  while (progress < 100) {
    await sleep(50);
    progress += 1;
    job.progress(progress);
  }

  return {value: 'ok', date};
};

module.exports = workProcessor;
