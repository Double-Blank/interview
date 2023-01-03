## webpack

打包工具，当 webpack处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限js文件），并生成一个或多个 bundle

Webpack 最初的目标是实现前端项目的模块化，旨在更高效地管理和维护项目中的每一个资源

### webpack的构建流程

- 初始化流程：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
- 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

初始化流程

从配置文件和 Shell 语句中读取与合并参数，得出最终的参数

配置文件默认下为webpack.config.js，也或者通过命令的形式指定配置文件，主要作用是用于激活webpack的加载项和插件

关于文件配置内容分析，如下注释：

```javascript
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。
  entry: './path/to/my/entry/file.js'，
  // 文件路径指向(可加快打包过程)。
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  // 生成文件，是模块构建的终点，包括输出文件与输出路径。
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  // 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    noParse: [pathToReact]
  },
  // webpack 各插件对象，在 webpack 的事件流中执行对应的方法。
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置的 plugins

完成上述步骤之后，则开始初始化Compiler编译对象，该对象掌控者webpack声明周期，不执行具体的任务，只是进行一些调度工作

```javascript
class Compiler extends Tapable {
    constructor(context) {
        super();
        this.hooks = {
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),
            make: new AsyncParallelHook(["compilation"]),
            entryOption: new SyncBailHook(["context", "entry"])
            // 定义了很多不同类型的钩子
        };
        // ...
    }
}

function webpack(options) {
  var compiler = new Compiler();
  ...// 检查options,若watch字段为true,则开启watch线程
  return compiler;
}
...
```
Compiler 对象继承自 Tapable，初始化时定义了很多钩子函数

编译构建流程

根据配置中的 entry 找出所有的入口文件
```
module.exports = {
  entry: './src/file.js'
}

初始化完成后会调用Compiler的run来真正启动webpack编译构建流程，主要流程如下：

compile 开始编译
make 从入口点分析模块及其依赖的模块，创建这些模块对象
build-module 构建模块
seal 封装构建结果
emit 把各个chunk输出到结果文件
```

compile 编译

执行了run方法后，首先会触发compile，主要是构建一个Compilation对象

该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象

make 编译模块

当完成了上述的compilation对象后，就开始从Entry入口文件开始读取，主要执行_addModuleChain()函数，如下：

```
_addModuleChain(context, dependency, onModule, callback) {
   ...
   // 根据依赖查找对应的工厂函数
   const Dep = /** @type {DepConstructor} */ (dependency.constructor);
   const moduleFactory = this.dependencyFactories.get(Dep);
   
   // 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象
   moduleFactory.create({
       dependencies: [dependency]
       ...
   }, (err, module) => {
       ...
       const afterBuild = () => {
        this.processModuleDependencies(module, err => {
         if (err) return callback(err);
         callback(null, module);
           });
    };
       
       this.buildModule(module, false, null, null, err => {
           ...
           afterBuild();
       })
   })
}

_addModuleChain中接收参数dependency传入的入口依赖，使用对应的工厂函数NormalModuleFactory.create方法生成一个空的module对象

回调中会把此module存入compilation.modules对象和dependencies.module对象中，由于是入口文件，也会存入compilation.entries中

随后执行buildModule进入真正的构建模块module内容的过程
```

build module 完成模块编译

这里主要调用配置的loaders，将我们的模块转成标准的JS模块

在用Loader 对一个模块转换完后，使用 acorn 解析转换后的内容，输出对应的抽象语法树（AST），以方便 Webpack后面对代码的分析

从配置的入口模块开始，分析其 AST，当遇到require等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系

输出流程

seal 输出资源
seal方法主要是要生成chunks，对chunks进行一系列的优化操作，并生成要输出的代码

webpack 中的 chunk ，可以理解为配置在 entry 中的模块，或者是动态引入的模块

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表

emit 输出完成
在确定好输出内容后，根据配置确定输出的路径和文件名

```
output: {
    path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
}
```

在 Compiler 开始生成文件前，钩子 emit 会被执行，这是我们修改最终文件的最后一个机会

从而webpack整个打包过程则结束了


### 说说webpack中常见的Loader

loader 用于对模块的"源代码"进行转换，在 import 或"加载"模块时预处理文件

#### 是什么

在webpack内部中，任何文件都是模块，不仅仅只是js文件

默认情况下，在遇到import或者require加载模块的时候，webpack只支持对js 和 json 文件打包

像css、sass、png等这些类型的文件的时候，webpack则无能为力，这时候就需要配置对应的loader进行文件内容的解析

在加载模块的时候，执行顺序如下：

entry -> loaders -> output


关于loader的配置，我们是写在module.rules属性中，属性介绍如下：

```javascript
rules是一个数组的形式，因此我们可以配置很多个loader

