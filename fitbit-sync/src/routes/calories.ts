import {
  APIFitbitCaloriesData,
  FitbitData,
  FitbitCaloriesData,
} from "../../types";

import { Context } from "koa";
import axios from "axios";
import moment from "moment";
import Router from "@koa/router";
import ObjectsToCsv from "objects-to-csv";
import { cache } from "../cache";

const caloriesRouter = new Router();

const getCalories = async (ctx: Context): Promise<APIFitbitCaloriesData> => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`,
  };
  const calories: Array<FitbitData> = (
    await axios({
      url: `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/today/3m.json`,
      method: "get",
      headers,
    })
  ).data["foods-log-caloriesIn"].filter(
    ({ value }: FitbitData) => parseInt(value) !== 0
  );

  const activityCalories = (
    await axios({
      url: `https://api.fitbit.com/1/user/-/activities/calories/date/today/3m.json`,
      method: "get",
      headers,
    })
  ).data["activities-calories"].filter(
    ({ value }: FitbitData) => parseInt(value) !== 0
  );

  return { calories, activityCalories };
};

const getWeeklyCalories = async (
  ctx: Context,
  apiCalories: APIFitbitCaloriesData
): Promise<Array<FitbitCaloriesData>> => {
  // Loop over apiCalories dateTimes and split into array of weeks using moment
  // Populate array with apiCalories data split into weeks
  // Loop over array and average using functions below
  // const averageWeeklyCalories = (
  //   calories.reduce(
  //     (sum: number, { value }) => sum + parseInt(`${value}`, 10),
  //     0
  //     // TODO just want to average over the last week
  //   ) / arrayItemLength
  // ).toFixed(0);
  // const averageWeeklyActivityCalories = (
  //   ctx.state.activityCalories.reduce(
  //     (sum: number, { value }: FitbitData) => sum + parseInt(`${value}`, 10),
  //     0
  //     // TODO just want to average over the last week
  //   ) / arrayItemLength
  // ).toFixed(0);
  // Sort
  // .sort((a, b) => {
  //   if (a.weekEnd === b.weekEnd) {
  //     return 0;
  //   }
  //   return a.weekEnd > b.weekEnd ? 1 : -1;
  // });
  // return [{ weekEnd, calories, activityCalories }];
  return [{ weekEnd: "", calories: "", activityCalories: "" }];
};

caloriesRouter.get("/calories", async (ctx: Context) => {
  let calories: APIFitbitCaloriesData;
  const cachedCalories: APIFitbitCaloriesData = cache.get("calories");
  if (cachedCalories) {
    /* eslint-disable-next-line no-console */
    console.log("Retrieving calories from cache");
    calories = cachedCalories;
  } else {
    /* eslint-disable-next-line no-console */
    console.log("Getting calories from fitbit");
    calories = await getCalories(ctx);
    cache.set("calories", calories);
  }

  // Old weekly logic
  const weeklyCalories = await Promise.all(
    Array(6)
      .fill(undefined)
      .map(async (_, index) => {
        const weeksAgo = index + 1;
        return getWeeklyCalories(ctx, calories);
      })
  );

  const csv = new ObjectsToCsv(weeklyCalories);
  await csv.toDisk(`./results/calories/${moment().format("YYYY-MM-DD")}.csv`);
  ctx.body = weeklyCalories;
});

export { caloriesRouter };
