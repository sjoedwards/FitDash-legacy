import { Context } from "koa";
import NodeCache, { Key } from "node-cache";
import jwt from "jsonwebtoken";

const nodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });

const getSubjectFromAccessToken = (ctx: Context) => {
  const accessToken = ctx.cookies.get("accessToken");
  const { payload } = jwt?.decode(accessToken, { complete: true }) || {};
  if (!payload?.sub) {
    throw new Error("Could not obtain subject from access token");
  }
  return payload.sub;
};

const cache = {
  get: <T>(key: Key, ctx: Context): T | undefined => {
    const subject = getSubjectFromAccessToken(ctx);
    return nodeCache.get(`${key}-${subject}`);
  },
  set: <T>(key: Key, value: T, ctx: Context): boolean => {
    const subject = getSubjectFromAccessToken(ctx);
    return nodeCache.set(`${key}-${subject}`, value);
  },
};

export { cache };
