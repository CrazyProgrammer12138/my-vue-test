/**
* 我们现在写一个类，然后可以传入一个文件路径得到类的实例，
* 然后可以监听它的newLine事件，当这个行读取器每次读到一行的时候，
* 就会向外发射newLine事件，当读到结束的时候会发射end事件
*/
let fs = require('fs');
// 事件发射器
let EventEmitter = require('events');
// 引入util
let util = require('util');
const NEW_LINE = 0x0A; // /n
const RETURE = 0x0D;  // /r
function LineReader(path, encoding){
    // 改变this指向
    EventEmitter.call(this);
    // 创建一个可读流
    this._reader = fs.createReadStream(path);
    this.encoding = encoding;
    // 开始读文件，并且发射事件
    // 当给一个对象添加一个新的监听函数时候会触发newListener事件
    // type：新添加事件的名字 listener：新的监听函数
    this.on('newListener', (type, listener)=>{
        // 如果说你添加了newLine和监听，那么就开始读取文件内容并且按行发射数据
        if(type == 'newLine') {
            // 读可读流的方式
            // 当监听一个可读流的readable事件，流就会调用底层的读取文件的API方法填充缓存区，填充完之后向外发射readable事件
            let buffers = [];
            this._reader.on('readable', ()=>{
                let char; // Buffer
                while(null != (char = this._reader.read(1))){
                    switch(char[0]){
                        case NEW_LINE:
                            this.emit('newLine', Buffer.from(buffers).toString(this.encoding));
                            buffers.length = 0;
                            break;
                        case RETURE:
                            // 如果是 /r 后面再读取一位，看看是否是/n 
                            this.emit('newLine', Buffer.from(buffers).toString(this.encoding));
                            buffers.length = 0;
                            let nChar = this._reader.read(1);
                            if (nChar != NEW_LINE) {
                                buffers.push(nChar[0])
                            }
                            break;
                        default:
                            buffers.push(char[0]);
                            break;
                    }
                }
            })
            // 当前你用流去监听数据的时候，当读完之后都会发射end事件
            this._reader.on('end', ()=>{
                this.emit('newLine', Buffer.from(buffers).toString(this.encoding))
                this.emit('end');
            })
        }
    })

}
// LineReader类继承事件发射器
util.inherits(LineReader, EventEmitter);
module.exports = LineReader;