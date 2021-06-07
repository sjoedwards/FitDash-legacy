import { calorieMock } from "../api-data/calories/mock-default-calorie-data";
import request from "supertest";
import { app } from "../../app";

let realDateNow: () => number;
beforeEach(() => {
  realDateNow = Date.now.bind(global.Date);
  // stub date to 2021-05-29, 12:00:00
  global.Date.now = jest.fn().mockReturnValue(1622588225000);
});

afterEach(() => {
  global.Date.now = realDateNow;
});

const calMock = calorieMock();
// This sets the mock adapter on the default instance
beforeEach(() => {
  calMock.mockDefault();
});

describe("Calories: cache", () => {
  it("should return cached data if request made a second time for the same user", async () => {
    const getWeeklyResponse = async () =>
      await request(app.callback())
        .get("/calories/weekly")
        .set("Cookie", "accessToken=123")
        .send();
    const response1 = await (await getWeeklyResponse()).body;
    const response2 = await (await getWeeklyResponse()).body;
    expect(response1).toEqual(response2);

    // Calls both activities calories and normal calories endpoints, hence two calls
    expect(calMock.get().history.get).toHaveLength(2);
  });
});
