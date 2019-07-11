let {Transform} = require('stream');
let fs = require('fs')
// 普通流里面放的buffer，对象流放的是对象
let rs = fs.createReadStream('./user.json')
let toJSON = Transform({
    readableObjectMode: true, // 表示向可读流里放的就是对象
    transform(chunk, encoding, cb){
        // 像可读流的缓存里放
        this.push(JSON.parse(chunk.toString()));
    }
})
let outJSON = Transform({
    writableObjectMode: true, // 表示向可读流里放的就是对象
    transform(chunk, encoding, cb){
        // 像可读流的缓存里放
        console.log(chunk);
        cb();
    }
})
rs.pipe(toJSON).pipe(outJSON);