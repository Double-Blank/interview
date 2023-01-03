## Promise
![An image](http://qn.aixshi.top/blog/test.jpg)

### 手写 Promise
1.首先定义 Promise 的三个状态
```javascript
var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
```
2.我们再来搞定 Promise 的构造函数

创建 Promise 时需要传入 execute 回调函数，接收两个参数，这两个参数分别用来兑现和拒绝当前 Promise。

所以我们需要定义 resolve() 和 reject() 函数。

初始状态为 PENDING，在执行时可能会有返回值 value，在拒绝时会有拒绝原因 reason。

同时需要注意，Promise 内部的异常不能直接抛出，需要进行异常捕获。
```javascript
function Promise(execute) {
    var that = this;
    that.state = PENDING;
    function resolve(value) {
        if (that.state === PENDING) {
            that.state = FULFILLED;
            that.value = value;
        }
    }
    function reject(reason) {
        if (that.state === PENDING) {
            that.state = REJECTED;
            that.reason = reason;
        }
    }
    try {
        execute(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
```
3.实现 then() 方法

then 方法用来注册当前 Promise 状态落定后的回调，每个 Promise 实例都需要有它，显然要写到 Promise 的原型 prototype 上，并且 then() 函数接收两个回调函数作为参数，分别是 onFulfilled 和 onRejected。
```javascript
Promise.prototype.then = function(onFulfilled, onRejected) {}
onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(x) { return x; }
onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e; }
```
根据第 3 条规则，需要使用 setTimeout 延迟执行，模拟异步。

根据第 4 条、第 5 条规则，需要根据 Promise 的状态来执行对应的回调函数。

在 PENDING 状态时，需要等到状态落定才能调用。我们可以将 onFulfilled 和 onRejected 函数存到 Promise 的属性 onFulfilledFn 和 onRejectedFn 中，

当状态改变时分别调用它们。

```javascript
var that = this;
var promise;
if (that.state === FULFILLED) {
    setTimeout(function() {
        onFulfilled(that.value);
    });
}
if (that.state === REJECTED) {
    setTimeout(function() {
        onRejected(that.reason);
    });
}
if (that.state === PENDING) {
     that.onFulfilledFn = function() {
        onFulfilled(that.value);
    }
    that.onRejectedFn = function() {
        onRejected(that.reason);
    }
}
```
根据第 6 条规则，then 函数的返回值为 Promise，我们分别给每个逻辑添加并返回一个 Promise。

同时，then 支持链式调用，我们需要将 onFulfilledFn 和 onRejectedFn 改成数组。

```javascript
var that = this;
var promise;
if (that.state === FULFILLED) {
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            try {
                onFulfilled(that.value);
            } catch (reason) {
                reject(reason);
            }
        });
    });
}
if (that.state === REJECTED) {
    promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            try {
                onRejected(that.reason);
            } catch (reason) {
                reject(reason);
            }
        });
    });
}
if (that.state === PENDING) {
    promise = new Promise(function(resolve, reject) {
        that.onFulfilledFn.push(function() {
            try {
                onFulfilled(that.value);
            } catch (reason) {
                reject(reason);
            }
        })
        that.onRejectedFn.push(function() {
            try {
                onRejected(that.reason);
            } catch (reason) {
                reject(reason);
            }
        });
    });
}
```

### all
```javascript
function pAll(promises) {
  return new Promise((resolve, reject) => {
    // 对传参进行转化为数组的处理
    const promise = Array.from(promises)
    const res = []
    const len = promise.length
    let count = 0
    for (let i = 0; i < len; i++) {
      // Promise.resolve 确保把所有数据都转化为 Promise
      Promise.resolve(promise[i]).then(obj => {
        res[i] = obj // 使用push顺序会出问题，因为 promise 是异步的，保持数组一一对应
        if (++count === len) {
          resolve(res)
        }
      }).catch(e => reject(e))
    }
  }) 
}

// 测试并行
const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(() => resolve(seconds), seconds));

// pAll([1, 2, 3]).then(res => console.log(res))
// pAll([sleep(3000), new Promise((resove, reject) => reject),sleep(2000), sleep(1000)]).then((o) => console.log(o));

async function test() {
  await sleep(1000)
  console.log('1')
  await sleep(1000)
  console.log('2')
}

test()
```
### promise实例数组中所有元素执行一遍
```javascript
let P1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve("p1 data")
	}, 500)
})
 
let P2 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve("p2 data")
	}, 500)
})
 
Promise.all([P1, P2]).then(function (results) {
	console.log(results) // ["p1 data", ""p2 data""]
```

如果有一个Promise 里面出错了执行了 reject ，如下代码，那么results 就拿不到数据了，这个时候的做法有两种

```javascript
var P1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		// resolve('')
		reject("p1 出错")
	}, 500)
})
```
一、可以给 P1.catch((error) => { ... })，让P1的错误自己处理。

二、也可以在每一个Promise 都不执行 reject()。

```javascript
// promise any
Promise.any = function(promises) {
  const result = []
  return Promise.all(promises.map(promise => {
    // 控制Promise.all处理的所有的promise都执行reslove决议
    return Promise.resolve(promise).then(res => {
      // 但是只记录实际上决议为resolve的结果值
      result.push(res)
    }, () => {
      // 防止穿透，这里可以进行拒绝信息的返回
    }) 
  })).then(() => {
    return new Promise((resolve, reject) => {
      if (result.length > 0) resolve(result)
      else reject(result)
    })
  })
}
```
### Promise.race
返回这一组中最先解决(fulfilled)或拒绝(rejected)的 Promise 实例的返回值。
```javascript
Promise.race = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    if (length === 0) {
      return resolve();
    } 

    for (let item of promiseArr) {
      Promise.resolve(item).then(function(value) {
        return resolve(value);
      }, function(reason) {
        return reject(reason);
      });
    }
  });
}
```
### Promise.any
只要其中包含的任何一个 Promise 实例解决(fulfilled)了，合成的 Promise 就解决(fulfilled)
```javascript
Promise.any = function(promiseArr) {
  return new Promise(function(resolve, reject) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;
    if (length === 0) {
      return resolve(result);
    } 

    for (let item of promiseArr) {
      Promise.resolve(item).then((value) => {
        return resolve(value);
      }, (reason) => {
        result[count++] = reason;
        if (count === length) {
          reject(result);
        }
      });
    }
  });
}
```

### Promise.allSettled
只有等到所有包含的每个 Promise 实例都返回结果落定时，不管是解决(fulfilled)还是拒绝(rejected)，合成的 Promise 才会结束。一旦结束，状态总是 fulfilled。

其返回的是一个对象数组，每个对象表示对应的 Promise 结果。

对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。
```javascript
Promise.allSettled = function(promiseArr) {
  return new Promise(function(resolve) {
    const length = promiseArr.length;
    const result = [];
    let count = 0;

    if (length === 0) {
      return resolve(result);
    } else {
      for (let item of promiseArr) {
        Promise.resolve(item).then((value) => {
            result[count++] = { status: 'fulfilled', value: value };
            if (count === length) {
                return resolve(result);
            }
        }, (reason) => {
            result[count++] = { status: 'rejected', reason: reason };
            if (count === length) {
                return resolve(result);
            }
        });
      }
    }
  });
}

// 使用 Promise.finally 实现
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises]
  const promiseArr = Array.from(promises)
  return new Promise(resolve => {
    const result = []
    const len = promiseArr.length;
    let count = len;
    if (len === 0) {
      return resolve(result);
    }
    for (let i = 0; i < len; i++) {
      promiseArr[i].then((value) => {
        result[i] = { status: 'fulfilled', value: value };
      }, (reason) => {
        result[i] = { status: 'rejected', reason: reason };
      }).finally(() => { 
        if (!--count) {
          resolve(result);
        }
      });
    }
  });
}

// 使用 Promise.all 实现
Promise.allSettled = function(promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises]
  const promiseArr = Array.from(promises)
  return Promise.all(promiseArr.map(p => Promise.resolve(p).then(res => {
    return { status: 'fulfilled', value: res }
  }, error => {
    return { status: 'rejected', reason: error }
  })));
};

```

### promise retry 一直执行
```javascript
// 异步函数
fuction fn() {
  return new Promise((reslove, reject) => {
    // 模拟异步
    setTimeout(() => {
      // reslove()
      reject
    }, 1000)
  })
}

// retry
Promise.retry = (fn, times) => {
  new Promise(async (reslove, reject) => {
    while(times--) {
      try {
        // Promise对象，有可能会阻塞后面的代码，async 函数调用不会造成阻塞
        const res = await fn()
        console.log('执行成功', res)
        resolve(res)
        break;
      } catch(error) {
        console.log('执行失败一次', error)
        if (!times) {
          reject(error)
        }
      }
    }
  }).catch(() => {
    console.log('全部次数尝试完成')
  })
}

```

```javascript
function getData(){
let p = new Promise(function(resolve, reject){
  setTimeout(function(){
    var num = Math.ceil(Math.random()*20); //生成1-10的随机数
    console.log('随机数生成的值：',num)
    if(num<=10){
              console.log('符合条件，值为'+num)
              resolve(num);
    }
    else{
      reject('数字大于10了执行失败');
    }
  }, 2000);
    })
    return p
}

function myGetData(getData, times, delay) {
    return new Promise(function(resolve, reject) {
       function attempt () {
        getData().then(resolve).catch(function(erro) {
        console.log(`还有 ${times} 次尝试`)
          if (0 == times) {
            reject(erro)
          } else {
            times--
            setTimeout(attempt(), delay)
          }
        })
      }
       attempt()
    })
  }
```

### Promise.first
（1.）最短时间内找出（2.）响应速度最快且（3.）成功的接口。
```
const urls = [
    'https://www.toutiao.com/a',
    'https://www.toutiao.com/b',
    'https://www.toutiao.com/bb',
    'https://www.toutiao.com/d',
    'https://www.toutiao.com/e',
]
findFatest(urls).then(url => console.log(url)
```
```javascript
Promise.first = function(promises) {
  return new Promise((resolve, reject) => {
    let rejectNum = 0
    promises.forEach(promise => {
      // 如果当前 promise 决议为reslove，那就直接执行"根promise"的resolve
      // 否则去记录到拒绝的promise中，然后判断全部的promise拒绝了，执行"根promise"的reject
      Promise.resolve(promise).then(resolve, () => {
        if (++rejectNum === promises.length) {
          // 这里可以控制reject返回的信息
          reject()
        }
      })
    })
  })
}
```

### promise.all处理并行
```javascript
this.showLoading()
const todosPromise = this.getTodos()
const commentsPromise = this.getComments()
const albumsPromise = this.getAlbumsPromise()

Promise.all([].then(res => {
  console.log('res', res)
  this.hideLoading()
}))
```
### promise加载图片
```javascript
fuction loadImage(src){
  const promise = new Promise((resolve, reject) => {
    const img = doucument.createElement('img')
    img.onload = fuction() {
      reslove(img)
    }
    img.onerror = fuction() {
      const error = new Error(`图片加载失败，url为: ${src}`)
      reject(error)
    }
    img.src = src
  })

  return promise
}

const url1 = 'http://asdf.adf.addf'
loadImage(url1).then(img => {
  console.log('img', img)
}).catch(e => {
  console.log('error', e)
})
```
