import App from 'next/app'
import cookie from 'cookie';
import auth from '../utils/auth'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx, router } = appContext;
  const { res } = ctx;
  const { pathname, query } = router;
  const { req: {headers: {cookie: cookieHeader}} } = ctx;
  const cookieObj = cookieHeader && cookie.parse(cookieHeader) || {}
  const {accessToken, refreshToken} = cookieObj;
  const appProps = await App.getInitialProps(appContext);
  if (accessToken) {
    return { ...appProps, pageProps: {...appProps.pageProps, accessToken } }
  } else {
    await auth(query, pathname, res, refreshToken)
    return {}
  }
  }

export default MyApp