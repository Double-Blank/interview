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

1. Loader：是用于对模块的源代码进行转换的工具，它作用于 webpack 打包过程中的每一个模块，可以将各种类型的文件（比如 JavaScript、CSS、图片等）转换为 webpack 可以识别的模块。Loader 可以通过在 webpack 配置文件中进行配置来使用，多个 Loader 可以串联使用，按照从右到左的顺序进行执行。
2. Plugin：是用于在 webpack 打包过程中执行各种任务的工具，它可以监听 webpack 打包过程中的事件，并且可以在特定的阶段执行自定义的任务，比如生成 HTML 文件、压缩代码、提取 CSS 文件等。Plugin 也可以通过在 webpack 配置文件中进行配置来使用，一个 webpack 应用程序可以使用多个 Plugin，它们可以相互独立，也可以依赖于其他 Plugin。

总的来说，Loader 和 Plugin 的作用不同，Loader 用于转换模块源代码，而 Plugin 用于执行各种任务。Loader 是在 webpack 打包过程中处理模块的过程中使用的，而 Plugin 是在 webpack 打包过程中的各个阶段执行的。在编写 webpack 配置文件时，可以根据需要选择使用不同的 Loader 和 Plugin，以实现各种不同的功能。

​	loader模块转换器，如less -> css

​	plugin扩展插件，如HtmlWebpackPlugin

### babel 和 webpack 的区别

​	babel - JS 新语法编译工具，不关心模块化

```
Babel 用于编译 JavaScript 代码，以便在当前和旧版浏览器中运行
Babel 可以通过创建 .babelrc 配置文件来进行配置，也可以将配置项写入 package.json 文件中。以下是一些常见的配置选项：

presets：表示 Babel 需要使用哪些预设，预设是一组插件的集合，用于转换特定版本的 JavaScript 语法。常见的预设有 @babel/preset-env（用于转换 ES6+ 语法）、@babel/preset-react（用于转换 React JSX 语法）、@babel/preset-typescript（用于转换 TypeScript 语法）等。
{
  "presets": ["@babel/preset-env"]
}
plugins：表示 Babel 需要使用哪些插件，插件是用于转换特定语法或实现特定功能的代码。常见的插件有 @babel/plugin-transform-runtime（用于转换 ES6+ 语法和实现通用的运行时支持）、@babel/plugin-proposal-class-properties（用于转换类属性）、@babel/plugin-transform-react-jsx（用于转换 React JSX 语法）等。
{
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ]
}
exclude：表示 Babel 不需要转换哪些文件或文件夹，可以使用正则表达式来指定需要排除的文件或文件夹。
{
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ]
}
include：表示 Babel 需要转换哪些文件或文件夹，可以使用正则表达式来指定需要包含的文件或文件夹。
{
  "include": [
    "src",
    "test"
  ]
}
需要注意的是，Babel 的配置选项非常多，可以根据具体的需求进行配置。在实际应用中，可以通过查看 Babel 官方文档和社区文档，来了解和学习如何配置 Babel。
```

​	webpack - 打包构建工具，是多个loader plugin 的集合

### 如何产出lib

```json
output: {
  filename: 'lodash.js',
  path: distPath,
  library: 'lodash'
}
```

### webpack如何实现懒加载

在 webpack 中，可以使用动态 `import()` 语法实现代码的懒加载。当使用动态 `import()` 导入模块时，webpack 会将该模块打包成一个独立的文件，并在需要时进行加载。

### babel-runtime 和 babel-polyfill的区别

`babel-runtime` 是一个 Babel 运行时的库，用于提供一些 ES6+ 特性的实现。它不会污染全局作用域，而是将特性的实现封装在模块中

`babel-polyfill` 是一个用于支持浏览器中缺失的 ES6+ 特性的库。它会将一些全局变量和原型方法的实现添加到全局作用域中，以便在代码中使用

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

### 高级配置

多入口

​	build-multi-entry， -》 filename: '[name].[contentHash:8].js'

```js
module.exports = {
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[contentHash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

抽离和压缩css文件, plugin 多个实例

​	build-min-extract-css

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash:8].css'
    })
  ]
};
```

抽离公共代码

​	build-splitChunks，splitChunks

```js
为了减小文件的体积，提高加载速度和性能，可以将一些公共代码抽离出来，单独打包成一个文件
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        }
      }
    }
  }
};
```

