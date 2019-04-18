// map映射，把老数组里面得每一个元素映射未新数组得每一个元素
let arr = [{ name: 'aa', age: 1 }, { name: 'bb', age: 2 }]
let newList = arr
  .map(function(user, index) {
    return `<li>${user.name}:${user.age}</li>`
  })
  .join('')
let ul = `
<ul>
    ${newList}
</ul>
`
let arr1 = { name: 'zfpx', age: 1 }
let { name, age } = arr1
// 其他运算符  会把后面所有参数全都放在一个数组里
// 因为有些时候我们希望有自己的拼接模板字符串的逻辑
function desc(strings, ...args) {
  let result = ''
  for (let i = 0; i < args.length; i++) {
    result += strings[i] + args[i]
  }
  result += strings[strings.length - 1]
  return result
}
// 带标签的模板字符串就像一个函数调用  参数
// 1参数是文本的数组
let str = desc`${name} 今年 ${age} 岁了`
console.log(str)
//startsWith: 判断字符串以什么开头,返回布尔值
// endsWith: 以什么结束,返回布尔值
let address = 'http://www.baidu.com'
let address1 = 'ftp://www.baidu.com'
if (address.startsWith('http')) {
  console.log('http网址')
} else if (address1.startsWith('ftp')) {
  console.log('ftp网址')
}
// repeat: 重负3次
let x = 'x'
console.log(x.repeat(3))

let str5 = '7'
// 07
//时钟 时间 7:5 07:05
// padStart: 补充多少位, 参数1：多少位，参数2：补的内容
// padEnd
console.log('(' + str5.padStart(2, '0') + ')') // 07

//
let obj = {
  name: 'aaa',
  getName: () => {
    // 箭头函数的this是定死的，指向外层的this，所以这里拿不到name
    // 箭头函数虽然好，但不能应用到所有的情况
    console.log(this.name)
  }
}

let obj1 = {
  name: 'bb',
  getName: obj.getName
}
