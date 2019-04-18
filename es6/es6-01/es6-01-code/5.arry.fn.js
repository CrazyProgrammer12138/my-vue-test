let arr = [24, 56, 88, 90, 5]

// [].filter的实现方法
// Array.prototype.filter = function(fn) {
//   let newArr = []
//   for (let i = 0; i < this.length; i++) {
//     let flag = fn(this[i])
//     flag && newArr.push(this[i])
//   }
//   return newArr
// }
// filter:过滤, 返回true此元素保留再新数组，返回false删除
let arr1 = arr.filter(function(item) {
  return item >= 60
})
// console.log(arr1)
// 创建长度为3的数组
let arr2 = Array(3)
// [].fill: 给数组填值
arr2.fill(1)
// map reduce reduceRight filter forEach some find findIndex every

// find：方法

// Array.prototype.find = function(fn) {
//   for (let i = 0; i < this.length; i++) {
//     let flag = fn(this[i])
//     if (flag) {
//       return this[i]
//     }
//   }
// }
// findIndex: 返回对应的索引
// Array.prototype.find = function(fn) {
//   for (let i = 0; i < this.length; i++) {
//     let flag = fn(this[i])
//     if (flag) {
//       return i
//     }
//   }
// }
let arr3 = [1, 2, 3, 4]
let find = arr3.find(function(item) {
  return item == 2
})
console.log(find)

function print() {
  // 把一个类数组变成一个数组
  Array.from(arguments).forEach(function(item) {
    console.log(item)
  })
}
print('a', 'b', 'b')
// 希望把一个类数组变成一个数组
