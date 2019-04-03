// es5 定义类的方法，函数名开头大写
function Dialog() {
  this.time = 3000
}
Dialog.title = 'zzz' // 只能类调用
Dialog.prototype.$show = function() {
  console.log('show')
}
Dialog.prototype.$hide = function() {
  console.log('hide')
}

// exports.xxx = Dialog; //给exports赋予属性，可以导致module.exports对象的变化
// 直接改变module.exports的指向，最终导出的是module.exports
module.exports = Dialog
