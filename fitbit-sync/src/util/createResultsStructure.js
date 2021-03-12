const fs = require("fs");

const createResultsStructure = () =>
  [
    "results",
    "results/weight",
    "results/weight-diffs",
    "results/runs",
    "results/macros",
    "results/calories",
  ].forEach((path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  });

module.exports = createResultsStructure;
