let fs = require('fs');
let EventEmitter = require('events');
class WriteStream extends EventEmitter{
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.pos = this.start;
        this.autoClose = options.autoClose;
        this.encoding = options.encoding || 'utf8';
        this.hightWaterMark = options.highWaterMark || 16*1024;
        this.writing = false;
        this.length = 0;
        this.buffers = [];
        this.open();
    }
    // 打开文件
    open(){
        fs.open(this.path, this.flags, this.mode, (err, fd)=>{
            if (err) {
                // 如果 autoClose 设置为 true（默认行为），则在 'error' 或 'finish' 事件时文件描述符会自动关闭
                if (this.autoClose) {
                    // 关闭文件
                    this.destroy();
                }
                this.emit('error', err);
                return;
            }
            // fd 通过 fs.open() 方法返回的文件描述符。
            this.fd = fd;
            this.emit('open');
        })
    }
    // 如果底层已经在写入数据，则必须当前要写入的数据放在缓存区李
    write(chunk, encoding, cb){
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk, this.encoding);
        let len = chunk.length;
        // 缓存区的长度加上写入的长度
        this.length+=len;
        let ret = this.length < this.hightWaterMark;
        // 正在向底层写数据，则当前数据必须放在缓存区中
        if (this.writing) {
            this.buffers.push({
                chunk,
                encoding,
                cb
            });
            // 判断当前最新的缓存区大小是否高于水位线

        } else { // 直接调用底层方法进行写入
            // 在底层写完当前数据之后要清空缓存区
            this.writing = true;
            this._write(chunk, encoding, ()=>this.clearBuffer())
        }
        return ret;
    }
    clearBuffer(){
        // 取出缓存区的第一个buffer
        let data = this.buffers.shift();
        if (data) {
            //
            this._write(data.chunk, data.encoding, ()=>this.clearBuffer())
        } else {
            this.writing = false;
            // 缓存区清空了
            this.emit('drain');
        }
    }
    _write(chunk, encoding, cb){
        if (typeof this.fd != 'number') {
            return this.once('open', ()=>this._write(chunk, encoding, cb))
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err, bytesWritten)=>{
            if (err) {
                if (this.autoClose) {
                    this.destroy();
                    this.emit('error', err)
                }
            }
            // 写入的指针
            this.pos += bytesWritten;
            // 写入多少字节，缓存区要减少多少字节
            this.length -= bytesWritten;
            cb && cb();
        })
    }
    destroy(){
        // 关闭文件，关闭文件之后会触发close事件
        fs.close(this.fd, ()=>{
            this.emit('close')
        })
    }

}
module.exports = WriteStream;
