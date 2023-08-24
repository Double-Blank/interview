## React

### React useMemo 和 useCallBack的区别

当需要缓存计算结果时，使用 `useMemo`；当需要缓存函数引用时，使用 `useCallback`

#### useMemo 的例子

假设我们有一个组件需要根据一个数组中的数据来渲染列表，并计算出列表中所有数据的总和。由于计算总和的过程比较耗时，我们可以使用 `useMemo` 缓存计算结果，以避免在每次渲染时都重新计算。

```jsx
import React, { useMemo } from 'react';

const List = ({ list }) => {
  const total = useMemo(() => {
    console.log('Calculating total...');
    return list.reduce((acc, item) => acc + item.value, 0);
  }, [list]);

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}: {item.value}</li>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
};
```

上述代码中，我们使用 `useMemo` 缓存了计算结果 `total`。当 `list` 数组发生变化时，会重新计算 `total`；否则，直接使用缓存的计算结果。

#### useCallback 的例子

假设我们有一个组件需要传递一个回调函数给子组件使用，并且这个回调函数需要依赖于组件中的一些状态。由于每次渲染都会创建新的函数引用，可能会导致子组件的不必要的重复渲染。我们可以使用 `useCallback` 缓存函数引用，以避免在每次渲染时都创建新的函数。

```jsx
import React, { useState, useCallback } from 'react';

const Child = ({ onIncrement }) => {
  console.log('Child render.');
  return (
    <button onClick={onIncrement}>Increment</button>
  );
};

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  console.log('Parent render.');
  return (
    <div>
      <p>Count: {count}</p>
      <Child onIncrement={handleIncrement} />
    </div>
  );
};
```

上述代码中，我们使用 `useCallback` 缓存了回调函数 `handleIncrement`。由于 `handleIncrement` 不依赖于任何状态，所以将空数组作为依赖项传递给 `useCallback`，以确保只在组件挂载时创建一次函数引用。在子组件中使用 `handleIncrement` 时，将不会触发不必要的重复渲染。

### React 原理

React 是一种用于构建用户界面的 JavaScript 库。它的核心思想是使用声明式编程模型来描述用户界面，以及使用虚拟 DOM 技术来实现高效的 DOM 更新和渲染。

React 的实现原理可以分为以下几个步骤：

1. JSX 解析：React 支持使用 JSX 语法来描述用户界面，但浏览器无法直接识别 JSX 语法，因此需要将 JSX 代码转换为普通的 JavaScript 代码。这个过程可以使用 Babel 等工具来完成。
2. 组件渲染：React 中的组件是构建用户界面的基本单元。组件可以通过继承 React.Component 类或者使用函数式组件来定义。当组件被渲染到页面上时，React 会根据组件的描述生成一个虚拟 DOM（Virtual DOM）树。
3. 虚拟 DOM 操作：虚拟 DOM 是一个轻量级的 JavaScript 对象，它描述了页面上所有的 DOM 元素和属性。当组件的状态发生变化时，React 会通过比较新旧状态生成一个新的虚拟 DOM 树，并计算出需要更新的部分。
4. DOM 更新：React 通过比较新旧虚拟 DOM 树，计算出需要更新的部分，然后只更新这些部分对应的真实 DOM 元素，从而避免了不必要的 DOM 操作，提高了页面渲染的性能。
5. 生命周期管理：React 提供了一系列生命周期方法，用于在组件被创建、更新、销毁等不同的阶段执行一些特定的操作，例如组件初始化、数据更新、事件处理等。

总的来说，React 的实现原理可以概括为：使用虚拟 DOM 技术来实现高效的 DOM 更新和渲染，通过组件化的编程模型来描述用户界面，以及使用生命周期方法来管理组件的状态和行为。

### React生命周期

在 React 中，组件的生命周期可以分为三个阶段:

