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
// pAll([sleep(3000), sleep(2000), sleep(1000)]).then((o) => console.log(o));

async function test() {
  await sleep(1000)
  console.log('1')
  await sleep(1000)
  console.log('2')
}

test()