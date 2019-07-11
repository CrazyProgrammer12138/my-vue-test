let fs = require('fs');
let EventEmitter = require('events');

class ReadStream extends EventEmitter{
    constructor(path, options) {
        super(path, options);
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.end = options.end;
        this.pos = this.start;
        this.encoding = options.encoding;
        this.autoClose = options.autoClose;
        this.highWaterMark = options.highWaterMark;
        this.flowing;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.open();
        this.on('newListener', (type, listener)=>{
            if (type == 'data') {
                this.flowing = true;
                this.read();
            }
        })
    }
    open(){
        fs.open(this.path, this.flags, this.mode,(err, fd)=>{
            if (err){
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
        if (typeof this.fd != 'number') {
            return this.once('open', ()=> this.read())
        }
        let howMoth = this.end?Math.min(this.end - this.pos+1, this.highWaterMark):this.highWaterMark;
        fs.read(this.fd,this.buffer,0,howMoth,this.pos,(err, bytes)=>{
            if (err){
                if (this.autoClose){
                    this.destroy();
                    return this.emit('error', err);
                }
            }
            if (bytes){
                let data = this.buffer.slice(0, bytes);
                data = this.encoding?data.toString(this.encoding):data;
                this.pos += bytes;
                this.emit('data', data);
                if (this.end && this.pos > this.end){
                    return this.endFn();
                } else {
                    if (this.flowing) this.read();
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
}
module.exports = ReadStream
