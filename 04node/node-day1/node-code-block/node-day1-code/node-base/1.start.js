// 在文件中打印this 不是global属性，node自带模块化功能，
//一个js文件就是一个模块，模块中的this不是global
console.log(this) // {}
var a = 1 // 每个文件都有局部作用域，不会将属性挂载到global上
console.log(global.a)
// 全局变量，可以不声明就可以使用
