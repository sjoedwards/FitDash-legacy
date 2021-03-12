const axios = require("axios");
const moment = require("moment");
const Router = require("@koa/router");
const ObjectsToCsv = require("objects-to-csv");
const cache = require("../cache");

const caloriesRouter = new Router();

const getCalories = async (ctx, weeksAgo) => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`,
  };
  const weekStart = moment()
    .subtract(weeksAgo, "weeks")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");
  const weekEnd = moment()
    .subtract(weeksAgo, "weeks")
    .endOf("isoWeek")
    .format("YYYY-MM-DD");
  const caloriesLog = (
    await axios({
      url: `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/${weekStart}/${weekEnd}.json`,
      method: "get",
      headers,
    })
  ).data["foods-log-caloriesIn"].filter(({ value }) => value !== 0);
  const calories = (
    caloriesLog.reduce((sum, { value }) => sum + parseInt(value, 10), 0) /
    caloriesLog.length
  ).toFixed(0);
  return { weekEnd, calories };
};

caloriesRouter.get("/calories", async (ctx) => {
  const cachedCalories = cache.get("calories");
  let calories;
  if (cachedCalories) {
    /* eslint-disable-next-line no-console */
    console.log("Retrieving calories from cache");
    calories = cachedCalories;
  } else {
    /* eslint-disable-next-line no-console */
    console.log("Getting calories from fitbit");
    calories = (
      await Promise.all(
        Array(6)
          .fill(undefined)
          .map(async (_, index) => {
            const weeksAgo = index + 1;
            return getCalories(ctx, weeksAgo);
          })
      )
    ).sort((a, b) => {
      if (a.weekEnd === b.weekEnd) {
        return 0;
      }
      return a.weekEnd > b.weekEnd ? 1 : -1;
    });
    cache.set("calories", calories);
  }
  const csv = new ObjectsToCsv(calories);
  await csv.toDisk(`./results/calories/${moment().format("YYYY-MM-DD")}.csv`);
  ctx.body = await csv.toString();
});

module.exports = { caloriesRouter };
