CommonJs和AMD，前者是针对服务端的js，也就是nodejs，后者是针对浏览器的。

1、两者的模块导入导出语法不同：commonjs是module.exports，exports导出，require导入；ES6则是export导出，import导入。

2、commonjs是运行时加载模块，ES6是在静态编译期间就确定模块的依赖。

3、ES6在编译期间会将所有import提升到顶部，commonjs不会提升require。

4、commonjs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ES6是导出的一个引用，内部修改可以同步到外部。

5、两者的循环导入的实现原理不同，commonjs是当模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

6、commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined。

7、CommonJs 是单个值导出，ES6 Module可以导出多个

8、然后就是commonjs中的一些顶层变量在ES6中不再存在：

arguments
require
module
exports
__filename