let obj1 = {
  age: 1,
  getFood() {
    return 'aa'
  }
}
let obj2 = { age: 2 }
let obj3 = {
  //// 设置obj3的原型为obj1
  __proto__: obj1,
  //super:可以调用父级的方法
  getFood() {
    return 'bb' + super.getFood()
  }
}
// obj3对象中没有值，但是使用这个方法继承obj1的属性 等同于obj3.__proto__ = obj1
// 设置obj3的原型为obj1
Object.setPrototypeOf(obj3, obj1)
console.log(obj3)
