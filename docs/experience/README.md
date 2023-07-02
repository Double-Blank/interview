## 知识深度

### js内存泄漏如何检测，场景有哪些

- 非预期的因为外部引用或闭包，不能被回收

  - 全局变量、函数引用，组件销毁时未清除
  - 全局事件、定时器，组件销毁时未清除
  - 自定义事件引用，组件销毁时未清除

- 垃圾回收

  >- 引用计数，看对象有没有被引用，遇到循环引用会出现问题
  >
  >- 标记清除，遍历window各个属性，看是否能得到某个对象，不能得到则删除

### nodejs 多线程

进程 process，操作系统进行资源分配和调度的最小单位，有独立内存空间

线程 thread，操作系统进行运算调度的最小单位，共享进程内存空间

PM2

### js-bridge的实现原理

网页中的应用无法调用 native API，需要特殊格式来调用，例如微信的JSSDK 

```
在WebView中注入JavaScript代码，用于与原生代码进行交互。
原生代码实现与JavaScript的交互接口，用于接收JavaScript传递的数据或调用原生功能。
JavaScript通过调用接口与原生代码进行交互，实现数据传递和功能调用。
原生代码通过调用WebView提供的接口，将数据或结果传递给JavaScript。

- 注册全局API 不适合异步的情况
- URL Scheme 类似于自定义网络协议
```

## 知识广度

### 移动端H5点击有300ms延迟，该如何解决

- 使用 fastclick.js 库
- 使用 CSS 属性 touch-action，将 touch-action 设置为 "manipulation" 可以消除点击延迟。
- 使用 touchstart 事件代替 click 事件

### token 和 cookie 的区别

- cookie 用于登录验证，存储用户标识（如useId）
- session 在服务端，存储用户详细信息，和cookie信息一一对应
- cookie 和 session 是常见的登录验证解决方案
- cookie 是 HTTP 规范，而 token 是自定义传递
- cookie 浏览器自动存储(setCookie), token需要自己存
- token默认没有跨域限制，应用于jwt

### session 和 jwt 比较

- session

  - 原理简单，易于学习

  - 用户信息存储在服务端，可快速封禁某个用户

  - 占用服务端内存，多进程，多服务器不好同步 —— 需要第三方缓存，如 redis

- jwt

  - 不占用服务端内存
  - 多进程多服务器不受影响
  - 没有跨域限制

- > JWT 由三部分组成：头部（header）、负载（payload）和签名（signature）。
  >
  > 头部包含了 JWT 的类型和使用的算法，如下所示：
  >
  > ```json
  > {
  > "alg": "HS256",
  > "typ": "JWT"
  > }
  > ```
  >
  > 其中，"alg" 表示签名算法，"typ" 表示 JWT 的类型。
  >
  > 负载是 JWT 的主要内容，用于携带用户信息和其他元数据，如下所示：
  >
  > ```json
  > {
  > "sub": "1234567890",
  > "name": "John Doe",
  > "iat": 1516239022
  > }
  > ```
  >
  > 其中，"sub" 表示 JWT 的主题，"name" 表示用户的姓名，"iat" 表示 JWT 的签发时间。
  >
  > 签名是对头部和负载进行加密的结果，以确保 JWT 的完整性和安全性。签名使用的算法和头部中的 "alg" 字段指定的算法一致，常用的算法有 HMAC SHA256 和 RSA。
  >
  > 使用 JWT 进行身份验证和授权的流程如下：
  >
  > 1. 用户在登录时，向服务器发送登录请求。
  > 2. 服务器验证用户的身份，并生成一个 JWT。
  > 3. 服务器将 JWT 发送给客户端，客户端将其保存在本地，通常使用 cookie 或 localStorage。
  > 4. 客户端在以后的请求中，将 JWT 作为身份验证信息发送给服务器。
  > 5. 服务器验证 JWT 的合法性，并根据其中的信息对请求进行授权。
  >
  > 使用 JWT 可以有效地减少服务器端的状态管理，提高系统的可扩展性和可维护性。同时，由于 JWT 使用了加密算法，可以保证信息的安全性和完整性。

