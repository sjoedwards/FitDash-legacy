const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
const axios = require('axios');
const btoa = require('btoa')
const atob = require('atob')
const moment = require('moment')
const ObjectsToCsv = require('objects-to-csv')
require('dotenv').config({ path: '../.env' })

let accessToken;
let accessCode;

const getCode = async ctx => {
  if (ctx.request.query.code) {
    if ((ctx.request.query.code !== accessCode)) {
      console.log('Obtained new code from query string')
      accessCode = ctx.request.query.code
      return accessCode
    } else {
      await ctx.redirect('/runs')
    }
  }
}

const getToken = async ctx => {
  if (!accessCode) {
    console.log('No access code, redirecting to FitBit authZ')
    return ctx.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=activity`)
  }
  const clientSecret = process.env.CLIENT_SECRET
  const clientId = process.env.CLIENT_ID
  const authString = btoa(`${clientId}:${clientSecret}`)
  const headers = {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  try {
    const response = await axios({url: `https://api.fitbit.com/oauth2/token?code=${accessCode}&grant_type=authorization_code&client_id=${clientId}`, method: 'post', headers: headers})
    console.log('Successfully obtained token')
    return response && response.data && response.data.access_token
  } catch (e) {
    console.log('Failed to obtain token')
    console.log(e && e.response && e.response.data)
  } finally {
    console.log('Resetting accessCode')
    accessCode = undefined
  }
}

const getActivities = async ctx => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  }
  try {
    return await axios({url: `https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${moment().add(1, 'days').format(("YYYY-MM-DD"))}&offset=1&limit=20&sort=desc`, method: 'get', headers})
  } catch (e) {
    console.log(e.message)
    console.log(e && e.response && e.response.data && e.response.data.errors)
  }
}

(async () => {

  router.get('/authz', async ctx => {
    accessCode = ctx.request.query.code
    ctx.redirect('/runs')
  })

  router.get('/runs', async ctx => {
    if (accessToken) {
      console.log('Token obtained from memory')
    } else {
      accessToken = await getToken(ctx)
    }
    if (accessToken) {
      const activities = await getActivities(ctx)
      if (activities && activities.data && activities.data.activities) {
        const formattedActivities = activities.data.activities.filter(activity => activity.activityName == 'Run').map(({distance, pace, originalStartTime, activeDuration}) => {
          return {
            date: moment(originalStartTime).format(("YYYY-MM-DD")),
            distance: distance.toFixed(2),
            duration: moment.utc(moment.duration((activeDuration), "milliseconds").asMilliseconds()).format("HH:mm:ss"),
            pace: moment.utc(moment.duration(pace, "seconds").asMilliseconds()).format("HH:mm:ss")
          }
        })
      const csv = new ObjectsToCsv(formattedActivities)
      await csv.toDisk(`./results/${moment().format(("YYYY-MM-DD"))}-runs.csv`);
      ctx.body = await csv.toString()
      }
    }
    if (ctx.status == 302) {
      return
    } else {
      ctx.status = 400
    }
  });
  app
  .use(router.routes())
  .use(router.allowedMethods());
  app.listen(3005);
})()