每一个loader对应一个对象的形式，对象属性test 为匹配的规则，一般情况为正则表达式

属性use针对匹配到文件类型，调用对应的 loader 进行处理

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```
#### 特性

这里继续拿上述代码，来讲讲loader的特性

从上述代码可以看到，在处理css模块的时候，use属性中配置了三个loader分别处理css文件

因为loader支持链式调用，链中的每个loader会处理之前已处理过的资源，最终变为js代码。顺序为相反的顺序执行，即上述执行方式为sass-loader、css-loader、style-loader

除此之外，loader的特性还有如下：

loader 可以是同步的，也可以是异步的

loader 运行在 Node.js 中，并且能够执行任何操作

除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块

插件(plugin)可以为 loader 带来更多特性

loader 能够产生额外的任意文件

可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和更多其他特性

#### 常见的loader

在页面开发过程中，我们经常性加载除了js文件以外的内容，这时候我们就需要配置响应的loader进行加载

常见的loader如下：
```
style-loader: 将css添加到DOM的内联样式标签style里
css-loader :允许将css文件通过require的方式引入，并返回css代码
less-loader: 处理less
sass-loader: 处理sass
postcss-loader: 用postcss来处理CSS
autoprefixer-loader: 处理CSS3属性前缀，已被弃用，建议直接使用postcss
file-loader: 分发文件到output目录并返回相对路径
url-loader: 和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url
html-minify-loader: 压缩HTML
babel-loader :用babel来转换ES6文件到ES
```

### 说说webpack中常见的Plugin
目的在于解决loader 无法实现的其他事

plugin赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 webpack 的不同阶段（钩子 / 生命周期），贯穿了webpack整个编译周期
#### 常见的Plugin

![](https://static.vue-js.com/bd749400-a7c2-11eb-85f6-6fac77c0c9b3.png
)

### 说说Loader和Plugin的区别

在Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的 API改变输出结果

对于loader，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

### 编写loader
在编写 loader 前，我们首先需要了解 loader 的本质

其本质为函数，函数中的 this 作为上下文会被 webpack 填充，因此我们不能将 loader设为一个箭头函数

函数接受一个参数，为 webpack 传递给 loader 的文件源内容

函数中 this 是由 webpack 提供的对象，能够获取当前 loader 所需要的各种信息

函数中有异步操作或同步操作，异步操作通过 this.callback 返回，返回值要求为 string 或者 Buffer

### 编写plugin
由于webpack基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务

在之前也了解过，webpack编译会创建两个核心对象：

compiler：包含了 webpack 环境的所有的配置信息，包括 options，loader 和 plugin，和 webpack 整个生命周期相关的钩子
compilation：作为 plugin 内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 Compilation 将被创建
如果自己要实现plugin，也需要遵循一定的规范：

插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问compiler实例
传给每个插件的 compiler 和 compilation 对象都是同一个引用，因此不建议修改
异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住
实现plugin的模板如下：

```
class MyPlugin {
    // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation: 当前打包构建流程的上下文
        console.log(compilation);
        
        // do something...
    })
  }
}
```

### 说说如何借助webpack来优化前端 🧨🎇🧨

```
不要让loader做太多的事情，以 babel-loader 为例 ，⽤ include 或 exclude 来帮我们避免不必要的转译

要放过多的第三库，⼀些情况下会引发重复打包的问题，可以使用 DllPlugin

Tree Shaking 删除冗余代码

按需加载：打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，
还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。
把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

开启gzip