### SSO单点登录

- 二级域名不同主域名相同，可以用cookie登录
- 验证ticket
- OAuth 2.0 第三方登录

### HTTP协议和UDP协议有什么区别

- HTTP 在应用层
- TCP（稳定） 和 UDP（不稳定，但效率高） 在运输层

### script 标签的 defer 和 async 有什么区别

1. `defer` 属性：表示该脚本可以延迟到文档解析和渲染完成后再执行，但必须在文档 `DOMContentLoaded` 事件之前执行。多个带有 `defer` 属性的脚本会按照它们在文档中出现的顺序依次执行，并且会在 `DOMContentLoaded` 事件之前执行完毕。
2. `async` 属性：表示该脚本可以异步加载，不会阻塞文档的解析和渲染过程，但一旦下载完成，会立即执行。多个带有 `async` 属性的脚本的执行顺序是不确定的，因为它们的下载和执行都是异步的。
3. prfetch 资源预获取
4. dns-prefetch dns 预查询

### 前端攻击

- xss 跨站脚本攻击，将 js 插入到网页中，渲染时执行，预防：特殊字符替换(Vue 和 React 默认屏蔽，使用 v-html  和 dangerouslySetInnerHtml 则失效)
- csrf 跨站请求伪造，钓鱼邮件，服务端严格控制跨域，判断reffer，以及验证码机制
- 点击劫持，透明的iframe
  - x-frame-options
- DDOS 阿里云WAF

## 实际工作经验

### 首屏优化

- 路由懒加载，路由拆分
- 纯H5页面，SSR是性能优化终极方案，nuxt(vue) next(react)
- 如果 H5 在 App WebView 中展示，可使用 App 预取
- 分页
- 图片懒加载 
- hybrid 先下载 html + css + js 下载到本地然后 使用file:// 打开本地文件

### 10w条数据

- setTimeout分页渲染

  ```javascript
  const renderList = async () => {
      console.time('列表时间')
      const list = await getList()
      console.log(list)
      const total = list.length
      const page = 0
      const limit = 200
      const totalPage = Math.ceil(total / limit)
  
      const render = (page) => {
          if (page >= totalPage) return
          setTimeout(() => {
              for (let i = page * limit; i < page * limit + limit; i++) {
                  const item = list[i]
                  const div = document.createElement('div')
                  div.className = 'sunshine'
                  div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                  container.appendChild(div)
              }
              render(page + 1)
          }, 0)
      }
      render(page)
      console.timeEnd('列表时间')
  }
  ```

- 虚拟列表，只渲染可视区域DOM，借用第三方lib，Vue-virtual-scroll-list React-virtualised

- 文档碎片 + requestAnimationFrame

### 常用的设计模式，使用场景

开闭原则，扩展开放，修改封闭

- 工厂函数，创建示例，隐藏new，例如 JQuery $ => new JQuery

  ```js
  class Foo {}
  fuction factory() {
    return new Foo()
  }
  ```

- 单例模式，全局唯一的实例，如 Vuex Redux 的 store

  ```js
  class SingleTon {
     private stastic instance = null
     private construcor() {}
     pubilc static getInstance(): SingleTon {
       if (this.instance == null) {
          this.instance = new SingleTon()
       } 
       return this.instance
     }
     fn1() {}
     fn2() {}
   }
  
   // 不能使用 new SingleTon
   const s = SingleTon.getInstance()
  ```

- 代理模式，使用者不能直接访问对象，先访问代理层

- 观察者模式

```js
class Subject { // 主体
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {// 观察者
  update() {
    console.log('Subject has been updated');
  }
  subscribeTo(subject) {
    subject.addObserver(this);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
observer1.subscribeTo(subject);
observer2.subscribeTo(subject);
subject.notifyObservers();
```

- 发布订阅

