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
      [token] : callback
    }
  }
  return token
}

pubSub.publish = function (channel, data) {
  if (this.callbacks[channel]) {
    Object.values(this.callbacks[channel]).forEach(callback => {
      callback(data)
    });
  }
}

pubSub.unsubscribe = function (flag) {
  if (!flag) this.callbacks = {}
  else if (typeof flag === 'string') {
    if (flag.includes('token_')) {
      let deleteFlag = Object.values(this.callbacks[channel]).find((obj) => {
        obj.hasOwnProperty(flag)
      })
      if (deleteFlag) delete deleteFlag
    } else {
      delete this.callbacks[flag]
    }
  } 
}

const test1 = pubSub.subscribe('buy', (data) => console.log('buy',data))
const test2 = pubSub.subscribe('give', (data) => console.log('give',data))
pubSub.unsubscribe('buy')
pubSub.publish('buy', {tao_id: 15})
pubSub.publish('give', {tao_id: 15})