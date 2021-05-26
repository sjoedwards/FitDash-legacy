import { app } from "./app";
import { createResultsStructure } from "./util/createResultsStructure";

const start = () => {
  createResultsStructure();
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Listening on port ${port}`);
});

start();
