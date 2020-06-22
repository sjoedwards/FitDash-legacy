import btoa from 'btoa'
import axios from 'axios'

const refreshAccessToken = async refreshToken => {
  const clientSecret = process.env.CLIENT_SECRET
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
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
    console.log(`Failed to obtain token: ${e.message}`)
    console.log(e && e.response && e.response.data)
  }
}

export default refreshAccessToken