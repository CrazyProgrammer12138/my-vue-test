// 表示分配一个长度为6个字节的buffer
// 会把所有的字节设置为 0
// 参数2可以提供默认值
let buf1 = Buffer.alloc(6, 2)
//console.log(buf1)
// 分配一块没有初始化的内存，里面会有值，不安全
let buf2 = Buffer.allocUnsafe(6)
//console.log(buf2)
// 分配字符串buffer
let buf3 = Buffer.from('珠峰')
// console.log(buf3)

// buffer 常用方法
// buf.fill() // 参数1：填充的值，参数2：填充的开始索引，参数3：结束索引,不包含最后一位
// buf.write() // 参数1：写的字符串 参数2：填充开始的索引 参数3：填充的字节长度 参数4：编码
//buf.writeInt8()向指定的索引写入一个8位的整数，参数1：写入的值  参数2：偏移量
//buf.writeInt16BE() 高位写入
//buf.readInt16BE() 高位读
//buf.writeInt16LE() 低位写入
//buf.toString('utf8'3，6) buffer转换成字符串，参数2：开始 参数3:结束位置
//buf.slice(star, end) 截取buffer，截取字符串：返回新的buffer，浅拷贝
let buf4 = Buffer.alloc(6)
// buf4.fill(3, 1, 3) //[0,3,3,0]
// buffer一共6个字节：这里设置从0开始放三个字节，所以只能放 珠，
// buf4.write('珠', 0, 6, 'uft8')
// 需要再一次防止
// buf4.write('峰', 3, 3, 'uft8')
// console.log(buf4) 把buf转换成字符串

let buf5 = Buffer.alloc(6)
//buf5.writeInt8()向指定的索引写入一个8位的整数，参数1：写入的值  参数2：偏移量
buf5.writeInt8(0, 0)
buf5.writeInt8(16, 1)
buf5.writeInt8(32, 2)
// console.log(buf5);// [00 10 20 00 00 00]

let buf6 = Buffer.alloc(6)
// BE: Big Endian 大头在前
// LE: Little Endian 小头在前
buf6.writeInt16BE(256, 0)
// console.log(buf6);
// console.log(buf6.toString('utf8'));

// let buf7 = Buffer.alloc(6, 1)
let buf9 = Buffer.from('联盛金服')
let buf11 =  buf9.slice(0, 5)
let buf12 =  buf9.slice(5)
let {StringDecoder} = require('string_decoder')
let sd = new StringDecoder()
// write 就是读取buffer的内容，返回一个字符串
// write的时候会判断是不是一个字符，如果是的话就输出不是的话则缓存在对象内部，
// 等下次write的时候会把前面缓存的字符加到第二次write的buffer上再进行判断
console.log(sd.write(buf11));
console.log(sd.write(buf12));

