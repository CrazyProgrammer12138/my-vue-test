/*
* 函数
*/
//1、默认参数
// 1、必填项不填报错
// 2、有些参数没有给传参的话可以有默认值
// function ajax(url, method, dataType) {
//     if (typeof url == 'undefined') throw Error('url不能为空')
//     method = method?method:'GET'
// }

// url默认不传为空
// 默认参数

function ajax(url=new Error('url不能为空'), method='GET', dataType='json') {
    console.log(url)
    console.log(method)
    console.log(dataType)
}
ajax('/user')

// reduce 计算 汇总 收敛 把一个数组中的一堆值计算出来一个值
let arr1 = [1,2,3]
// 可以传一个参数，也可以传第二个参数
// 第二个参数表示初始值
// 上一次执行结果会成为下一次的初始值
// 平均值
// 如果没有给初始值的话，第一执行函数的时候 val=第一个元素 item=第二个元素
// reduce是从左往右算
// reduceRight
let result = arr1.reduce(function (val, item, index, origin) {
    let sum = val+item;//返回值会成为下一次函数执行的时候的val
    if (index == 0){
        return sum/arr1.length;
    } else {
        return sum;
    }
},0)

console.log(result)

let arr3 = [1,2,3]
let arr4 = [4,5,6]

// 方法一：[].concat
//展开云算法，相当于把数组中的每个元素一次取出放在这
let arr5 = [arr3, arr4]

//let max = Math.max(1,2,3)
//let max = Math.max().apply(null, arr3)
let max = Math.max(...arr4)