代码分离
内联 chunk
JS代码压缩
CSS代码压缩
Html文件代码压缩
文件大小压缩
图片压缩
```
### webpack的作用是什么，谈谈你对它的理解？

现在的前端网页功能丰富，特别是SPA（single page web application 单页应用）技术流行后，JavaScript的复杂度增加和需要一大堆依赖包，还需要解决Scss，Less……新增样式的扩展写法的编译工作。

所以现代化的前端已经完全依赖于webpack的辅助了。

现在最流行的三个前端框架，可以说和webpack已经紧密相连，框架官方都推出了和自身框架依赖的webpack构建工具。

react.js+WebPack

vue.js+WebPack

AngluarJS+WebPack

### webpack的工作原理?

WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

### webpack打包原理

把一切都视为模块：不管是 css、JS、Image 还是 html 都可以互相引用，通过定义 entry.js，对所有依赖的文件进行跟踪，将各个模块通过 loader 和 plugins 处理，然后打包在一起。

按需加载：打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

### webpack的核心概念

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。告诉webpack要使用哪个模块作为构建项目的起点，默认为./src/index.js
output ：出口，告诉webpack在哪里输出它打包好的代码以及如何命名，默认为./dist
Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。
### Webpack的基本功能有哪些？

代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等
文件优化：压缩 JavaScript、CSS、html 代码，压缩合并图片等
代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
自动刷新：监听本地源代码的变化，自动构建，刷新浏览器
代码校验：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
### gulp/grunt 与 webpack的区别是什么?

三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。grunt和gulp是基于任务和流（Task、Stream）的。

类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。webpack是基于入口的。

webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

### webpack是解决什么问题而生的?

如果像以前开发时一个html文件可能会引用十几个js文件,而且顺序还不能乱，因为它们存在依赖关系，同时对于ES6+等新的语法，less, sass等CSS预处理都不能很好的解决……，此时就需要一个处理这些问题的工具。

### 你是如何提高webpack构件速度的?

多入口情况下，使用CommonsChunkPlugin来提取公共代码

通过externals配置来提取常用库

利用DllPlugin和DllReferencePlugin预编译资源模块通过DllPlugin来对那些我们

引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

使用Happypack 实现多线程加速编译

使用webpack-uglify-paralle来提升uglifyPlugin的压缩速度。

原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度使用Tree-shaking和Scope Hoisting来剔除多余代码

### npm打包时需要注意哪些？如何利用webpack来更好的构建？

Npm是目前最大的 JavaScript 模块仓库，里面有来自全世界开发者上传的可复用模块。

你可能只是JS模块的使用者，但是有些情况你也会去选择上传自己开发的模块。

关于NPM模块上传的方法可以去官网上进行学习，这里只讲解如何利用webpack来构建。

NPM模块需要注意以下问题：

要支持CommonJS模块化规范，所以要求打包后的最后结果也遵守该规则。
Npm模块使用者的环境是不确定的，很有可能并不支持ES6，所以打包的最后结果应该是采用ES5编写的。并且如果ES5是经过转换的，请最好连同SourceMap一同上传。
Npm包大小应该是尽量小（有些仓库会限制包大小）
发布的模块不能将依赖的模块也一同打包，应该让用户选择性的去自行安装。这样可以避免模块应用者再次打包时出现底层模块被重复打包的情况。
UI组件类的模块应该将依赖的其它资源文件，例如.css文件也需要包含在发布的模块里。
### 前端为什么要进行打包和构建？

代码层面：

体积更小（Tree-shaking、压缩、合并），加载更快
编译高级语言和语法（TS、ES### 模块化、scss）
兼容性和错误检查（polyfill,postcss,eslint）
研发流程层面：

统一、高效的开发环境
统一的构建流程和产出标准
集成公司构建规范（提测、上线）
### webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全。

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
确定入口：根据配置中的 entry 找出所有的入口文件；
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### 怎么配置单页应用？怎么配置多页应用？

单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可，这里不再赘述

多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。多页应用中要注意的是：

每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套css样式表
随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置
### Loader机制的作用是什么？

webpack默认只能打包js文件，配置里的module.rules数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换打包成js。

注意：

use属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如css-loader?minimize中的minimize告诉css-loader要开启 CSS 压缩。

### 常用loader

css-loader读取 合并CSS 文件style-loader把 CSS 内容注入到 JavaScript 里sass-loader 解析sass文件（安装sass-loader，node-sass）postcss-loader自动添加浏览器兼容前缀（postcss.config配置）url-loader将文件转换为base64 URI。vue-loader处理vue文件。

### Plugin（插件）的作用是什么？

Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。

Webpack 是通过plugins属性来配置需要使用的插件列表的。plugins属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

### 什么是bundle，什么是chunk，什么是module

bundle：是由webpack打包出来的文件

chunk：是指webpack在进行模块依赖分析的时候，代码分割出来的代码块

module：是开发中的单个模块

### 常见Plugins

HtmlWbpackPlugin自动在打包结束后生成html文件，并引入bundle.jscleanwebPackPlugin打包自动删除上次打包文件

### ExtractTextPlugin插件的作用

ExtractTextPlugin插件的作用是提取出 JavaScript 代码里的 CSS 到一个单独的文件。

对此你可以通过插件的filename属性，告诉插件输出的 CSS 文件名称是通过[name]_[contenthash:8].css字符串模版生成的，里面的[name]代表文件名称，[contenthash:8]代表根据文件内容算出的8位 hash 值， 还有很多配置选项可以在ExtractTextPlugin的主页上查到。

### sourceMap

是一个映射关系，将打包后的文件隐射到源代码，用于定位报错位置

配置方式:

例如：devtool：‘source-map’加不同前缀意义：

inline:不生成映射关系文件，打包进main.js
cheap: 1.只精确到行，不精确到列，打包速度快 2.只管业务代码，不管第三方模块
module：不仅管业务代码，而且管第三方代码
eval:执行效率最快，性能最好
最佳实践：开发环境：cheap-module-eval-source-map线上环境：cheap-mudole-source-map

### HMR热模块更新

借助webpack.HotModuleReplacementPlugin()，devServer开启hot

场景1：实现只刷新css，不影响js场景2：js中实现热更新，只更新指定js模块

if (module.hot) {module.hot.accept(’./library.js’, function() {// Do something with the updated library module… });}

### webpack如何配置多入口文件?

entry: {home: resolve(__dirname, "src/home/index.js"), about: resolve(__dirname, "src/about/index.js")}

用于描述入口的对象。你可以使用如下属性：

dependOn: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
filename: 指定要输出的文件名称。
import: 启动时需加载的模块。
library: 指定 library 选项，为当前 entry 构建一个 library。
runtime: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
publicPath: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址
### babel 相关: polyfill 以及 runtime 区别， ES stage 含义，preset–env 作用等等

1.polyfill 以及 runtime 区别

babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。

babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。

babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。

babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from 'babel-runtime/core-js/promise'即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

2.stage-x：指处于某一阶段的js语言提案Stage 0 - 设想（Strawman）：只是一个想法，可能有 Babel插件。Stage 1 - 建议（Proposal）：这是值得跟进的。Stage 2 - 草案（Draft）：初始规范。Stage 3 - 候选（Candidate）：完成规范并在浏览器上初步实现。Stage 4 - 完成（Finished）：将添加到下一个年度版本发布中。

3. 理解 babel-preset-envbabel-preset-es2015: 可以将es6的代码编译成es5.babel-preset-es2016: 可以将es7的代码编译为es6.babel-preset-es2017: 可以将es8的代码编译为es7.babel-preset-latest: 支持现有所有ECMAScript版本的新特性

### 什么是模热更新？有什么优点？

模块热更新是webpack的一个功能，它可以使得代码修改之后，不用刷新浏览器就可以更新。

在应用过程中替换添加删出模块，无需重新加载整个页面，是高级版的自动刷新浏览器。

优点：只更新变更内容，以节省宝贵的开发时间。调整样式更加快速，几乎相当于在浏览器中更改样式

### lazy loading（模块懒加载）

借助import()语法异步引入组件，实现文件懒加载：prefetch,preloadingwebpack提倡多写异步代码，提升代码利用率，从而提升页面性能先加载主业务文件，prefetch利用网络空闲时间，异步加载组件

import(/* webpackPrefetch: true / ‘LoginModal’);

preload和主业务文件一起加载，异步加载组件

import(/ webpackPreload: true */ ‘ChartingLibrary’);

### 什么是长缓存？在webpack中如何做到长缓存优化？

浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或者更新，都需要浏览器去下载新的代码，最方便和最简单的更新方式就是引入新的文件名称。

在webpack中，可以在output给出输出的文件制定chunkhash，并且分离经常更新的代码和框架代码，通过NameModulesPlugin或者HashedModulesPlugin使再次打包文件名不变。

### 什么是Tree-sharking?

指打包中去除那些引入了但在代码中没用到的死代码。在wepack中js treeshaking通过UglifyJsPlugin来进行，css中通过purify-CSS来进行。

### webpack-dev-server 和 http服务器的区别

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，比传统的http服务对开发更加有效。

### webpack3和webpack4的区别

mode/–mode参数，新增了mode/–mode参数来表示是开发还是生产（development/production）production 侧重于打包后的文件大小，development侧重于goujiansud移除loaders，必须使用rules（在3版本的时候loaders和rules 是共存的但是到4的时候只允许使用rules）移除了CommonsChunkPlugin (提取公共代码)，用optimization.splitChunks和optimization.runtimeChunk来代替支持es6的方式导入JSON文件，并且可以过滤无用的代码