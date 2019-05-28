let util = require('util')
let obj = { name: 'ls', home: { city: 'beij' } }
// depth:展示的层级数
console.log(util.inspect(obj, { depth: 1 }))
