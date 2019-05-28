/**
 * nextTick setImmediate 区别和联系
 * nextTick 把回调函数放在当前执行栈的底部
 * setImmediate 把回调函数放在事件队列的尾部, 不会阻塞当前执行栈
 */
function read() {
  // 0 1 2 3
  setImmediate(function() {
    process.nextTick(function() {
      console.log(1)
      process.nextTick(function() {
        console.log(2)
        process.nextTick(function() {
          console.log(3)
        })
      })
    })
    setImmediate(function() {
      console.log(5)
    })
    setTimeout(function() {
      console.log(6)
    })
  })
  process.nextTick(function() {
    console.log(0)
  })
}

read() // 0 1 2 3 5
