// 实现use 的next方法  模拟简单中间件
// 每次调用use方法都会将方法存到数组中，默认调用数组的第一线，
// 将next方法传递给数组中的函数，如果调用next函数 会继续执行数组中的下一项
function app() {}
app.middleware = []
app.use = function(cb) {
  this.middleware.push(cb)
}
app.use(function(req, res, next) {
  console.log(1)
  next()
})
app.use(function(req, res, next) {
  console.log(2)
  next()
})
app.use(function(req, res, next) {
  console.log(3)
})
let index = 0
//callback
function next() {
  app.middleware[index++](null, null, next)
}
next()
