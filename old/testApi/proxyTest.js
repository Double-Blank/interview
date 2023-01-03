const Koa = require('koa')

const app = new Koa()

const proxy = require('koa-server-http-proxy')

const proxyTable = {
  '/json': {
    target: 'http://jsonplaceholder.typicode.com',
    pathRewrite: { '^/json': '' },
    changeOrigin: true
  },
  '/api': {
    target: 'https://news-at.zhihu.com',
    pathRewrite: { '^/api': 'api/4/' },
    changeOrigin: true
  }
}

Object.keys(proxyTable).forEach((context) => {
  var options = proxyTable[context]
  app.use(proxy(context, options))
})

app.listen(3000)