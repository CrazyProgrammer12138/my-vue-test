let fs = require('fs');
// flag你将对文件进行何种操作
// r: 读文件，文件不存在报错
// r+：读取并写入，文件不存在报错
// rs：同步读取文件并忽略缓存
// w：写入文件，不存在则创建，存在则清空
// wx：排它写入文件
// wx+: 读取并写入文件，不存在则创建，存在则清空
// a：追加写入
// ax：与a类似，排它方式写入
// a+：取并写入文件，不存在则创建
// ax+：作用与a+类似，但是以排它方式打开文件
// fs.readFile('./1.txt', {encoding: 'utf8', flag: 'w'},function (err, data) {
//     if (err) {
//         console.log(err);
//     } else{
//         console.log(data);
//     }
// });
fs.writeFile('./2.txt', 'data', {encoding: 'utf8', flag: 'a'},function (err, data) {
    console.log(err);
})
