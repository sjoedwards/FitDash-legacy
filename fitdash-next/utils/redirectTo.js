const redirectTo = (path, pathName, res) => {
  console.log('pathName: ', pathName);
  console.log('path: ', path);
  if (pathName !== path) {
    res.writeHead(302, {
      Location: '/'
    })
    res.end()
  }
}

export default redirectTo;