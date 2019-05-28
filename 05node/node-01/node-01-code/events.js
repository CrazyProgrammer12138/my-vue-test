function EventEmitter() {
  this.events = {} // 会把所有的事件监听函数放在这个对象里保存
  // 给一个事件类型增加的函数数量最多有多少个
  this._maxListeners = 10
}

EventEmitter.prototype.setMaxListeners = function(_maxListeners) {
  this._maxListeners = _maxListeners
}
// 给指定的事件绑定事件处理函数，1参数是事件姓名 2参数事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(
  type,
  listener
) {
  // 如果this.events 没有添加过此事件的监听函数， 则赋值一个数组
  if (this.events[type]) {
    this.events[type].push(listener)
    if (
      this._maxListeners != 0 &&
      this.events[type].length > this._maxListeners
    ) {
      console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${
        this.events[type].length
      } ${type}
      listeners added Use emitter.setMaxListeners() to increase limit`)
    }
  } else {
    this.events[type] = [listener]
  }
}
// 发射函数，让所有指定的事件的监听函数执行，1参数是事件
EventEmitter.prototype.emit = function(type, ...args) {
  this.events[type] &&
    this.events[type].forEach(lister => {
      lister.apply(this, args)
    })
}

// 只执行一个
EventEmitter.prototype.once = function(type, listener) {
  // 用完即焚
  let wapper = (...args) => {
    listener.apply(this, args)
    this.removeListener(type, wapper)
  }
  this.on(type, wapper)
}
// 删除指定事件的监听函数
EventEmitter.prototype.removeListener = function(type, listener) {
  if (this.events[type]) {
    this.events[type] = this.events[type].filter(l => l != listener)
  }
}
// 删除指定事件的所有监听函数
EventEmitter.prototype.removeAllListener = function(type) {
  delete this.events[type]
}
// 返回指定事件的所有事件处理函数
EventEmitter.prototype.listeners = function(event) {
  return this.events[event]
}
module.exports = EventEmitter
