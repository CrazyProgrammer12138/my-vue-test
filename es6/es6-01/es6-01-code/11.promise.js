/*
 * 场景：ajax循环回调
 */
/*
 * Promise是一个类，可以创建实例
 * 代表承诺：什么时候会用到承诺，一般是异步任务，就是需要很长时间执行的
 * executor: 执行函数
 * handler: 处理函数
 */
let Promise = require('./Promise')
let p = new Promise(function (resolve, reject) {
    // setTimeout(function () {
        let num = Math.random();
        if (num>0.5){
            resolve('big')
        } else {
            reject('small')
        }
    // }, 2000)
})

p.then(function (value) {
    console.log(value)
}, function (reason) {
    console.log(reason)
})
/**
 * 成功回调后的值会被用来resolve当前的promise
 * 场景：
 * 成功的回调里有返回了一个新的promise
 * 成功的回调里面返回的promise还不是我自己写的promise
 * 如果成功的回调里面返回一个promise，那么promise2要以promise的resolve结果来resolve自己
 */
