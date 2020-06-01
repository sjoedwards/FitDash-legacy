const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
const axios = require('axios');
const btoa = require('btoa')
const atob = require('atob')
const moment = require('moment')
const ObjectsToCsv = require('objects-to-csv')
const nodeCache = require('node-cache')
require('dotenv').config({ path: '../.env' })
const cache = new nodeCache({ stdTTL: 3600, checkperiod: 300 })
const getTokens = async (ctx, accessCode) => {
  if (!accessCode) {
    console.log('No access code, redirecting to FitBit authZ')
    return ctx.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=activity%20nutrition&test=test`)
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
    return response && response.data
  } catch (e) {
    console.log('Failed to obtain token')
    console.log(e && e.response && e.response.data)
  }
}

const refreshAccessToken = async refreshToken => {
  const clientSecret = process.env.CLIENT_SECRET
  const clientId = process.env.CLIENT_ID
  const authString = btoa(`${clientId}:${clientSecret}`)
  const headers = {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  try {
    const response = await axios({url: `https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}`, method: 'post', headers: headers})
    console.log('Successfully obtained token')
    return response && response.data
  } catch (e) {
    console.log('Failed to obtain token')
    console.log(e && e.response && e.response.data)
  }
}

const getActivities = async ctx => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`
  }
  try {
    return await axios({url: `https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=${moment().add(1, 'days').format(("YYYY-MM-DD"))}&offset=0&limit=20&sort=desc`, method: 'get', headers})
  } catch (e) {
    console.log(e.message)
    console.log(e && e.response && e.response.data && e.response.data.errors)
  }
}

const getCalories = async (ctx, weeksAgo) => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`
  }
  const weekStart = moment().subtract(weeksAgo, 'weeks').startOf('isoWeek').format("YYYY-MM-DD");
  const weekEnd = moment().subtract(weeksAgo, 'weeks').endOf('isoWeek').format("YYYY-MM-DD");
  const caloriesLog = (await axios({url: `https://api.fitbit.com/1/user/-/foods/log/caloriesIn/date/${weekStart}/${weekEnd}.json`, method: 'get', headers})).data["foods-log-caloriesIn"].filter(({value}) => value != 0)
  const calories = (caloriesLog.reduce((sum, {value}) => sum + parseInt(value), 0) / caloriesLog.length).toFixed(0)
  return {weekEnd, calories}
}

const getMacros = async (ctx, weeksAgo) => {
  const headers = {
    Authorization: `Bearer ${ctx.state.token}`
  }
  const weekStart = moment().subtract(weeksAgo, 'weeks').startOf('isoWeek').format("YYYY-MM-DD");
  const weekEnd = moment().subtract(weeksAgo, 'weeks').endOf('isoWeek').format("YYYY-MM-DD");
  const macros = (await Promise.all(Array(7).fill(undefined).map(async (_, index) => {
    const date = moment(weekStart).add(index, 'days').format("YYYY-MM-DD");
    const macrosResult = (await axios({url: `https://api.fitbit.com/1/user/-/foods/log/date/${date}.json`, method: 'get', headers})).data.summary
    const {calories, protein, carbs, fat } = macrosResult
    return {
      date,
      calories,
      protein,
      carbs,
      fat
    }
  })))
  const weekMacros = macros.reduce((acc, entry) => {
    return {
      calories: acc.calories + parseFloat(entry.calories),
      fat: acc.fat + parseFloat(entry.fat),
      protein: acc.protein + parseFloat(entry.protein),
      carbs: acc.carbs + parseFloat(entry.carbs)
    }
  }, {fat: 0, protein: 0, carbs: 0, calories: 0})

  return {
    weekEnd,
    fat: ((weekMacros.fat * 9.579) / weekMacros.calories).toFixed(2),
    carbs: ((weekMacros.carbs * 4.256) / weekMacros.calories).toFixed(2),
    protein: ((weekMacros.protein * 4.283) / weekMacros.calories).toFixed(2),
  }
}

