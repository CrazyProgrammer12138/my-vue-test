let express = require('express');
let app = express();
app.listen(3000);
let fs = require('fs');
let sliders = require('./sliders.js');
let pageSize = 5;
let bodyParser = require('body-parser')
app.use(bodyParser.json())
function read(cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}
function write(data, cb){
  fs.writeFile('./book.json', JSON.stringify(data), cb);
}
app.get('/page',function (req, res) {
  let offset = parseInt(req.query.offset) || 0;
  read(function (books) {
    // 每次偏移量 在偏移的基础上增加5条
    let result = books.reverse().slice(offset, offset+pageSize); // 数据倒叙
    let hasMore = true; // 默认有更多
    if (books.length<=offset+pageSize) { // 已经显示的数目 大于了总共条数
      hasMore = false;
    }
    res.json({hasMore, books: result})
  });
})
app.get('/sliders',function (req, res) {
  res.json(sliders)
})
app.get('/hot',function (req, res) {
  read(function (books) {
    let hot = books.reverse().slice(0,6);
    setTimeout(function () {
      res.json(hot)
    }, 500)
  })
})
app.get('/book', function (req,res) {
  let id = parseInt(res.query.id);
  if (typeof id !== 'undefined'&&!isNaN(id)) { // 有id查询一个
    read(function (books) {
      let book = books.find(item=>item.bookId === id);
      if (!book)  book = {};
      res.send({book})
    })
  } else { // 获取所有图书
    // 编码格式
    read(function (books) {
      res.json(books.reverse())
    })
  }
})
app.post('/book', function (req,res) {
  let book = req.body;
  read(function (books) {
    book.bookId = books.length?books[books.length-1].bookId+1:1;
    books.push(book);
    write(books, function () {
      res.json(book)
    })
  })
})
app.delete('/book', function (req,res) {
  read(function (books) {
    books = books.filter(item=>item.bookId !== id);
    write(books, function () {
      res.json({})
    })
  })
})
app.put('/book', function (req,res) {
  let book = req.body;
    read(function (books) {
      books = books.map(item=>{
        if (item.bookId === id) {
        return book;
      }
      return item;
    });
    write(books, function () {
      res.json(book)
    })
  })
})
