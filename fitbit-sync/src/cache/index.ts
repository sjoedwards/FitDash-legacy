import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });
export { cache };
