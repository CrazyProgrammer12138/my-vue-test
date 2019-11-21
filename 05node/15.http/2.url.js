let url = require('url')
let str = 'http://usr:pad@localhost:8080/user?id=5&age=1#top';
// 如果第二个参数为true，那么query就是一个对象了
let urlObj = url.parse(str, true);
console.log(urlObj);
console.log(url.format(urlObj));

