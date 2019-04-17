/**
 * var
 * 1、可以重复声明
 * 2、不能定义常量
 * 3、不支持块作用域
 * 4、
 */

/**
 * let:es6中子增加的两种变量声明的方式，可以解决以前var的一些问题 
 * 1、不能重复声明
    -- 错误提示：Uncaught SyntaxError: Identifier 'a' has already been declared
    -- 变量a不能重复声明
   2、可以定义常量，常量不可以更改
   3、支持块作用域
   * */
// 以前JS只有两个作用域  一个全局  一个函数级

/*
    解构： 分解一个对象的结构
*/
// 解构的时候，等号的两边结构类似，右边还必须是一个真实的值

let arr = [{ name: 'a', age: 2 }, [1, 2], 3]
let [{ name, age }, [a, b], c] = arr
// 默认解构，如果能取出来值就用取出来得值，如果取不出来就用默认值
let a = { name: 'ss' }
let { name, age = 2 } = a
// 省略赋值
let arr1 = [1, 2, 3, 4]
let [, , j] = arr1
console.log(j)
