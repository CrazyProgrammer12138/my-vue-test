// 定义一个类
// 以前js里类个构造函数是一体的
// 类里面可以定义构造函数， 当你创建一个类的实例的时候就会调用构造函数
class Parent {
  constructor(name) {
    // 实例的私有属性
    this.name = name
  }
  // 静态属性是类的属性
  static he() {
    console.log('hello')
  }
  // 属于实例的公有属性，也就是相当于原型上的属性
  getName() {
    console.log(this.name)
  }
}
// Class constructor Parent cannot be invoked without 'new'
// 类的构造函数Parent不能再不通过new 的情况下调用
//  不能这么用 -- Parent('aaa')
// let p = new Parent('aaa')
// p.getName()

// 继承
// 类 和类的实例
// 一个属性如果放在原型上的话，是可能通过实例来调用的
// 但是放在类上的，不能通过实例来调用，只能用过类名来调用