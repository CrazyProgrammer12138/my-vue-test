let fs = require('fs');
let WriteStream = require('./WriteStream1')
let wx =new WriteStream('./1.txt', {
    flags: 'w',
    mode: 0o666, // 权限位
    start: 0,
    encoding: 'utf8',
    autoClose: true, // 当流写完之后自动关闭文件
    highWaterMark: 3
})
let n = 9;
wx.on('error', (err)=>{
    console.log(err);
})
function write(){
    let flag = true;
    while(flag && n>0){
        flag = wx.write(n+"", 'utf8', ()=>console.log('ok'));
        n--;
        console.log(flag);
    }
}

wx.on('drain', ()=>{
    console.log('drain');
    write();
})
write();
