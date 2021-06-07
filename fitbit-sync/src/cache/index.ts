import NodeCache, { Key } from "node-cache";
const nodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });

// set<T>(
//   key: Key,
//   value: T,
const cache = {
  get: <T>(key: Key): T | undefined => {
    return nodeCache.get(key);
  },
  set: <T>(key: Key, value: T): boolean => {
    return nodeCache.set(key, value);
  },
};

export { cache };
