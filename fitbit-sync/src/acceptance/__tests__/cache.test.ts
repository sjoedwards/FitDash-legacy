import { calorieMock } from "../api-data/calories/mock-default-calorie-data";
import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { cache } from "../../cache";

const createMockJWT = (subject: string): string =>
  jwt.sign({ sub: subject }, "signingKey");

const getWeeklyResponse = async (subject = "subject1") =>
  await request(app.callback())
    .get("/calories/weekly")
    .set("Cookie", `accessToken=${createMockJWT(subject)}`)
    .send();

let cacheSpy: jest.SpyInstance;
let realDateNow: () => number;
beforeEach(() => {
  realDateNow = Date.now.bind(global.Date);
  // stub date to 2021-05-29, 12:00:00
  global.Date.now = jest.fn().mockReturnValue(1622588225000);
  cacheSpy = jest.spyOn(cache, "set");
});

afterEach(() => {
  global.Date.now = realDateNow;
  cacheSpy.mockClear();
});

const calMock = calorieMock();
// This sets the mock adapter on the default instance
beforeEach(() => {
  calMock.mockDefault();
});

afterEach(() => {
  calMock.get().reset();
});

describe("Calories: cache", () => {
  it("should return cached data if request made a second time for the same user", async () => {
    const response1 = await (await getWeeklyResponse()).body;
    const response2 = await (await getWeeklyResponse()).body;
    expect(response1).toEqual(response2);

    // Calls both activities calories and normal calories endpoints, hence two calls
    expect(calMock.get().history.get).toHaveLength(2);
    expect(cacheSpy.mock.calls[0][2]).toEqual("subject1");
    expect(cacheSpy).toHaveBeenCalledTimes(1);
  });

  it("should return cached data if request made a second time for the same user", async () => {
    await getWeeklyResponse();
    expect(calMock.get().history.get).toHaveLength(2);
    expect(cacheSpy.mock.calls[0][2]).toEqual("subject1");
    await getWeeklyResponse("subject2");

    // Calls both activities calories and normal calories endpoints, hence two calls
    expect(calMock.get().history.get).toHaveLength(4);
    expect(cacheSpy.mock.calls[0][2]).toEqual("subject2");
  });

  it("should throw an error if the subject is not present in the accessToken", async () => {
    expect((await getWeeklyResponse()).status).toBe(500);
  });
});
