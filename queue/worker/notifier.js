const workProcessor = async job => {
  console.log("Notice", job.data);
  return { value: "ok", date: job.data.date };
};

module.exports = workProcessor;
