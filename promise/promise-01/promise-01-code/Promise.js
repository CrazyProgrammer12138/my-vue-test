const PENDING = 'pending' //初始态
const FULFILLED = 'fulfilled' //成功状态
const REJECTED = 'rejected' // 失败状态
function Promise(exector) {
  let self = this // 先缓存当前promise实例
  self.status = PENDING // 设置状态
  self.value = undefined
  // 定义存放成功回调的数组
  self.onResolvedCallbacks = []
  // 定义存放失败回调的数组
  self.onRejectedCallbacks = []
  //当调用此方法的时候，如果promise状态为pending的话可以转成成功状态，如果
  // 已经是成功状态或者失败状态，则什么都不做
  function resolve(value) {
    //2.1.1
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() {
      // 如果是初始态转成成功态
      if (self.status == PENDING) {
        self.status = FULFILLED
        // 成功后会得到一个值，这个值不能改
        self.value = value
        // 调用所有成功之后的回调
        self.onResolvedCallbacks.forEach(item => item(self.value))
      }
    })
  }

  function reject(reason) {
    // 2.1.3
    setTimeout(function() {
      // 如果是初始态转成失败态
      if (self.status == PENDING) {
        self.status = REJECTED
        self.value = reason
        // 调用失败回调
        self.onRejectedCallbacks.forEach(item => item(self.value))
      }
    })
  }
  //
  try {
    // 因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误对象reject
    exector(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  let called = false // promise2是否已经resolve或者reject
  if (x instanceof Promise) {
    if (x.status == PENDING) {
      x.then(function(y) {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    // x 是一个thenable对象函数，只要有then方法的对象
  } else if (x != null && (typeof x == 'object' || typeof x == 'function')) {
    // 当我们的promise和别人的promise进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写
    try {
      let then = x.then
      if (typeof then == 'function') {
        // 有些时候promise会同事执行成功和失败得回调
        then.call(
          x,
          function(y) {
            if (called) return
            called = true
            // 接着解析，知道x或者y是个普通值得时候
            resolvePromise(promise2, y, resolve, reject)
          },
          function(err) {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        // 到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    //如果x是一个普通的值，则用x的值去resolve promise2
    resolve(x)
  }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  let promise2
  // 如果成功和失败的回调没有传值，则表示这个then没有任何逻辑，只会把值往后抛
  onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : value => value
  onRejected =
    typeof onRejected == 'function'
      ? onRejected
      : reason => {
          throw reason
        }
  if (self.status == FULFILLED) {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (self.status == REJECTED) {
    return (promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          let x = onRejected(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
  if (self.status == PENDING) {
    return (promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallbacks.push(function() {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      self.onRejectedCallbacks.push(function() {
        try {
          let x = onRejected(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }))
  }
}
// catch原理就是只传失败得回调
Promise.prototype.catch = function(onRejected) {
  this.then(null, onRejected)
}
// defer
Promise.deferred = Promise.defer = function() {
  let defer = {}
  defer.promise = new Promise(function(resolve, reject) {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}
function gen(times, cb) {
  let result = [],
    count = 0
  return function(i, data) {
    result[i] = data
    if (++count == times) {
      cb(result)
    }
  }
}
// all:
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let done = gen(promises.length, resolve)
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function(data) {
        done(i, data)
      }, reject)
    }
  })
}
//race
Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
// resolve
Promise.resolve = function(value) {
  return new Promise(function(resolve) {
    resolve(value)
  })
}
// reject
Promise.reject = function(reason) {
  return new Promise(function(reject) {
    reject(reason)
  })
}
module.exports = Promise
