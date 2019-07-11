// 转换流：实现数据转换的
// 加密
let {Transform} = require('stream');
let t = Transform({
    transform(chunk, encoding, cb){
        this.push(chunk.toString().toUpperCase());
        cb();
    }
})
process.stdin.pipe(t).pipe(process.stdout);