(async () => {

  router.get('/authn', async ctx => {
    ctx.body = 'Completed authentication, attempt request again'
  })

  router.get('/calories', async ctx => {
          const cachedCalories = cache.get('calories')
          let calories;
          if (cachedCalories) {
            console.log('Retrieving calories from cache')
            calories = cachedCalories
          } else {
            console.log("Getting calories from fitbit")
            calories = (await Promise.all(Array(6).fill(undefined).map(async (_, index) => {
              const weeksAgo = index + 1;
              return getCalories(ctx, weeksAgo)
            }))).sort((a,b) => {
              return a.weekEnd == b.weekEnd ? 0 : a.weekEnd > b.weekEnd ? 1 : -1
            })
            cache.set("calories", calories)
          }
          const csv = new ObjectsToCsv(calories)
          await csv.toDisk(`./results/calories/${moment().format(("YYYY-MM-DD"))}.csv`);
          ctx.body = await csv.toString()
      })

  router.get('/macros', async ctx => {
    const cachedMacros = cache.get('macros')
    let macros;
    if (cachedMacros) {
      console.log('Retrieving macros from cache')
      macros = cachedMacros
    } else {
      console.log('Retreiving macros from fitbit API')
      macros = (await Promise.all(Array(2).fill(undefined).map(async (_, index) => {
        const weeksAgo = index + 1;
        return getMacros(ctx, weeksAgo)
      }))).sort((a,b) => {
        return a.weekEnd == b.weekEnd ? 0 : a.weekEnd > b.weekEnd ? 1 : -1
      })
      cache.set("macros", macros)
    }
    const csv = new ObjectsToCsv(macros)
    await csv.toDisk(`./results/macros/${moment().format(("YYYY-MM-DD"))}.csv`);
    ctx.body = await csv.toString()
  })

  router.get('/runs', async ctx => {
      const activities = await getActivities(ctx)
      if (activities && activities.data && activities.data.activities) {
        const formattedActivities = activities.data.activities.filter(activity => activity.activityName == 'Run').map(({distance, pace, originalStartTime, activeDuration}) => {
          return {
            date: moment(originalStartTime).format(("YYYY-MM-DD")),
            distance: distance.toFixed(2),
            duration: moment.utc(moment.duration((activeDuration), "milliseconds").asMilliseconds()).format("HH:mm:ss"),
            pace: moment.utc(moment.duration(pace, "seconds").asMilliseconds()).format("HH:mm:ss")
          }
        }).sort((a,b) => {
          return a.date == b.date ? 0 : a.date > b.date ? 1 : -1
        })
      const csv = new ObjectsToCsv(formattedActivities)
      await csv.toDisk(`./results/runs/${moment().format(("YYYY-MM-DD"))}.csv`);
      ctx.body = await csv.toString()
      }
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })
  .on('error', (err, ctx) => {
    console.log(err)
  })
  .use(async (ctx, next) => {
    const accessToken = await ctx.cookies.get('accessToken');
    const refreshToken = await ctx.cookies.get('refreshToken');
    if (accessToken) {
      console.log('Token obtained from cookie')
      ctx.state.token = accessToken
    } else if (refreshToken) {
        console.log('Refreshing token')
        const tokens = await refreshAccessToken(refreshToken);
        tokens && ctx.cookies.set('accessToken', tokens.access_token, {maxAge: tokens.expires_in})
        ctx.state.token = tokens && tokens.access_token
      }
    if (!ctx.state.token) {
      accessCode = ctx.request.query.code
      const tokens = await getTokens(ctx, accessCode)
      if (ctx.status === 302) {
        return
      }
      ctx.cookies.set('accessToken', tokens.access_token, {maxAge: tokens.expires_in})
      ctx.cookies.set('refreshToken', tokens.refresh_token)
      const redirectPath =  ctx.cookies.get('path') || '/auth'
      ctx.redirect(redirectPath)
    }
    return next()
  })
  .use(router.routes())
  .use(router.allowedMethods());
  app.listen(3005);
})()
