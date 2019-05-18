module.exports = {
  linters: {
    "**/*.+(js|ts)": ["eslint --fix", "prettier --write", "git add"]
  }
};
