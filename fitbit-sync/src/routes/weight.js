const axios = require("axios");
const moment = require("moment");
const Router = require("@koa/router");
const ObjectsToCsv = require("objects-to-csv");
const cache = require("../cache");

const weightRouter = new Router();

const getWeight = async (ctx, weeksAgo) => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`,
  };
  const weekEnd = moment()
    .subtract(weeksAgo, "weeks")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");
  const weightLog = (
    await axios({
      url: `https://api.fitbit.com/1/user/-/body/log/weight/date/${weekEnd}/1w.json`,
      method: "get",
      headers,
    })
  ).data.weight;
  const weight =
    weightLog.length &&
    (
      weightLog.reduce(
        (sum, { weight: weightAgg }) => sum + parseFloat(weightAgg),
        0
      ) / weightLog.length
    ).toFixed(1);
  return { weekEnd, weight };
};

weightRouter.get("/weight", async (ctx) => {
  const cachedWeight = cache.get("weight");
  let weight;
  if (cachedWeight) {
    /* eslint-disable-next-line no-console */
    console.log("Retrieving weight from cache");
    weight = cachedWeight;
  } else {
    /* eslint-disable-next-line no-console */
    console.log("Getting weight from fitbit");
    weight = (
      await Promise.all(
        Array(6)
          .fill(undefined)
          .map(async (_, index) => {
            const weeksAgo = index + 1;
            return getWeight(ctx, weeksAgo);
          })
      )
    )
      .filter(({ weight: weightFromFitbit }) => weightFromFitbit !== 0)
      .sort((a, b) => {
        if (a.weekEnd === b.weekEnd) {
          return 0;
        }
        return a.weekEnd > b.weekEnd ? 1 : -1;
      });
    cache.set("weight", weight);
  }
  const csv = new ObjectsToCsv(weight);
  await csv.toDisk(`./results/weight/${moment().format("YYYY-MM-DD")}.csv`);
  ctx.body = await csv.toString();
});

module.exports = { weightRouter };
