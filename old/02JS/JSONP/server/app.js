let express = require('express')
let app = express()
app.get('/', function(req, res) {
  let { say, callback } = req.query
  console.log(say); // hello
  console.log(callback); // sayhi
  // 浏览器直接执行返回给script的字符串
  res.end(`${callback}('jiuto')`);
})
app.listen(3000)