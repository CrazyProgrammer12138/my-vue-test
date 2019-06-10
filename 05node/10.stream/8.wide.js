/**
 * 同步广度优先先序遍历
 */
let fs = require('fs');
let path = require('path');
function wide(dir) {
    let arr = [dir]
    while (arr.length>0) {
        let current = arr.shift();
        console.log(current);
        let stat = fs.statSync(current)
        if (stat.isDirectory()){
            let files = fs.readdirSync(current)
            files.forEach((item)=>{
                arr.push(path.join(current, item))
            })
        } else {

        }
    }
}
wide('a')
