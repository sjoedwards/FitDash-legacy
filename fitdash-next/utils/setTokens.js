import cookie from 'cookie';

const setTokens = (res, tokens) => {
  if (tokens?.access_token && tokens?.refresh_token) {
    const refreshToken = cookie.serialize('refreshToken', tokens.refresh_token)
    const accessToken = cookie.serialize('accessToken', tokens.access_token, {expires: new Date(Date.now() + tokens.expires_in)})
    res.setHeader('set-cookie', [`${refreshToken}`, `${accessToken}`])
  } else {
    const refreshToken = cookie.serialize('refreshToken', '', {expires: new Date(Date.now() - 1)})
    res.setHeader('set-cookie', [`${refreshToken}`])
  }
}

export default setTokens;