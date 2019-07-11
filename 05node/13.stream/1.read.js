let fs = require('fs');
let rs = fs.createReadStream('./13.stream/1.txt', {
    start: 3,
    end: 8,
    highWaterMark: 3
})
rs.on('open', function() {
    console.log('open');
})
rs.on('data', function(data) {
    console.log(data.toString());
})
rs.on('end', function() {
    console.log('end');
})
rs.on('close', function() {
    console.log('close');
})
rs.on('error', function(err) {
    console.log(err);
})