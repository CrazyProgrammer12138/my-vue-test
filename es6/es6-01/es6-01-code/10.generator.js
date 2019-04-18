/*
 * 生成器函数和普通函数长得不一样, 返回迭代器
 * 执行的时候也不一样，
 * 生成器函数其实内部生成了好多小函数
 */

function *read(books) {
    console.log('开始')
    for (let i=0;i<books;i++){
        // yield 放弃 屈服的意思  产出
        yield books[i]
    }
    console.log('结束')
}

let it = read(['js', 'node']);
let r1 = it.next()
console.log(r1)//{value: 'js', done:false}
let r2 = it.next()
console.log(r2)//{value: 'node', done:false}
let r3 = it.next()
console.log(r3)// {value: 'undefined', done:true}