懒加载

​	import('./dynamic').then()

处理JSX，Vue

​	babel/preset-react，vue-loader

### webpack性能优化 （build-optimization）

`build-optimization` 可能是一个命名为优化打包过程的文件夹，其中可以包含一系列的 webpack 配置文件，用于进一步优化打包过程和输出结果。

以下是一些可能存在于 `build-optimization` 文件夹中的文件：

- `webpack.prod.js`：用于生产环境的 webpack 配置文件，其中包含了一些针对生产环境的优化配置，例如代码压缩、去除注释、提取公共代码等。
- `webpack.config.js`：用于通用的 webpack 配置文件，其中包含了通用的配置，例如入口、输出、loader、plugin 等配置。
- `webpack.analyze.js`：用于分析打包后的结果，可以通过 `webpack-bundle-analyzer` 插件生成可视化图表，帮助我们更好地理解打包结果。
- `webpack.dll.js`：用于将一些稳定的依赖项预先打包成单独的文件，以便在后续的打包过程中可以直接使用。这样可以显著提高打包速度和性能。
- `webpack.hard-source.js`：用于缓存 webpack 构建过程中的中间结果，以便后续的构建过程可以直接使用缓存结果，从而提高构建速度。

这些配置文件可以帮助我们进一步优化打包过程和输出结果，提高应用程序的性能和用户体验。需要根据具体的项目需求和情况来进行配置和调整。

在实际开发中，我们可以通过在 `package.json` 文件中定义一些 scripts 来调用不同的 webpack 配置文件，例如

```json
"scripts": {
  "build": "webpack --config build-optimization/webpack.prod.js",
  "analyze": "webpack --config build-optimization/webpack.analyze.js",
  "dll": "webpack --config build-optimization/webpack.dll.js",
  "start": "webpack-dev-server --config build-optimization/webpack.config.js"
}
```

在这个示例中，我们通过 `build`、`analyze`、`dll` 和 `start` 四个脚本来分别调用生产环境、分析、预打包和开发环境的 webpack 配置文件，以便在不同的环境下使用不同的配置。

#### 优化 babel-loader

优化 `babel-loader` 可以显著提高 webpack 的构建速度。下面介绍两种优化方式：

1. 开启缓存

`babel-loader` 支持缓存已经编译过的模块，以避免重复编译。可以通过在 `babel-loader` 中配置 `cacheDirectory` 选项来开启缓存。例如：

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  }
};
```

在这个示例中，我们在 `babel-loader` 中配置了 `cacheDirectory: true`，表示开启缓存。

2. 明确范围

`babel-loader` 可以通过 `include` 和 `exclude` 选项来明确需要编译的模块范围，以避免不必要的编译。例如：

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
```

#### IgnorePlugin(不打包)

例子：moment.js多语言

`IgnorePlugin` 是 webpack 提供的一个插件，可以用来忽略某些特定的模块，以减小打包后的文件体积。它可以排除掉一些不需要打包的模块，例如 moment.js 中的语言包，从而减小打包后的文件体积。

使用 `IgnorePlugin` 需要传入一个正则表达式或者函数。所有符合该正则表达式或者函数返回 `true` 的模块都将被忽略掉。例如，我们可以使用 `IgnorePlugin` 来忽略 moment.js 中的语言包：

javascript

Copy

```
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
```

在这个示例中，我们通过 `IgnorePlugin` 来忽略了 moment.js 中的语言包。其中，`/^\.\/locale$/` 表示匹配以 `./locale` 开头的模块路径，`/moment$/` 表示匹配以 `moment` 结尾的模块路径。符合这两个条件的模块都将被忽略掉。

使用 `IgnorePlugin` 可以帮助我们减小打包后的文件体积，提高应用程序的性能和用户体验。需要根据具体的项目需求和情况来进行配置和调整。

#### noParse(引入，但不打包)

​		避免重复打包，如忽略对react.min.js

#### happyPack

​		多进程打包，提高构建速度

​		JS单线程，开启多进程打包

#### ParalleIUglifyPlguin

​		多进程压缩JS

​		（项目较小，打包很快，开启多进程会降低速度（进程开销））

#### 自动刷新

​		watch

#### 热更新

​		新代码生效，网页不刷新，状态不丢失

#### DllPlugin

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

### ES6 Module 和 Commonjs 的区别

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