```js
class EventBus {
  constructor() {
    this.subscribers = {};
  }
  subscribe(eventName, callback) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
  }
  publish(eventName, ...args) {
    if (!this.subscribers[eventName]) {
      return;
    }
    this.subscribers[eventName].forEach(subscriber => {
      subscriber(...args);
    });
  }
}

const eventBus = new EventBus();
const subscriber1 = (message) => {
  console.log('Subscriber 1 received message:', message);
};
const subscriber2 = (message) => {
  console.log('Subscriber 2 received message:', message);
};
eventBus.subscribe('message', subscriber1);
eventBus.subscribe('message', subscriber2);
eventBus.publish('message', 'Hello World!');
eventBus.publish('message', 'Goodbye World!');

```

- 装饰器模式，原功能不变，增加新功能

  ```js
  class MyTestClass {}
  function testable(target) {
    target.isTestable = true
  }
  MyTestClass.isTestable // true
  ```


### 观察者和发布订阅模式的区别

- 观察者模式中，主题对象直接通知观察者对象

- 发布订阅模式中，主题对象不直接通知订阅者对象，而是通过事件总线来发布事件，订阅者对象则通过订阅事件来接收事件通知。

### Vue优化

- v-for 使用 key

- 使用 computed 缓存

- 如 tabs 可使用 keep-alive 缓存组件 （占用内存比较多，不易debug）

  ```vue
  <keep-alive>
    <Child1 v-if="num === 1"></Child1>
    <Child2 v-else></Child2>
  </keep-alive>
  ```

- 异步组件，如编辑器，复杂表格，表单等需要时异步加载，不需要时不加载，减少包体积

  ```js
  import { defineAsyncComponent } from 'vue'
  export default {
    name: "AsyncComponent",
    components: {
      Child: defineAsyncComponent(() =>
        import(/* webpackChunkName: "async-child" */ "./Child.vue")
      ),
    },
  };
  ```

- 路由懒加载

  ```js
  const routes = [
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
  ```

- 服务端渲染

- 第三方插件按需加载

- vue-loader 开发环境做模版编译

- 微前端

### vue封装组件考虑哪些问题 🎈

- 参考原型图，设计数据结构
- 考虑可扩展性，数据流
- 异常处理
- 循环引用问题
- 测试

### Vue中遇到过哪些坑

- 内存泄漏（全局变量、全局事件、全局定时器没有销毁，自定义事件）
- Vue2 响应式缺项 data 新增使用 Vue.set 删除 Vue.delete，无法直接修改数据 arr[index] = value
- 不要在 `v-for` 中使用 `v-if`，因为它会导致 Vue 重复渲染元素，降低性能。可以使用 `computed` 属性或者过滤器来处理筛选逻辑。
- 不要在组件选项中使用箭头函数，因为它们会绑定到父级作用域，而不是组件实例。
- 不要在 `data` 属性中定义对象或数组，因为它们是引用类型，如果在组件中多次使用，会影响到其它组件。可以使用 `computed` 属性来处理对象或数组。
- 在使用 Vuex 来管理应用程序状态时，需要注意在提交 mutation 时要遵循单向数据流的原则。不要在视图层直接修改状态，而是通过提交 mutation 来修改，这样可以保证状态变化的可追踪性和可维护性。
- 视图没有改变 - > 需要更新key

### React优化

不可变数据 immer

- 使用css模拟v-show
- 使用 Fragment 减少层级 即空标签 <></>
- jsx中定义函数可以移到组件外部，因为jsx会被频繁执行
- 要在构造函数中bind this
- 使用shouldComponentUpdate判断组件是否更新或React.PureComponent函数组件使用React.memo

