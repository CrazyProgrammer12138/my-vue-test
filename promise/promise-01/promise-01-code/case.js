let MyPromise = require('./Promise')
let p1 = new MyPromise(function(reslove, reject) {
  setTimeout(function() {
    let num = Math.random()
    if (num > 0.5) {
      reslove(num)
    } else {
      reject('失败')
    }
  }, 2000)
})
p1.then(
  function(data) {
    console.log(data)
  },
  function(err) {
    console.log(err)
  }
)
