let MyPromise = require('./Promise')
let Q = require('q')
let p1 = new MyPromise(function(resolve, reject) {
  resolve(100)
})
let p2 = p1.then(function(data) {
  return new Promise(function(resolve) {
    resolve(data + 100)
  })
})

let p3 = p2.then(function(data) {
  let defer = Q.defer()
  defer.resolve(data + 100)
  return defer.promise
})
p3.then(function(data) {
  console.log(data)
})
