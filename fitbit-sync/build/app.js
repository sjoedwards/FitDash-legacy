var Koa = require("koa");
var app = new Koa();
require("dotenv").config({ path: "../.env" });
var authzMiddleware = require("./middleware/authz");
var setTokenFromCookie = require("./middleware/setTokenFromCookie");
var errorMiddleware = require("./middleware/error");
var weightRouter = require("./routes/weight").weightRouter;
var runRouter = require("./routes/runs").runRouter;
var macrosRouter = require("./routes/macros").macrosRouter;
var caloriesRouter = require("./routes/calories").caloriesRouter;
app
    .use(errorMiddleware)
    /* eslint-disable-next-line no-unused-vars */
    .on("error", function (err, ctx) {
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
