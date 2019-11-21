// fork exec execFile  它们其实都是基于spwan的改进方法
// let {fork} = require('child_process')
let {spawn} = require('child_process')

// 模拟一个fork方法
// fork 可以直接运行一个node模块
// silent 可以快速设置stdio
function fork(modulepath, args, options){
    let { silent } = options;
    let opts = Object.assign({}, options)
    if(silent){
        opts.stdio = ['ignore', 'ignore', 'ignore']
    } else {
        opts.stdio = [process.stdin, process.stdout, process.stderr]
    }
    spawn('node', [modulepath, ...args], opts)
}

let child = fork('fork.js', ['aaa'], {
    cwd: __dirname,
    silent: true

})
child.on('message', function (data) {
    console.log(data);
})
child.send({name: 'zsda'})
