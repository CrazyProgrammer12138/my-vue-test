/**
 * node重要的模块 events
 * 再node里面，node是基于事件驱动
 * addListener(event, listener) // 
    on() //
    once()
    removeListener()
    removeAllListener()
    setMaxListeners(n)
    listeners(event)
    emit(event, [arg1],[arg2].)
 */
let EventEmitter = require('./events')
let util = require('util')
// 进行原型继承的  继承公有
util.inherits(Bell, EventEmitter)
// 这是一个类
function Bell() {
  EventEmitter.call(this) // 继承私有属性
}
let bell = new Bell()

function studentInClassRomm(roomNumber, things) {
  console.log(`student in ${roomNumber} with ${things}`)
}
function teacherInClassRomm(roomNumber, things) {
  console.log(`teacher in ${roomNumber} with ${things}`)
}

function masterInClassRomm(roomNumber, things) {
  console.log(`onece master in ${roomNumber} with ${things}`)
}
bell.setMaxListeners(0)
bell.on('ring', teacherInClassRomm)
bell.on('ring', studentInClassRomm)
bell.once('ring', masterInClassRomm)
// console.log(bell.listeners('ring'))
// 发布订阅模式
// 发射一个 ring 事件，绑定 ring 的事件函数需要执行
// 第一个参数是事件类型， 第二个参数和以后的参数会传递给监听函数
bell.emit('ring', '301', 'book')
console.log('====================')
bell.emit('ring', '301', 'book')
