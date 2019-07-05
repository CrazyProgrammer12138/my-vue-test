/**
 * 先写流动模式
 **/
let fs = require('fs');
let ReadStream = require('./ReadStream1');
let rs = new ReadStream('./1.txt', {
    flags: 'r',
    mode: 0o666,
    start: 3,
    end: 7,
    highWaterMark: 3,
    autoClose: true,
    encoding: 'utf8'
})

rs.on('open', ()=>{
    console.log('open');
})
rs.on('data', (data)=>{
    console.log(data);
})
rs.on('end', ()=>{
    console.log('end');
})
rs.on('close', ()=>{
    console.log('close');
})
rs.on('error', (err)=>{
    console.log(err);
})

