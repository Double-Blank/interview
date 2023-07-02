## webpack

### 前端代码为什么进行构建和打包

​	体积更小（Tree-Shaking、压缩、合并），加载更快

​	编译高级语言或语法（TS, ES6+, 模块化, SCSS）

​	兼容性和错误检查(Polyfill、postcss、eslint)

### module chunk bundle 分别是什么意思，有何区别

​	module - 各个源码文件，webpack一切皆模块

​	chunk - 多模块合并，如entry import() splitChunk

​	bundle - 最终的输出文件

在 Webpack 中，`module`、`chunk` 和 `bundle` 是三个常用的概念，它们分别代表着不同的概念和实体。

- `module`：代表着一个模块，它是 Webpack 中最基本的构建块，通常是一个文件（或一组文件），它包含了一些代码和资源。在 Webpack 中，每个模块都有一个唯一的标识符，可以通过该标识符来引用模块并进行依赖管理。
- `chunk`：代表着一组模块，它们之间存在依赖关系，通常是由 Webpack 根据模块之间的依赖关系自动创建的。在 Webpack 中，每个 chunk 都有一个唯一的标识符，可以通过该标识符来引用 chunk 并进行代码分割和懒加载。
- `bundle`：代表着最终的输出文件，它包含了一组 chunk 和其依赖的模块，最终将被浏览器加载和执行。在 Webpack 中，每个 bundle 都有一个唯一的文件名，通常是由 Webpack 根据配置和入口文件自动生成的。

可以简单理解为：一个模块是一个独立的文件或一组相关的文件，可以被 Webpack 编译成一个 chunk，而一组 chunk 可以被 Webpack 打包成一个 bundle，最终在浏览器中加载和执行。

需要注意的是，chunk 和 bundle 的概念在 Webpack 中很重要，因为它们可以帮助我们进行代码分割和懒加载，以提高应用程序的性能和加载速度。同时，在分析和优化 Webpack 构建过程中，也需要对模块、chunk 和 bundle 等概念有深入的了解。

###  loader和plugin的区别

​	loader模块转换器，如less -> css

​	plugin扩展插件，如HtmlWebpackPlugin

### babel 和 webpack 的区别

​	babel - JS 新语法编译工具，不关心模块化

​	webpack - 打包构建工具，是多个loader plugin 的集合

### 如何产出lib

```json
output: {
  filename: 'lodash.js',
  path: distPath,
  libray: 'lodash'
}
```

### webpack如何实现懒加载

### webpack常见性能优化

### babel-runtime 和 babel-polyfill的区别

### proxy 不能被 polyfill

​	无法模拟Object.defineProperty

### 拆分配置和配置

```
- build-base-conf
 - path.js
 - webpack.common.js
 - webpack.dev.js
 - webpack.prod.js
```

### 启动本地服务

"dev": "webpack-dev-server --config build-optimization/webpack.dev.js",

### 处理es6

loader: ['babel-loader'],定义验证规则test: /\.js$/,

会用到babel用到.babelrc

{

  "presets": ["@babel/preset-env"],

  "plugins": []

}

处理样式

处理图片 （< 5kb使用base64编码）

模块化

### 高级配置

多入口

​	build-multi-entry， -》 filename: '[name].[contentHash:8].js'

​	entry: {

​    	index: path.join(srcPath, 'index.js'),

   	 other: path.join(srcPath, 'other.js')
   	
   	 },

​	plugin 多个实例

抽离和压缩css文件

​	build-min-extract-css

抽离公共代码

​	build-splitChunks，splitChunks

懒加载

​	import('./dynamic').then()

处理JSX，Vue

​	babel/preset-react，vue-loader

### webpack性能优化 （build-optimization）

​	优化 babel-loader

​		开启缓存，明确范围

​	IgnorePlugin(直接不引入)

​		例子：moment.js多语言

​	noParse(引入，但不打包)

​		避免重复打包，如忽略对react.min.js

​	happyPack

​		多进程打包，提高构建速度

​		JS单线程，开启多进程打包

​	ParalleIUglifyPlguin

​		多进程压缩JS

​		（项目较小，打包很快，开启多进程会降低速度（进程开销））

​	自动刷新

​		watch

​	热更新

​		新代码生效，网页不刷新，状态不丢失

​	DllPlugin

​		动态链接库，DllPlugin - 打包出dll文件，DllReferencePlugin - 使用dll文件

### 性能优化 - 产出代码

​	图片< 5kb使用base64编码

​	bundle 加 hash

​	懒加载

​	提取公共代码

​	IngorePlugin

​	使用cdn加速

​		publicPath

​	使用mode: production

​		自动压缩

​		启用Tree-Shaking(必须用es6 module 才能生效)

​	使用 Scope Hosting, 多个函数合并成一个函数

​		代码体积更小

​		创建函数作用域更少

​		代码可读性更好

ES6 Module 和 Commonjs 的区别

​	ES6 Module 静态引入，编译时引入

​	Commonjs 动态引入，执行时引入

​	只有ES6 Module 才能静态分析，实现Tree-Shaking

### babel基本概念

es6 -> es5, 解析语法

​	环境搭建 & 基本配置

​		preset 是 plugin 的集合

​	babel-polyfill

​		core.js + regenerator

​		按需引入

​		问题：污染全局环境

​	babel-runtime

​		解决污染全局环境问题