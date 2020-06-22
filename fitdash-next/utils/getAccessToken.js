import btoa from 'btoa';
import axios from 'axios';

const getAccessToken = async accessCode => {
  const clientSecret = process.env.CLIENT_SECRET
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
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

export default getAccessToken;