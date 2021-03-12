require("dotenv").config({ path: "../.env" });
const app = require("./app");
const createResultsStructure = require("./util/createResultsStructure");

const start = () => {
  createResultsStructure();
};

app.listen(3000, () => {
  /* eslint-disable-next-line no-console */
  console.log("Listening on port 3000");
});

start();
