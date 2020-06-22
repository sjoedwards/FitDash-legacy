import Router from 'next/router'

const authorize = async () => {
  Router.push(`//www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=activity%20nutrition%20weight`)
}

export default function Home(props) {
  return (
    <div>
      <button disabled={props.accessToken} onClick={() => authorize()}>Login</button>
    </div>
  )
}
