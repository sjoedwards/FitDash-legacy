import getAccessToken from './getAccessToken';
import setTokens from './setTokens';
import redirectTo from './redirectTo';
import refreshAccessToken from './refreshAccessToken';

const auth = async (query, pathname, res, refreshToken) => {

  if (query && query.code) {
    console.log('Getting token from accessCode')
    const tokens = await getAccessToken(query.code)
    await setTokens(res, tokens)
    await redirectTo('/?', pathname, res)
  } else if (refreshToken) {
    console.log('Attempting token refresh')
    const tokens = await refreshAccessToken(refreshToken);
    await setTokens(res, tokens)
    await redirectTo('/?', pathname, res)
  } else {
    console.log('No access or refresh tokens')
    await redirectTo('/', pathname, res)
  }
}

export default auth;