1. 挂载阶段（Mounting）：组件被创建，并被添加到 DOM 中。
2. 更新阶段（Updating）：组件的状态或属性发生变化，导致组件需要重新渲染。
3. 卸载阶段（Unmounting）：组件被从 DOM 中删除，即将被销毁。

下面是 React 组件的生命周期函数：

1. **constructor(props)**：组件的构造函数，在组件创建时调用，通常用于初始化 state 和绑定方法。
2. **static getDerivedStateFromProps(props, state)**：静态方法，当组件的 props 发生变化时调用，返回一个新的 state，或者返回 null 表示不更新 state。
3. **render()**：用于生成虚拟 DOM，通常是在这里渲染组件的 HTML 结构。
4. **componentDidMount()**：组件挂载完成后调用，通常用于进行一些异步操作，比如发起网络请求、添加事件监听、设置定时器等。
5. **shouldComponentUpdate(nextProps, nextState)**：组件的 props 或 state 变化时调用，用于决定组件是否需要重新渲染，返回 true 表示需要重新渲染，返回 false 表示不需要重新渲染。
6. **getSnapshotBeforeUpdate(prevProps, prevState)**：在组件更新前调用，用于获取更新前的 DOM 信息，返回值将作为第三个参数传递给 componentDidUpdate()。
7. **componentDidUpdate(prevProps, prevState, snapshot)**：在组件更新后调用，通常用于进行一些 DOM 操作，比如获取更新后的 DOM 信息、重新计算组件的状态等。
8. **componentWillUnmount()**：在组件被卸载前调用，通常用于进行一些清理工作，比如清除定时器、取消事件监听、释放内存等。

除了以上生命周期函数外，还有一些其他函数，如：

1. **static getDerivedStateFromError(error)**：在子组件抛出错误时调用，返回一个新的 state，或者返回 null 表示不更新 state。
2. **componentDidCatch(error, info)**：在子组件抛出错误后调用，通常用于进行错误日志的记录或显示错误信息的 UI。

需要注意的是，React 17 之后，一些生命周期函数已经被标记为过时，包括 componentWillMount、componentWillReceiveProps、componentWillUpdate。在新的代码中不建议使用这些生命周期函数。

### react hooks 如何模拟组件生命周期

didmount - useEffect 依赖 []

​	didupdate - useEffect 无依赖，或依赖[a, b]

​	willUnMount - useEffect 中返回一个函数

​		用useEffect模拟生命周期，模拟didmount(使用[]可实现仅didmount时触发)和didupdate（使用依赖）

​		useEffect参数依赖[]时(return clearInterVal(timerId))模拟willUnMount（也就是组件销毁时调用）

​		useEffect参数无依赖或依赖[a, b]时, 组件更新时执行 return 方法（props发生变化也会执行return函数）

​			即下一次执行effect之前，就会执行return fn

### 如何自定义hooks

先定义state，然后设置state，最后返回

### 使用中遇到的问题

​	useEffect可能出现死循环，Object.is({}, {}), Object.is([], [])

​	useEffect依赖是[]，内部不能修改state, re-render没有执行effect函数

​		解决方式：使用useRef方式

​	useState只第一次初始化有效

### react hooks 为什么不能用if

React Hooks 的规则是在组件的顶层作用域（也就是最外层）下使用，不能在循环、条件语句或嵌套函数中使用。这是因为 React Hooks 的设计初衷是为了更好地管理组件的状态和副作用，而这些状态和副作用需要在每次组件渲染时保持一致。如果在循环或条件语句中使用 Hooks，会导致组件状态的不一致，从而引发错误。

具体来说，如果在条件语句中使用 useState Hook，那么每次条件语句判断为 true 时都会重新声明一个新的 state 变量，而不是保持之前的状态。这样做可能会导致组件状态的不一致，从而引发错误。

如果确实需要在条件语句中使用 Hook，可以将条件语句提取到一个单独的组件中，然后在该组件中使用 Hook，这样可以避免状态不一致的问题。

