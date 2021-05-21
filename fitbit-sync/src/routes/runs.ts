const axios = require("axios");
const moment = require("moment");
const Router = require("@koa/router");
const ObjectsToCsv = require("objects-to-csv");

const runRouter = new Router();

const getActivities = async (ctx: Context) => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`,
  };
  return axios({
    url: `https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${moment()
      .add(1, "days")
      .format("YYYY-MM-DD")}&offset=0&limit=20&sort=desc`,
    method: "get",
    headers,
  });
};

runRouter.get("/runs", async (ctx: Context) => {
  const activities = await getActivities(ctx: Context);
  if (activities && activities.data && activities.data.activities) {
    const formattedActivities = activities.data.activities
      .filter((activity) => activity.activityName === "Run")
      .map(({ distance, pace, originalStartTime, activeDuration }) => {
        return {
          date: moment(originalStartTime).format("YYYY-MM-DD"),
          distance: distance && distance.toFixed(2),
          duration: moment
            .utc(
              moment.duration(activeDuration, "milliseconds").asMilliseconds()
            )
            .format("HH:mm:ss"),
          pace: moment
            .utc(moment.duration(pace, "seconds").asMilliseconds())
            .format("HH:mm:ss"),
        };
      })
      .sort((a, b) => {
        if (a.date === b.date) {
          return 0;
        }
        return a.date > b.date ? 1 : -1;
      });
    const csv = new ObjectsToCsv(formattedActivities);
    await csv.toDisk(`./results/runs/${moment().format("YYYY-MM-DD")}.csv`);
    ctx.body = await csv.toString();
  }
});

module.exports = { runRouter };
