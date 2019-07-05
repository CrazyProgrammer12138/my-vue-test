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
        // 每次读取都是一样大小  临时容器
        this.buffer = Buffer.alloc(this.highWaterMark);
        // 真正缓存
        this.buffers = [];
        this.length = 0;
        // 准备打开文件读取
        this.open();
        // 如果有人给当前实例添加了监听函数，就会触发这个事件

        // 当给这个实例添加了任意的舰艇函数时会触发newListener
        this.on('newListener', (type, listener)=>{
            // 如果监听了data事件，流回自动切换位流动模式

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
            this.read();
        })
    }
    read(n){
        let ret;
        // 缓存区数据足够用，并且要读取的字节大于0
        if (0<n<this.length){
            ret = Buffer.alloc(n);
            let index = 0;
            let b;
            while (null != (b = this.buffers.shift())){
                for (let i=0; i<b.length;i++){
                    ret[index++] = b[i];
                    if (index == n) { //填充完毕
                        b = b.slice(i);
                        this.buffers.unshift(b);
                        this.length -= n;
                        break;
                    }
                }
            }
        }
        if (this.length<this.highWaterMark){
            fs.read(this.fd, this.buffer,0,this.highWaterMark,null,(err, bytesRead)=>{
                if (bytesRead) {
                    let b = this.buffer.slice(0,bytesRead);
                    this.buffers.push(b);
                    // 让缓存区的数量加实际读到的字节数
                    this.length += bytesRead;
                    this.emit('readable');
                } else{
                    this.emit('end');
                }
            })
        }
        return ret && this.encoding?ret.toString(this.encoding):ret;
    }
    destroy(){
        fs.close(this.fd, ()=>{
            this.emit('close');
        })
    }
}

module.exports = ReadStream
