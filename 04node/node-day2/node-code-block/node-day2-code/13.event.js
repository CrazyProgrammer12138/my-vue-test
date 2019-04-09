// node发布订阅

let EventEmitter = require('events')
let {inherits} = require('util')
function Girl(){

}
let girl = new Girl()
inherits(Girl, EventEmitter)
// once 只触发一次
girl.once('失恋', function (param) { // 订阅
    console.log('哭', param)
})
girl.on('失恋', function (param) { // 订阅
    console.log('吃', param)
})
girl.emit('失恋', '我') // 发布
