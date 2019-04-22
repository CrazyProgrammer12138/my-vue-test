'use strict'

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}
// 类的调用检查：参数1：类的实例 2：构造函数
function _classCallCheck(instance, Constructor) {
  // 如果这个实例不是这个构造函数的实例的话，就i报错了

  if (!_instanceof(instance, Constructor)) {
    // 不能把一个类当作普通函数来用
    throw new TypeError('Cannot call a class as a function')
  }
}
// target:目标 props是属性对象数组
function _defineProperties(target, props) {
  // 循环每个元素
  for (var i = 0; i < props.length; i++) {
    // 取出每个属性描述性
    var descriptor = props[i]
    // 可枚举 for in 循环出来
    descriptor.enumerable = descriptor.enumerable || false
    // 课配置 可以通过对delete  删除 此属性
    descriptor.configurable = true
    // 可修改值
    if ('value' in descriptor) descriptor.writable = true
    // 真正的像parent类的原型对象上增加属性
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
// 参数1：构造函数 参数2:原型上的属性 静态属性(类上的属性)
function _createClass(Constructor, protoProps, staticProps) {
  //
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

var Parent =
  /*#__PURE__*/
  (function() {
    function Parent(name) {
      // 为了保证这个类只能用来new休息
      _classCallCheck(this, Parent)

      // 实例的私有属性
      this.name = name
    } // 属于实例的公有属性，也就是相当于原型上的属性

    _createClass(Parent, [
      {
        key: 'getName',
        value: function getName() {
          console.log(this.name)
        }
      }
    ])

    return Parent
  })()

var p = new Parent('aaa')
p.getName()
