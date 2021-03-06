let http = require('http');
let fs = require('fs');
let url = require('url');
// 获取轮播图：/sliders
let sliders = require('./sliders.js');

let pageSize = 5;// 每页显示5个
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
// 写人文件
function write(data, cb){
  fs.writeFile('./book.json', JSON.stringify(data), cb);
}
// write({}, function () {
//   console.log('写入成功')
// })

http.createServer((req, res)=>{
  // 设置跨域请求头
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", '3.2.1');
  if(req.method=="OPTIONS") return res.end();/*让options请求快速返回*/
  // true 把query转化成对象
  let {pathname, query} = url.parse(req.url, true);

  // 下拉加载
  if (pathname === '/page') {
    // 那到当前前端传递的值
    let offset = parseInt(query.offset) || 0;
    read(function (books) {
      // 每次偏移量 在偏移的基础上增加5条
      let result = books.reverse().slice(offset, offset+pageSize); // 数据倒叙
      let hasMore = true; // 默认有更多
      if (books.length<=offset+pageSize) { // 已经显示的数目 大于了总共条数
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify({hasMore, books: result}))
    });
    return;
  }
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
      setTimeout(function () {
        res.end(JSON.stringify(hot));
      }, 500)
    })
    return;
  }

  if (pathname === '/book'){ // 对书的增删改查
    let id = parseInt(query.id);// 取出的字符串
    switch (req.method) { // ?id=1
      case 'GET':
        if (typeof id !== 'undefined'&&!isNaN(id)) { // 有id查询一个
          read(function (books) {
            let book = books.find(item=>item.bookId === id);
            if (!book)  book = {};
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book));
          })
        } else { // 获取所有图书
          // 编码格式
          read(function (books) {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data',chunk => {
          str += chunk;
        })
        req.on('end', ()=>{
          let book = JSON.parse(str);
          read(function (books) {
            book.bookId = books.length?books[books.length-1].bookId+1:1;
            // 将数据放到book中，books在内存中
            books.push(book);
            write(books, function () {
              res.end(JSON.stringify(book));
            })
          })
        })
        break;
      case 'PUT':
        if (id){ // 获取了当前要修改的id
          let str = '';
          // 获取数据 req.on
          req.on('data', chunk=>{
            str+= chunk;
          });
          req.on('end', ()=>{
            let book = JSON.parse(str); // book 要改成什么样子
            // 先读文件
            read(function (books) {
              // 修改就映射一个新的 map
              books = books.map(item=>{
                // 找到要修改的ID，然会新的，否则输出item
                if (item.bookId === id) {
                  return book;
                }
                return item;
              });
              // 写入到文件中去
              write(books, function () {
                res.end(JSON.stringify(book));
              })
            })
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item=>item.bookId !== id);
          write(books, function () {
            res.end(JSON.stringify({}));// 删除返回空对象
          })
        })
        break;
    }
    return;
  }

  // 启动静态文件/dist/index.html
  // 判断文件是否存在fs.stat
  // 读取一个路径
   fs.stat('.'+pathname, function (err, stats) {
      if(err) {
        // res.statusCode = 404;
        // res.end('NOT FOUND');
        fs.createReadStream('index.html').pipe(res);
      }else{
        // 读一个文件流
        // 判断是否是个文件夹
        if (stats.isDirectory()) {
          let p = require('path').join('.'+pathname, './index.html');
          fs.createReadStream(p).pipe(res);
        } else {
          fs.createReadStream('.'+pathname).pipe(res);
        }
      }
   })
}).listen(3000);
