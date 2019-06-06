let fs =require('fs')
let path = require('path')
/**
 * 删除文件 fs.unlink
 * 删除文件夹：fs.rmdir 文件夹空猜可以删除
 */
function rmdir(dir) {
    return new Promise(function (resolve, reject) {
        fs.stat(dir, (err, stat)=>{
            // if (err) return reject(err);
            console.log(dir);
            if (stat.isDirectory()){
                fs.readdir(dir, (err, files)=>{
                    if (err) return reject(err);
                    Promise.all(files.map(item=>rmdir(path.join(dir, item)))).then(()=>{
                        fs.rmdir(dir, resolve)
                    })
                })
            } else {
                fs.unlink(dir, resolve)
            }
        })
    })
}
rmdir('a').then(data=>{
    console.log(data);
})
