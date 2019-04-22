// 构造函数的参数是一个异步任务
function Promise(task) {
    let that = this; // 缓存this
    // 默认装填为pending
    that.status = 'pending';
    // 此变量里放着此promise的结果
    that.value = undefined;
    // 存放的着所有成功的回调函数
    that.onResolvedCallbacks = [];
    // 存放的着所有成功的失败函数
    that.onRejectedCallbacks = [];
    // 调用此方法可以把promise变成成功态
    function resolve(value) {
        // 如果当前状态是初始态，则转成失败态
        if (that.status == 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach((item)=>item(value));
        }
    }
    // 调用此方法可以把promise变成失败态
    // resolved的时候把成功的值传进来
    function reject(reason) {
        if (that.status == 'pending') {
            that.status = 'rejected';
            that.value = reason;
            that.onRejectedCallbacks.forEach((item)=>item(reason));
        }
    }

    try {
        // 立刻执行传入的任务
        task(resolve, reject);
    } catch (e) {
        reject(e)
    }
}
// onFullfiled: 成功回调
// onReject: 失败回调
Promise.prototype.then = function(onFullfiled, onReject){
    let that = this;
    that.onResolvedCallbacks.push(onFullfiled)
    that.onRejectedCallbacks.push(onReject)
}
module.exports = Promise;