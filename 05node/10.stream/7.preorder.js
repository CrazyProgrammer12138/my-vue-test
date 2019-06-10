/**
 * 异步的先序深度优先遍历
 *    A
 *   / \
 *  B   C
 * / \  \
 * D E  F
 * 遍历算法
 * 目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法，深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点，先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。因此使用这种遍历方式时，下边这颗的遍历顺序是A>B>D>E>C>F
 */
let fs = require('fs');
let path = require('path');

function preDeep(dir, callback) {
    console.log(dir);
    fs.readdir(dir, (err, files)=>{
        !function next(i) {
            if (i>=files.length) return  callback();
            let child = path.join(dir, files[i])
                fs.stat(child, (err, stat)=>{
                if (stat.isDirectory()){
                    preDeep(child, ()=>next(i+1))
                } else {
                    console.log(child);
                    next(i+1);
                }
            })
        }(0);
    })
}
preDeep('a', ()=>{
        console.log('完成');
    }
)
