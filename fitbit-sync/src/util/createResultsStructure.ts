import fs from "fs";

const createResultsStructure = (): void =>
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

export { createResultsStructure };
