console.log(arguments)

//exports
//require
//module
//__filename
//__dirname
// 模块化：好处 低耦合 高内聚 方便维护 防止代码冲突(命名冲突)
// （闭包）
// 单例模式（不能保证一定不冲突，导致调用过程长）：当前作用域下有且仅有一个
// CMD(代表着：seajs 就近依赖)  AMD 依赖前置 reqquirejs（浏览器端）
// node基于规范commonjs，靠的是文件的读写实现，node天生自带模块化
// 1、定义如何创建一个模块  一个js文件就是一个模块
// 2、如何使用一个模块  require 使用一个文件只需要require文件
// 3、如果导出一个模块  exports / module.exports
