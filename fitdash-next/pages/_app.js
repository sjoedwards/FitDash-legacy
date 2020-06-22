import App from 'next/app'
import redirectTo from '../utils/redirectTo';
import refreshAccessToken from '../utils/refreshAccessToken';
import cookie from 'cookie';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx, router } = appContext;
  const { res } = ctx;
  const { pathname } = router;
  const { req: {headers: {cookie: cookieHeader}} } = ctx;
  const cookieObj = cookieHeader && cookie.parse(cookieHeader) || {}
  const {accessToken, refreshToken} = cookieObj;
  const appProps = await App.getInitialProps(appContext);
  if (!accessToken && !refreshToken) {
    await redirectTo('/', pathname, res)
  } else if (refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);
    if (tokens && access_token) {
      return { ...appProps, accessToken: access_token }
    } else {
      await redirectTo('/', pathname, res)
    }
  }

  return { ...appProps }
}

export default MyApp