```\
shouldComponentUpdate:
shouldComponentUpdate 是一个生命周期钩子函数，用于控制组件是否需要重新渲染。它默认返回 true，表示组件每次更新都需要重新渲染。如果在 shouldComponentUpdate 中返回 false，表示组件不需要重新渲染。

在实现 shouldComponentUpdate 时，需要比较组件的 props 和 state 的变化，如果这些变化不会影响组件的渲染结果，那么可以返回 false，从而避免不必要的渲染。

React.PureComponent:
React.PureComponent 是 React 提供的一个组件类，它自动实现了 shouldComponentUpdate，并且会对组件的 props 和 state 进行浅比较。如果 props 和 state 没有变化，那么 PureComponent 就不会重新渲染。

使用 React.PureComponent 可以减少手动编写 shouldComponentUpdate 的工作量，同时也可以提高组件的渲染性能。但是需要注意的是，PureComponent 只能进行浅比较，如果组件的 props 和 state 中包含复杂类型的数据，那么可能会出现误判，导致组件不更新。

React.memo:
React.memo 是一个高阶组件，用于对组件进行浅比较，如果组件的 props 没有变化，那么就不会重新渲染组件。与 PureComponent 不同的是，React.memo 可以用于任意函数组件，而不是仅限于类组件。

使用 React.memo 可以方便地优化函数组件的性能，避免不必要的渲染。例如：

function MyComponent(props) {
  // 组件的渲染逻辑
}

export default React.memo(MyComponent);
在上面的代码中，MyComponent 组件被包装在 React.memo 中，这样就可以对组件进行浅比较，从而避免不必要的渲染。

总之，shouldComponentUpdate、React.PureComponent 和 React.memo 都是用于提高 React 组件渲染性能的技术，需要根据具体的场景选择合适的技术。
```

- Hooks 缓存数据和函数

  ```
  useMemo 用于缓存计算结果
  useCallback 用于缓存函数
  ```

- 异步组件

  ```react
  import React, { lazy, Suspense } from 'react';
  const MyComponent = lazy(() => import('./MyComponent'));
  function App() {
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MyComponent />
        </Suspense>
      </div>
    );
  }
  ```

- 路由懒加载

- SSR

### React坑

- 自定义组件名称首字母大写，className关键字冲突
- setState 异步更新
- useMemo, useCallback, useEffect 依赖不能是对象

### 监听Vue组件报错

window.onerror

errorCaptured 监听所有下级组件的错误，返回false会阻止向上传播

errorHandler

异步错误：走到window.onerror

### 监听 React 组件报错

ErrorBoundary 组件，监听下级组件报错，可降级展示UI

window.onerror

try catch

promise 为处理的 catch 需要 onunhandlerdrejection

### 如果一个H5很慢如何排查

performance 里

First Paint(FP)

First Contentful Paint (FCP)

DomContentLoaded(DCL)

Larget Contentfull Paint(LCP)

Load(L)

Lighthouse 测试报告

加载慢

>- 使用CDN
>- 路由懒加载
>- 优化HTTP缓存策略

渲染慢

>- 优化服务端接口
>- 优化内部逻辑
>
>- SSR

持续跟进

### Canvas常用API

```javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'green'
ctx.fillRect(10, 10, 150, 100)
// 1. 绘制路径
ctx.beginPath() // 开始路径绘制
ctx.moveTo(20, 30) // 设置路径起点，坐标为（20，30）
ctx.lineTo(200, 10) // 设置路径终点坐标为（200，20）
ctx.lineWidth = 10.0 // 设置线宽
ctx.strokeStyle = '#CC0000'; // 设置线的颜色
ctx.stroke() // 对线进行着色，这时整条线就变得可见
// 2. 图像处理方法
ctx.drawImage(img, 0, 0) // (0 ,0 )代表图片在画布上的位置
getImageData
putImageData
toDataURL
```

### d3.js 常用api

D3.js 是一个数据可视化库，提供了丰富的 API，可以用于创建各种类型的可视化图表，包括折线图、柱状图、散点图、热力图等。以下是一些常用的 D3.js API：

