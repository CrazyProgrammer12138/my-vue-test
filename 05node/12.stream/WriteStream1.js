let fs =require('fs');
let EventEmitter = require('events');


class WriteStream extends EventEmitter{
    constructor(path, options){
        super(path, options);
        // 写入文件时配置的参数
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 0o666;
        // 写入位置
        this.pos = this.start = options.start || 0;
        this.autoClose = options.autoClose;
        this.encoding = options.encoding || 'uft8';
        this.hightWaterMark = options.highWaterMark || 16*1024;
        // 是否正在写入文件
        this.writing = false;
        this.length = 0;
        // 可写流 要有一个缓存区，当正在写入文件时，异步操作，写入文件的速度比较慢，所以需要把文件写入到缓存区中，当缓存满的时候在写入文件，内容要写入到缓存区中
        // 在源码中是一个链表 => []
        this.buffers = [];
        // 写入时需要先打开
        this.open();
    }
    open(){
        // fd: 文件描述符
        fs.open(this.path,this.flags,this.mode,(err, fd)=>{
            if (err) {
                if (this.autoClose){
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            this.fd = fd;
            // 文件打开之后，需要发射open事件
            this.emit('open')
        })
    }
    // 写入文件，在外面被调用的
    write(chunk, encoding, cb){
        //
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk, this.encoding);
        this.length += chunk.length;

        let ret = this.length < this.hightWaterMark;
        if (this.writing) {
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
        } else {
            this.writing = true;
            this._write(chunk, encoding, ()=>this.clearBuffer())
        }
        return ret;
    }
    _write(chunk, encoding, cb){
        if (typeof this.fd != 'number') {
            return this.once('open', ()=>this._write(chunk, encoding, cb))
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos, (err, bytesWritten)=>{
            if (err) {
                if (this.autoClose){
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            this.pos += bytesWritten;
            this.length -= bytesWritten;
            cb && cb();
        })
    }
    clearBuffer(){
        let data = this.buffers.shift();
        if (data){
            this._write(data.chunk,data.encoding, ()=>this.clearBuffer())
        } else {
            this.writing = false;
            this.emit('drain');
        }
    }
    destroy(){
        fs.close(this.fd, ()=>{
            this.emit('close')
        })
    }

}

module.exports = WriteStream
