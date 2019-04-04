//util 工具模块 核心模块/内置模块， 不需要安装直接使用
//util.inherits: 实现继承
//util.isArray, isFunction
//util.promisify 把方法转化成promise
let util = require('util')
//判断类型
//1、typeof 判断不了对象数据类型
//2、instanceof 不能判断继承后
//3、constructor
//4、Object。prototype.toString.call([]) === '[object Array]'
// console.log(util.isDate(/o/));

// 继承方式
function Parent() {
  this.smoking = '抽烟'
}
Parent.prototype.sleep = '睡觉'
function Child() {}

//util.inherits：实现继承
//util.inherits(Child, Parent) // 继承公有属性

function create(proto) {
  let Fn = function() {} // 创建一个空类，把传进来的原型赋给此类
  Fn.prototype = proto
  return new Fn() // 返回值又有传进来的公有属性的实例
}

Child.prototype = create(Parent.prototype) // 公有shuxing

let child = new Child()

// 只继承公有
// Object.setPrototypeOf(Child.prototype, parent.prototype);
// Child.prototype.__proto__ = Parent.prototype; // 间接继成，连接到父级
// 继承私有 + 继承公有
