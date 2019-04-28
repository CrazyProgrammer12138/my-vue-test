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
    // 如果是初始态转成成功态
    if (self.status == PENDING) {
      self.status = FULFILLED
      // 成功后会得到一个值，这个值不能改
      self.value = value
      // 调用所有成功之后的回调
      self.onResolvedCallbacks.forEach(item => item())
    }
  }

  function reject(reason) {
    // 2.1.3
    // 如果是初始态转成失败态
    if (self.status == PENDING) {
      self.status = REJECTED
      self.value = reason
      // 调用失败回调
      self.onRejectedCallbacks.forEach(item => item())
    }
  }
  //
  try {
    // 因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误对象reject
    exector(resolve, reject)
  } catch (e) {
    reject()
  }
}
