function Promise(task) {
    let that = this;
    that.status = 'pending';
    that.onResolvedCallbacks = [];
    that.onRejectedCallbacks = [];
    that.value = undefined;
    function resolve(value){
        if (that.status == 'pending'){
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach(item=>item(that.value))
        }
    }
    function reject(reason){
        if (that.status == 'pending'){
            that.status = 'reject';
            that.value = reason;
            that.onRejectedCallbacks.forEach(item=>item(that.value))
        }
    }
    try {
        task(resolve, reject);
    } catch (e) {
        reject(e)
    }
}
Promise.prototype.then = function (onFulfilled, onRejected){
    let that = this;
    that.onResolvedCallbacks.push(onFulfilled);
    that.onRejectedCallbacks.push(onRejected);
}

module.exports = Promise;
