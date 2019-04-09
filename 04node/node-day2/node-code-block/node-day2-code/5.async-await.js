// async  await  es7语法 node版本至少是7.9+
// await 后面只能跟随promise
// 终极解决方案
// await 必须有 async修饰
async function result() {
  let content1 = await read('./1.txt', 'utf8')
  let content2 = await read(content1, 'utf8')
  let str = content2 + ' world'
  console.log(str)
}
