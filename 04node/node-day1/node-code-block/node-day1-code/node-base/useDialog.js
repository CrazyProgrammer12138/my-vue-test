// 调用写好的方法，需要引用模块
// 如果是自己写的文件，要通过./方式，文件模块，如果是js、node、json后缀可以省略，
// 他会自动添加后缀
// 如果异步方法一般会有回调函数
let Dialog = require('./dialog.es5')
console.log(Dialog)
