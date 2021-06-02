import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import { app } from "../../app";
import { caloriesApiData } from "../api-data/calories";
import { dailyCaloriesExpectedResponse } from "../expected-responses/calories/daily";
import { weeklyCaloriesExpectedResponse } from "../expected-responses/calories/weekly";

let realDateNow: () => number;
beforeEach(() => {
  realDateNow = Date.now.bind(global.Date);
  // stub date to 2021-05-29, 12:00:00
  global.Date.now = jest.fn().mockReturnValue(1622588225000);
});

afterEach(() => {
  global.Date.now = realDateNow;
});

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
beforeEach(() => {
  const urlCalsInMonthly = new RegExp(
    "https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/today/3m.json"
  );
  const urlActivitiesCalsMonthly = new RegExp(
    "https://api.fitbit.com/1/user/-/activities/calories/date/today/3m.json"
  );
  mock.onGet(urlCalsInMonthly).reply(200, {
    "foods-log-caloriesIn": caloriesApiData["foods-log-caloriesIn"],
  });
  mock.onGet(urlActivitiesCalsMonthly).reply(200, {
    "activities-calories": caloriesApiData["activities-calories"],
  });

  const fitbitApiCalories = new RegExp(
    "https://api.fitbit.com/1/user/-/foods/log/caloriesIn/"
  );
  const fitbitApiActivities = new RegExp(
    "https://api.fitbit.com/1/user/-/activities/"
  );
  mock.onGet(fitbitApiCalories).reply(500);
  mock.onGet(fitbitApiActivities).reply(500);
});

describe("Calories Route", () => {
  it("should return the correct calorie information for a weekly resolution", async () => {
    const weeklyResponse = await request(app.callback())
      .get("/deficit")
      .set("Cookie", "accessToken=123")
      .send()
      .expect(200);
    expect(weeklyResponse.body).toEqual(weeklyCaloriesExpectedResponse);
  });
});
