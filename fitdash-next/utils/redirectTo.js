const redirectTo = (path, pathName, res) => {
  if (pathName !== path) {
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }
}

export default redirectTo;