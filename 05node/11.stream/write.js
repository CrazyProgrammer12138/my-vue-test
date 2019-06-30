let fs = require('fs');
let ws = fs.createWriteStream('./1.txt', {
    flags: 'w',
    mode: 0o666,
    start: 0,
    encoding: 'utf8',
    autoClose: true,// 当流写完之后自动关闭文件
    highWaterMark:3
});
let n = 9;
function write(){
    let flag = true;
    while(flag && n>0){
        flag = ws.write(n + "");
        n--;
        console.log(flag);
    }
    ws.once('drain', ()=>{
        console.log('drain');
        write()
    })
}

write()