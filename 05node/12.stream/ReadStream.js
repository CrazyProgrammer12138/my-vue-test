// 流动模式
let fs = require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter{
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.mode = options.mode || 0o666;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64*1024
        this.start = options.start || 0;
        this.pos = this.start;
        this.flowing;
        this.end = options.end;
        this.autoClose = options.autoClose;
        this.encoding = options.encoding;
        // 每次读取都是一样大小
        this.buffer = Buffer.alloc(this.highWaterMark);
        // 准备打开文件读取
        this.open();
        // 如果有人给当前实例添加了监听函数，就会触发这个事件

        // 当给这个实例添加了任意的舰艇函数时会触发newListener
        this.on('newListener', (type, listener)=>{
            // 如果监听了data事件，流回自动切换位流动模式
            if (type == 'data'){
                this.flowing = true;
                this.read();
            }
        })

    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err, fd)=>{
            if (err) {
                if (this.autoClose){
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    read(){
        // 读完文件没有打开
        if (typeof this.fd != 'number') {
            return this.once('open', ()=>this.read());
        }
        // du 多少个字节  有结束位  每一次读取的大小都是一样  最高水位线和结束位和索引的差 两者取最小
        let howMuchToRead = this.end?Math.min(this.end - this.pos+1, this.highWaterMark):this.highWaterMark;
        // bytes实际读到的字节数
        // 次buffer 不是缓存区buffer，而是最高水位线
        fs.read(this.fd,this.buffer,0,howMuchToRead,this.pos,(err, bytes)=>{
            if (err) {
                if (this.autoClose){
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            if (bytes) {
                let data = this.buffer.slice(0, bytes);
                this.pos += bytes;
                data = this.encoding?data.toString(this.encoding):data;
                this.emit('data', data);
                if (this.end && this.pos > this.end) {
                    return this.endFn();
                } else {
                    if (this.flowing)
                        this.read();
                }
            } else {
                return this.endFn();
            }
        })
    }
    endFn(){
        this.emit('end');
        this.destroy();
    }
    destroy(){
        fs.close(this.fd, ()=>{
            this.emit('close');
        })
    }
    pipe(dest){
        //dest 可写流  ws
        this.on('data', data=>{
            let flag = dest.write(data);
            if (!flag){
                //暂停
                this.pause();
            }
        })
        dest.on('drain', ()=>{
            // 恢复
            this.resume();
        })
    }
    // 当暂停的时候，可读流会进入流动模式
    pause(){
        this.flowing = false;
    }
    resume(){
        this.flowing = true;
        this.read();
    }
}

module.exports = ReadStream
