let http = require('http');
let fs = require('fs');
let url = require('url');
// 获取轮播图：/sliders
let sliders = require('./sliders.js');

function read(cb) {
  // readFile异步的，解决异步回调函数
  // 第三个参数不能是cb，因为有可能会有错误，每次错误处理
  fs.readFile('./book.json', 'utf8', function (err, data) {
    // 如果有错误或者没有数据
    if (err || data.length == 0) {
      cb([]);// 如果有错误  或者文件没有长度 就是空数组
    } else {
      // 将读出来的内容装换成对象
      cb(JSON.parse(data));
    }
  });
}
// 读的文件写死了 参数：
// books代表所有图书
// read(function (books) {
//   console.log(books)
// });
http.createServer((req, res)=>{
  // 设置跨域请求头
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", '3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/
  // true 把query转化成对象
  let {pathname, query} = url.parse(req.url, true);
  if (pathname === '/sliders') {
    // 编码格式
    res.setHeader('Content-Type', 'application/json;charset=utf8');
    return res.end(JSON.stringify(sliders));
  }
  // 热门书接口
  if (pathname === '/hot') {
    // 删除、查询、添加书都要fs.readFile()，所以封装成公共方法
    read(function (books) {
      //books.reverse(): 倒叙,截取6个
      let hot = books.reverse().slice(0,6);
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify(hot));
    })
    return;
  }

  if (pathname === '/book'){ // 对书的增删改查
    let id = parseInt(query.id);// 取出的字符串
    switch (req.method) { // ?id=1
      case 'GET':
        if (id) { // 有id查询一个

        } else { // 获取所有图书
          // 编码格式
          read(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
    }
    return; 
  }
}).listen(3000);
