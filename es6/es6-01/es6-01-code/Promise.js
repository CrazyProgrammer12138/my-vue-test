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
        if (value instanceof Promise){
            return value.then(resolve,reject)
        }
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

function resolvePromise(promise2,x,resolve,reject){
    let then;
    if (promise2 === x){
        // 如果x就是promise2
        return reject(new TypeError('循环引用'))
    }
    if(x instanceof Promise){
        if (x.status == 'pending'){
            x.then(function (y) {
                resolvePromise(promise2, y, resolve, reject)
            }, reject)
        }else if (x.status == 'fulfilled') {
            resolve(x.value)
        }else if (x.status == 'rejected'){
            reject(x.value)
        }
    } else if (x!=null && (typeof x == 'object' || typeof x == 'function')){

        try {
            then = x.then;
            if (typeof then == 'function'){
                then.call(x,function (y) {
                    resolvePromise(promise2,y,resolve,reject)
                }, function (y) {
                    reject(y)
                })
            }
        } catch (e) {
            reject(e)
        }
    }else{
        resolve(x);
    }
}

// onFulfilled: 成功回调
// onReject: 失败回调
Promise.prototype.then = function(onFulfilled, onReject){
    onFulfilled = typeof onFulfilled=='function'?onFulfilled:function(value){
        return value;
    }
    onReject = typeof onReject=='function'?onReject:function(reason){
        throw reason;
    }
    let that = this;
    let promise2;
    // 对应的状态，对应不同的事件执行
    if (that.status == 'fulfilled'){
        promise2 = new Promise(function (resolve, reject) {
            let x = onFulfilled(that.value)
            // resolve(x)
            resolvePromise(promise2,x,resolve,reject);
        })
        // onFulfilled(that.value);
    }
    if (that.status == 'rejected'){
        promise2 = new Promise(function (resolve, reject) {
            let x = onReject(that.value)
            // resolve(x)
            resolvePromise(promise2,x,resolve,reject);
        })
        // onReject(that.value);
    }
    if (that.status == 'pending'){
        promise2 = new Promise(function (resolve, reject) {
            that.onResolvedCallbacks.push(function () {
                let x = onFulfilled(that.value)
                // resolve(x)
                resolvePromise(promise2,x,resolve,reject);
            })

            that.onRejectedCallbacks.push(function () {
                let x = onReject(that.value);
                // resolve(x)
                resolvePromise(promise2,x,resolve,reject);
            })
        })

        // that.onResolvedCallbacks.push(onFulfilled);
        // that.onRejectedCallbacks.push(onReject);
    }
    return promise2;
}
module.exports = Promise;
