// 监控监视文件的变化，当文件发生变化之后执行对应回调函数
let fs =require('fs')
// stat 是一个对象 fs.stat 类似
// prevStat：修改前的状态  newStat修改后的状态
fs.watchFile('./b.txt', function (newStat, prevStat) {
    console.log(Date.parse(prevStat.ctime));
    if (Date.parse(prevStat.ctime) == 0) {
        console.log('新增加的文件');
    } else if (Date.parse(prevStat.ctime) != Date.parse(newStat.ctime)) {
        console.log('文件呗修改了');
    } else {
        console.log('文件呗删除了');
    }
})
