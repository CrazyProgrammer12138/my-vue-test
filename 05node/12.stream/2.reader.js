/**
* 流的用法
*/
// let fs = require('fs');
// fs.readFile('./1.txt', function(err, data){
    
// })
let LineReader = require('./LineReader');
let reader = new LineReader('./1.txt', 'utf-8');
reader.on('newLine', data=>{
    console.log(data);
})
reader.on('end', ()=>{ 
    console.log('over');
})