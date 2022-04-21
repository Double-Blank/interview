const Koa = require('koa');
// router 引入的是一个方法
const router = require('koa-router')();
const app = new Koa();
const cors = require('koa2-cors');
const PORT = 3000;

app.use(cors({
  origin: "*"
}));


// 接收两个参数 路由路径以及回调函数
router.get('/', ctx => {
  ctx.body = 'Hello World';
});
router.get('/api/get/:id', (ctx, next) => {
  let id = ctx.request.params.id
  ctx.body = {
    id,
    code: 1
  }
});

router.get('/api/gettest', function (ctx, next) {
  const query = ctx.query
  console.log("query:", query)//获取前端参数
  const obj = {
    code: 200,
    data: {
      name: '小王',
      age: '88'
    }
  }
  ctx.body = obj;//响应数据 返回给前端
})


router.post('/api/posttest', function (ctx, next) {
  console.log("query_bar:", ctx.request.body)//获取前端参数
  const obj = {
    code: 200,
    data: {
      name: '小王',
      age: '88'
    }
  }
  ctx.body = obj;//响应数据 返回给前端
})


app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})