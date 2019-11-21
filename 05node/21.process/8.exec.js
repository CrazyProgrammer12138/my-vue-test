// exec 同步执行一个shell任务
// 用于使用shell执行命令
let {exec} = require('child_process')
let path = require('path')
/** 
 * cwd 子进程的当前工作目录
env 指定子进程的环境变量
encoding 指定输出的编码
timeout 子进程的超时时间
maxbuffer 指定缓存标准输出和错误输出的缓存区最大长度
killSignal 指定关闭子进程的信号，默认值为 "SIGTERM"
*/
let p1 = exec('node test1.js a b c ', {
    cwd: path.join(__dirname, 'test2'),
    encoding: 'utf8',
    maxbuffer: 1024*1024
},function(err, stdout, stderr){
    console.log(err);
    console.log(stdout);
})

