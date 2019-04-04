class Parent {
  constructor() {
    this.smoking = '抽烟'
  }
  sleep() {
    return 'sleep'
  }
}
// Child.prototype = Object.create(Parent.prototype)
class Child extends Parent {
  constructor() {
    // Parent.call(this) super 中的this指向的是child
    super()
    this.drink = 'drink'
  }
}

let child = new Child()
console.log(child.drink)
