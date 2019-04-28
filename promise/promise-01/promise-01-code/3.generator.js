/**
 * 生成器是一个函数，可以用来生成迭代器
 * 生成函数和普通函数不一样，普通函数一旦调用一定会执行完
 * 但是生成器函数中间可以暂停，可以执行一会歇一会
 * 生成器函数遇到暂停点就会停下来，直到再次让他执行
 */
// 生成器函数,特点需要加一个 *
// 生成器有若干个阶段，如何划分这些阶段
function* go() {
  console.log(1)
  // 此处的b是用来供外界值输入进来的
  // 这一行实现输入和输出，本次的输出放在yield后面，下次的输入放在yield前面
  let b = yield 'a'
  console.log(2)
  let c = yield b
  console.log(3)
  return c
}
// 生成器函数和普通函数不一样，调用它的话函数体并不会立刻执行
// 它会返回此生成器的迭代器，迭代器是一个对象，没调用一次next就可以返回一个值对象
// next第一次执行不要传参
let it = go()
let r1 = it.next()
// 第一次调用next会返回一个对象，此对象有两个属性，一个是value就是yield后面的那个值
// 一个是done表示是否迭代完成
console.log(r1) // { value: 'a', done: false } done=false:表示代码还没执行完
let r2 = it.next('B值')
