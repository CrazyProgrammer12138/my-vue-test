//fs.readdir(path, options, callback) 获取一个目录下面得所有文件或目录
//fs.unlink(path, callback) 删除一个非空目录
//fs.rmdir(path, callback) 删除一个空目录
//fs.stat() 检测文件是够存在
let fs = require('fs');
 // 同步删除文件
function rmdirp(dir) {
    let files = fs.readdirSync(dir)
    files.forEach((file)=>{
        let current = dir + '/' + file;
        let child = fs.statSync(current);
        if (child.isDirectory()){
            rmdirp(current)
        } else {
            fs.unlinkSync(current)
        }
    })
    // 把一个目录下面所有得文件或目录全部删除之后，在删除自己
    fs.rmdirSync(dir);
}

rmdirp('a');