- `d3.select(selector)`：选中指定的 HTML 元素，并返回一个 D3.js 选择集对象，可以通过该对象进行操作。
- `selection.append(name)`：在当前选择集中的每个元素的末尾添加一个指定名称的元素。
- `selection.attr(name [, value])`：如果指定了值，则将指定的属性设置为该值；否则返回当前选择集中的第一个元素的指定属性的值。
- `selection.style(name [, value [, priority]])`：如果指定了值，则将指定的样式设置为该值；否则返回当前选择集中的第一个元素的指定样式的值。
- `d3.scaleLinear()`：创建一个线性比例尺。
- `d3.scaleOrdinal()`：创建一个离散比例尺，用于将一个离散的输入域映射到一个输出域。
- `d3.axisBottom(scale)`：创建一个底部轴，并绑定指定的比例尺。
- `d3.axisLeft(scale)`：创建一个左侧轴，并绑定指定的比例尺。
- `d3.line()`：创建一个线生成器，可以用于生成折线图路径数据。
- `selection.data(data[, key])`：将给定的数据绑定到当前选择集中的元素上，并返回一个更新后的选择集。
- `selection.enter()`：返回一个包含所有新元素的选择集。
- `selection.exit()`：返回一个包含所有被删除元素的选择集。

除了上述常用的 API，D3.js 还提供了很多其他的 API，如 `d3.scaleTime()` 用于创建一个时间比例尺、`d3.interpolate` 用于创建一个插值器、`d3.zoom` 用于创建一个缩放行为等等。在实际使用过程中，需要根据实际需求选择合适的 D3.js API 进行数据处理和可视化绘制。

### three.js 常用 api

Three.js 是一个基于 JavaScript 的 3D 图形库，提供了丰富的 API，可以用于创建复杂的 3D 场景和动画。以下是一些常用的 Three.js API：

- `THREE.Scene()`：创建一个场景对象。
- `THREE.WebGLRenderer()`：创建一个 WebGL 渲染器对象，用于将场景渲染到 WebGL 上下文中。
- `THREE.Camera()`：创建一个相机对象，用于定义场景中的视点。
- `THREE.Mesh(geometry, material)`：创建一个网格对象，用于将几何体和材质结合起来。
- `THREE.BoxGeometry(width, height, depth)`：创建一个立方体几何体。
- `THREE.PlaneGeometry(width, height)`：创建一个平面几何体。
- `THREE.SphereGeometry(radius, widthSegments, heightSegments)`：创建一个球体几何体。
- `THREE.Material()`：创建一个材质对象，用于定义网格的外观。
- `THREE.MeshBasicMaterial(options)`：创建一个基础网格材质。
- `THREE.MeshLambertMaterial(options)`：创建一个 Lambert 网格材质，用于模拟光照。
- `THREE.MeshPhongMaterial(options)`：创建一个 Phong 网格材质，用于高光反射和阴影。
- `THREE.PointLight(color, intensity)`：创建一个点光源。
- `THREE.DirectionalLight(color, intensity)`：创建一个平行光源。
- `THREE.AmbientLight(color)`：创建一个环境光源，用于模拟整个场景的光照。
- `THREE.AnimationMixer(object)`：创建一个动画混合器对象，用于管理场景中的动画。
- `THREE.Clock()`：创建一个计时器对象，用于计算帧率和时间差。
- `THREE.OrbitControls(camera, domElement)`：创建一个轨道控制器对象，用于控制相机的旋转、缩放和平移。

除了上述常用的 Three.js API，它还提供了很多其他的 API，如 `THREE.TextureLoader` 用于加载纹理、`THREE.RenderTarget` 用于渲染到纹理、`THREE.Raycaster` 用于射线检测等等。在实际使用过程中，需要根据实际需求选择合适的 Three.js API 进行场景搭建、材质配置、光照设置、动画管理等操作。

### 组件库本地调试冲突问题

使用 react 两个版本有冲突

使用peerDependencies

### 发布

"prepublishOnly": "npm run test:nowatch && npm run lint && npm run build",

#### 添加发布和commit前检查

script添加lint

husky commit 前检查使用 && 符连接命令

#### CI/CD 持续集成 持续部署

使用 travis 自动运行测试, 公司中使用的是jenkins

.travis.yml

### 组件库生成最终的样式文件

"build-css": "node-sass ./src/styles/index.scss ./dist/index.css",

"build": "npm run clean && npm run build-es && npm run build-umd",

### 微前端

使用 Web Components 原理实现的类似于 MicroApp 的微前端框架

