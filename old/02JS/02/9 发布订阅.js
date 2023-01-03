// 发布订阅
const PubSub = {
  id: 1,
  callbacks: {}
}
// 订阅
PubSub.subscribe = function (channel, callback) {
  let token = "token_" + this.id++
  if (this.callbacks[channel]) {
    this.callbacks[channel][token] = callback;
  } else {
    this.callbacks[channel] = {
      [token]: callback,
    }
  }
  return token
}
// 发布
PubSub.publish = function (channel, data) {
  if (this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach((callback) =>
      callback(data)
    )
  }
}
// 取消
PubSub.unsubscribe = function (flag) {
  if (!flag) {
    this.callbacks = {};
  } else if (typeof flag === "string") {
    if (flag.includes("token_")) {
      const callbackobj = Object.values(this.callbacks).find((obj) => {
        return obj.hasOwnProperty(flag)
      })
      if (callbackobj) {
        delete callbackobj[flag];
      }
    } else {
      delete this.callbacks[flag];
    }
  }
}

const id1 = PubSub.subscribe("pay", (data) => {
  console.log("商家接收到了订单", data);
});
const id2 = PubSub.subscribe("pay", (data) => {
  console.log("骑手接收到了订单", data);
})
const id3 = PubSub.subscribe("cancel", (data) => {
  console.log("买家取消了订单", data);
})
PubSub.publish("pay", {
  title: "鱼香肉丝",
  price: 20,
  address: "xxx",
})
PubSub.publish("cancel", {
  title: "鱼香肉丝",
  price: 20,
  address: "xxx",
})













const pubSub = {
  id: 1,
  callbacks: {}
}

pubSub.subscribe = function (channel, callback) {
  let token = 'token_' + this.id++
  if (this.callbacks[channel]) {
    this.callbacks[channel][token] = callback
  } else {
    this.callbacks[channel] = {
      [token]: callback
    }
  }
  return token
}
pubSub.publish = function (channel, data) {
  if (this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach(callback => callback(data))
  }
}
pubSub.unsubscribe = function (flag) {
  if (!flag) {
    this.callbacks = {}
  } else if (typeof flag === 'string') {
    if (flag.includes('token_')) {
      const callbackobj = Object.values(this.callbacks).find(obj => obj.hasOwnProperty(flag))
      if (callbackobj) {
        delete callbackobj[flag]
      } 
    } else {
      delete this.callbacks[flag]
    }
  }
}

const test1 = pubSub.subscribe('pay', (data) => {
  console.log('买家支付了订单',data)
})
const test2 = pubSub.subscribe('pay', (data) => {
  console.log('卖家收到了订单',data)
})
const test3 = pubSub.subscribe('cannel', (data) => {
  console.log('买家取消了订单',data)
})
pubSub.unsubscribe(null)
pubSub.publish('pay', {
  food: '北京烤鸭',
  money: 35
})
pubSub.publish('cannel', {
  food: '北京烤鸭',
  money: 35
})