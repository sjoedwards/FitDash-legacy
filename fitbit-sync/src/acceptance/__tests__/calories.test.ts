import { FitbitActivityData, FitbitData } from "./../../../types/index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import request from "supertest";
import { app } from "../../app";

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const mockCalories = {
  "foods-log-caloriesIn": [
    { dateTime: "2021-04-19", value: "1591" },
    { dateTime: "2021-04-20", value: "3307" },
    { dateTime: "2021-04-21", value: "3366" },
    { dateTime: "2021-04-22", value: "3018" },
    { dateTime: "2021-04-23", value: "3573" },
    { dateTime: "2021-04-24", value: "4304" },
    { dateTime: "2021-04-25", value: "2631" },
  ],
};
// {
//   "foods-log-caloriesIn": [
//     { dateTime: "2021-05-17", value: "1327" },
//     { dateTime: "2021-05-18", value: "1441" },
//     { dateTime: "2021-05-19", value: "1441" },
//     { dateTime: "2021-05-20", value: "2214" },
//     { dateTime: "2021-05-21", value: "2746" },
//     { dateTime: "2021-05-22", value: "3718" },
//     { dateTime: "2021-05-23", value: "2420" },
//   ],
// },
// {
//   "foods-log-caloriesIn": [
//     { dateTime: "2021-04-26", value: "1372" },
//     { dateTime: "2021-04-27", value: "1443" },
//     { dateTime: "2021-04-28", value: "1746" },
//     { dateTime: "2021-04-29", value: "1927" },
//     { dateTime: "2021-04-30", value: "3540" },
//     { dateTime: "2021-05-01", value: "5082" },
//     { dateTime: "2021-05-02", value: "3085" },
//   ],
// },
// {
//   "foods-log-caloriesIn": [
//     { dateTime: "2021-04-12", value: "1572" },
//     { dateTime: "2021-04-13", value: "1411" },
//     { dateTime: "2021-04-14", value: "1621" },
//     { dateTime: "2021-04-15", value: "2740" },
//     { dateTime: "2021-04-16", value: "4580" },
//     { dateTime: "2021-04-17", value: "3222" },
//     { dateTime: "2021-04-18", value: "2207" },
//   ],
// },
// start: 2021-05-03, end: 2021-05-09
// {
//   "foods-log-caloriesIn": [
//     { dateTime: "2021-05-03", value: "3121" },
//     { dateTime: "2021-05-04", value: "1535" },
//     { dateTime: "2021-05-05", value: "1506" },
//     { dateTime: "2021-05-06", value: "2684" },
//     { dateTime: "2021-05-07", value: "4088" },
//     { dateTime: "2021-05-08", value: "4790" },
//     { dateTime: "2021-05-09", value: "4872" },
//   ],
// },
// {
//   "foods-log-caloriesIn": [
//     { dateTime: "2021-05-10", value: "3638" },
//     { dateTime: "2021-05-11", value: "1352" },
//     { dateTime: "2021-05-12", value: "1981" },
//     { dateTime: "2021-05-13", value: "1526" },
//     { dateTime: "2021-05-14", value: "3791" },
//     { dateTime: "2021-05-15", value: "4019" },
//     { dateTime: "2021-05-16", value: "1758" },
//   ],
// }

const mockActivities = {
  "activities-calories": [
    { dateTime: "2021-05-03", value: "2650" },
    { dateTime: "2021-05-04", value: "3645" },
    { dateTime: "2021-05-05", value: "2613" },
    { dateTime: "2021-05-06", value: "2836" },
    { dateTime: "2021-05-07", value: "2711" },
    { dateTime: "2021-05-08", value: "3363" },
    { dateTime: "2021-05-09", value: "5193" },
  ],
};
// 2021-05-10/2021-05-16
// {
//   'activities-calories': [
//     { dateTime: '2021-05-10', value: '2705' },
//     { dateTime: '2021-05-11', value: '2793' },
//     { dateTime: '2021-05-12', value: '3674' },
//     { dateTime: '2021-05-13', value: '3492' },
//     { dateTime: '2021-05-14', value: '2837' },
//     { dateTime: '2021-05-15', value: '4669' },
//     { dateTime: '2021-05-16', value: '4316' }
//   ]
// }
// 2021-04-19/2021-04-25
// {
//   'activities-calories': [
//     { dateTime: '2021-04-19', value: '2393' },
//     { dateTime: '2021-04-20', value: '2902' },
//     { dateTime: '2021-04-21', value: '3973' },
//     { dateTime: '2021-04-22', value: '3101' },
//     { dateTime: '2021-04-23', value: '3691' },
//     { dateTime: '2021-04-24', value: '5472' },
//     { dateTime: '2021-04-25', value: '2936' }
//   ]
// }
// 2021-04-26/2021-05-02
// {
//   'activities-calories': [
//     { dateTime: '2021-04-26', value: '3564' },
//     { dateTime: '2021-04-27', value: '3597' },
//     { dateTime: '2021-04-28', value: '3137' },
//     { dateTime: '2021-04-29', value: '3640' },
//     { dateTime: '2021-04-30', value: '2549' },
//     { dateTime: '2021-05-01', value: '4972' },
//     { dateTime: '2021-05-02', value: '3090' }
//   ]
// }
// 2021-04-12/2021-04-18
// {
//   'activities-calories': [
//     { dateTime: '2021-04-12', value: '2439' },
//     { dateTime: '2021-04-13', value: '3454' },
//     { dateTime: '2021-04-14', value: '2700' },
//     { dateTime: '2021-04-15', value: '3005' },
//     { dateTime: '2021-04-16', value: '3040' },
//     { dateTime: '2021-04-17', value: '4012' },
//     { dateTime: '2021-04-18', value: '5191' }
//   ]
// }
// 2021-05-17/2021-05-23
// {
//   'activities-calories': [
//     { dateTime: '2021-05-17', value: '2928' },
//     { dateTime: '2021-05-18', value: '3684' },
//     { dateTime: '2021-05-19', value: '4181' },
//     { dateTime: '2021-05-20', value: '2577' },
//     { dateTime: '2021-05-21', value: '2775' },
//     { dateTime: '2021-05-22', value: '4270' },
//     { dateTime: '2021-05-23', value: '5169' }
//   ]
// }

const fitbitApiCalories = new RegExp(
  "https://api.fitbit.com/1/user/-/foods/log/caloriesIn/"
);
const fitbitApiActivities = new RegExp(
  "https://api.fitbit.com/1/user/-/activities/"
);

mock.onGet(fitbitApiCalories).reply(200, mockCalories);
mock.onGet(fitbitApiActivities).reply(200, mockActivities);

describe("Calories Route", () => {
  it("should return the correct calorie information", async () => {
    const response = await request(app.callback())
      .get("/calories")
      .set("Cookie", "accessToken=123")
      .send()
      .expect(200);
  });
});

// TODO finish test to assert for body
// TODO create multiweek data dependant on request
