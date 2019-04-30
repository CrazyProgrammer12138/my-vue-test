// 这个模块是用来实现promise的，在angular.js里的promise就是用的q
// promise的周边生态
//let Q = require('q')
let Q = {
  defer() {
    let success, error
    return {
      resolve(data) {
        success(data)
      },
      reject(err) {
        error(err)
      },
      promise: {
        then(onFulfilled, onRejected) {
          success = onFulfilled
          error = onRejected
        }
      }
    }
  }
}
let fs = require('fs')
function readFile(filename) {
  let defer = Q.defer()
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      defer.reject(err)
    } else {
      defer.resolve(data)
    }
  })
  return defer.promise
}

readFile('1.txt').then(
  function(data) {
    console.log(data)
  },
  function(err) {
    console.log(err)
  }
)
