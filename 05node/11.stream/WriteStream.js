let fs = require('fs')
let EventMitter = require('events')
// 继承
class WriteStream extends EventMitter{
    constructor(path, options){
        super(path, options)
        this.path = path;
        this.flags = options.flags || 's';
        this.mode =  options.mode || 0o666;
        this.start =  options.start || 0;
        this.pos = this.start; // 文件写入索引
        this.encoding =  options.encoding || 'utf8';
        this.autoClose =  options.autoClose;
        this.hightWaterMark =  options.hightWaterMark||16*1024;
        
        this.writing = false; // 表示内部正在写入数据
        this.length = 0; // 表示缓存区字节的长度
        this.open();
    }
    open(){
        fs.open(this.path, this.flags,this.mode,(err, fd)=>{
            // 是否报错
            if (err) {
                if (this.autoClose) {
                    // 关闭文件
                    this.destroy();
                }
                this.emit('error', err)
            }
            this.fd = fd;
        })
    }
    // 如果底层已经在写入数据的话，则必须当前要写入数据在缓冲区里
    write(chunk, encoding, cb){
        // 表示正在向底层写数据，则当前数据必须放在缓存区里
        if(this.writing){

        } else { // 直接调用底层的写入方法写入

        }
    }
    _write(chunk, encoding, cb){}
    destroy(){
        fs.close(this.fd, ()=>{
            this.emit('close')
        })
    }
}