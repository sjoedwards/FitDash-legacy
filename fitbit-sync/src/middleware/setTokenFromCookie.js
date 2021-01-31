const btoa = require("btoa");
const axios = require("axios");

const refreshAccessToken = async (refreshToken) => {
  const clientSecret = process.env.CLIENT_SECRET;
  const clientId = process.env.CLIENT_ID;
  const authString = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  try {
    const response = await axios({
      url: `https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
      method: "post",
      headers,
    });
    /* eslint-disable-next-line no-console */
    console.log("Successfully obtained token");
    return response && response.data;
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log("Failed to obtain token");
    /* eslint-disable-next-line no-console */
    console.log(e && e.response && e.response.data);
    throw e;
  }
};

const authMiddleware = async (ctx, next) => {
  const accessToken = await ctx.cookies.get("accessToken");
  const refreshToken = await ctx.cookies.get("refreshToken");
  if (accessToken) {
    /* eslint-disable-next-line no-console */
    console.log("Token obtained from cookie");
    ctx.state.token = accessToken;
  } else if (refreshToken) {
    /* eslint-disable-next-line no-console */
    console.log("Refreshing token");
    try {
      const tokens = await refreshAccessToken(refreshToken);
      if (tokens) {
        ctx.cookies.set("accessToken", tokens.access_token, {
          maxAge: tokens.expires_in,
        });
      }
      ctx.state.token = tokens && tokens.access_token;
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.log("Failed to refresh token");
      /* eslint-disable-next-line no-console */
      console.log(e && e.response && e.response.data);
    }
  }
  return next();
};

module.exports = authMiddleware;
