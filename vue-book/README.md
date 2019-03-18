## 项目用到 less
   需要安装：
   npm install less less-loader axios vuex bootstrap --save-dev


## 项目结构
  src/components：页面级组件
  src/base：基础组件
  src/api：代表所有的接口

  mock：服务端-模拟数据-后端代码


## 模板引用三部曲
  1、声明组件
  2、导入组件
  3、注册组件

## 热门图书的功能
- 先写服务端，确保数据能正常返回
- 增加api方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级调用这个方法，将数据传递给基础组件
- 写一个据出组件那几部：
  - 1、创建一个.vue文件
  - 2、在需要使用这个组件的父级中引用这个组件
  - 3、在组件中注册
  - 4、已标签的形式引入


## 数据
  1、js文件形式，只可以做死数据没有办法使用fs.writeFile方法实现数据动态更改；
  2、fs.writeFile：会把之前的数据删除，再去添加数据，那么js文件中module.exports
就是被替换掉，所以动态数据使用json

## 路由元信息
页面级缓存
需要在路由path对象中加入mete:{keepAlive:true}, 对那个单页进行缓存

