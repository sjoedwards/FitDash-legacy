const Koa = require("koa");

const app = new Koa();

require("dotenv").config({ path: "../.env" });
const authzMiddleware = require("./middleware/authz");
const setTokenFromCookie = require("./middleware/setTokenFromCookie");
const errorMiddleware = require("./middleware/error");
const { weightRouter } = require("./routes/weight");
const { runRouter } = require("./routes/runs");
const { macrosRouter } = require("./routes/macros");
const { caloriesRouter } = require("./routes/calories");

app
  .use(errorMiddleware)
  /* eslint-disable-next-line no-unused-vars */
  .on("error", (err, ctx) => {
    /* eslint-disable-next-line no-console */
    console.log(err);
  })
  .use(setTokenFromCookie)
  .use(authzMiddleware)
  .use(weightRouter.routes())
  .use(weightRouter.allowedMethods())
  .use(runRouter.routes())
  .use(runRouter.allowedMethods())
  .use(macrosRouter.routes())
  .use(macrosRouter.allowedMethods())
  .use(caloriesRouter.routes())
  .use(caloriesRouter.allowedMethods());

module.exports = app;