- 优势：接入比较方便，不需要对子应用的入口进行修改，满足协议一致，前后端放开跨域，就可以进行比较方便的微前端嵌入
- 做了一些沙箱隔离，使用 proxy 在 window 做了一层代理，更改this指向，创建一个假的 `window` 出来，不影响全局变量
- 样式隔离：加了一个子应用选择器，类似 Vue scope 做编译时处理，编译后加一个选择器，dom 上也增加相应的属性

### 独立负责上线需要做什么

1、需求评审，确认研发计划。编写测试计划、测试方案。
2、先根据产品的需求文档+自己对当前行业的了解，拆分测试点。拆分测试点的过程中，把遇到的不清晰的需求（或者技术方面，不理解的知识点），通过问产品/开发/搜索引擎检索/查阅公司内部资料，搞定 。
根据自己梳理完成的最终测试点，开始设计测试用例、进行用例评审（或是测试点评审）。
3、测试执行过程中 ，问题提交Bug系统，对提交的bug进行跟进、回归。
4、关注风险/延期 ，以及 质量/进度的平衡，及时反馈。
5、完成测试，提交测试报告。
6、开始发布、上线（或有灰度发布流程。记得把上线的步骤，自己用文档，完整的记录下来，并模拟几次，确保无遗漏）。
7、进行生产环境测试
8、上线后，核心业务的日志、数据监控
9、上线后，线上问题反馈流程。
10、上线后的值班。
11、项目复盘（总结会）

### 图标库

- Font awesome
- 组件库 二次封装，需要build a Library
- 组件样式添加
  - 使用sass @each 规则
- 动画
  - transiton: transform .25s ease-in-out
  - React Transition Group 延时解决方案 CSSTransition

### 介绍一下React-testing-library

React-testing-library 常用api

1. `render()`：渲染 React 组件并返回一个包含渲染结果的对象，以便于后续操作。
2. `getByLabelText()`：通过组件标签的文本内容获取组件元素。
3. `getByText()`：通过组件渲染的文本内容获取组件元素。
4. `getByRole()`：通过 ARIA 规范定义的角色获取组件元素。
5. `getByTestId()`：通过自定义的测试 ID 获取组件元素。
6. `fireEvent()`：模拟用户交互，例如点击、输入等。
7. `waitFor()`：等待异步操作完成后再进行后续操作。
8. `queryBy*()`：与 `getBy*()` 相似，但是如果找不到对应的元素，它不会抛出异常，而是返回 `null`。
9. `findAllBy*()`：返回所有符合条件的元素，而不是只返回第一个符合条件的元素。
10. `debug()`：打印组件的 DOM 树结构，以便于调试。

它鼓励开发人员关注用户如何与组件交互，而不是组件的内部实现细节。因此，测试更加贴近真实用户的使用场景，从而提高测试的可靠性和实用性。

### Input

```
<Input
	value={value}
	onChange={handleChange}
	{...restProps} 支持其他所有HTMLInput 属性
/>
```

### AutoComplete

下拉框选择

支持异步

使用自定义Hook实现函数防抖

```js
import { useState, useEffect } from 'react';

const useDebounce = (callback, delay) => {
  const [debouncedCallback, setDebouncedCallback] = useState(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;
```

支持键盘事件

### Upload

生命周期

berforeUpload

onProgress

onChange

onSuccess

```
<Upload
	action="api.com"
	onChange={action('changed')}
	defaultFileList={defaultFileList}
	onRemove={action('removed')}
/>
```

显示上传进度

### Form表单总结

- 提取store 作为整个组件的中枢以及父子组件桥梁
- 调用dispatch将对应的form信息注册
- 使用React.cloneElement将controlProps做混入（表单更新时更新store中的数据）
- 自定义Item字段以及完善默认值
- 使用 async validate 完成验证工作
- 添加组件的实例方法 getFieldsValue 以及 resetFields 方法
  - 可以使用 `useImperativeHandle` Hook 来向子组件暴露实例方法

### 提问

- 我之前有哪些问题回答的不好
- 技术栈
- 业务方向
- 后端和前端的比例
