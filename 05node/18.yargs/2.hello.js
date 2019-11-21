let yargs = require('yargs')
// 它可以帮我们解析命令行参数，把参数数组变成对象的形式
// let argv = yargs.argv;
let argv = yargs.option('n', {
    alias: 'name', // 别名
    demand: true,// 必填
    default: 'zfpx',
    description:'请输入你的姓名'
})
    .usage('hellp [opitons]')
    .help()//指定帮助信息
    .example('hello -name zfpx', '执行hello命令，然后传入name参数为zfpx')
    .alias('h', 'help')
    .argv;

console.log(argv);
