// detach 默认情况下父进程 要等待所有的子进程全部完成推出后才能退出，但是如果为子进程设置detach=true的话，这个子进程就会脱离父进程单独存在
let cp = require('child_process')
let fs = require('fs')
let path = require('path')
// 定义文件的标志
let out = fs.openSync(path.join(__dirname, 'msg.txt'), 'w', 0o666)
// detached 在默认情况下，只有在子进程全部退出后，父进程才能退出。为了让父进程可以先退出，而让子进程继续进行I/O操作,可以在spawn方法中使用options参数，把detached属性值设置为true
let sp = cp.spawn('node', ['test4.js'], {
    stdio: ['ignore', out, 'ignore'],
    detached: truefdw
})
// 让父级先退出
sp.unref();
dd