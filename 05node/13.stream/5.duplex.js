// 双工流
let {Duplex} = require('stream');

let s = Duplex({
    read(){},
    write(chunk,encoding,cb){
        console.log(chunk.toString());
        cb();// 写入下一个buffer
    }
})

// process.stdin 标准输入流
// process.stdout 标准输出流
process.stdin(s).pipe(s).pipe(process.stdout);