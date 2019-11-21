let count = 40;
let timer = setInterval(function () {
    // process.stdout 标准输出
    process.stdout.write(new Date().toString() + '\r\n');
    if(--count == 0) {
        clearInterval(timer)
    }
}, 1000)