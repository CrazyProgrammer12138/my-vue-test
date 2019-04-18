/*
 * 生成器(generator)与迭代器(Iterator)
 * 它是理解koa基础，另外也是现代异步解决方案async await的基础
 */
/*
 * read生成器   用来生成迭代器的
 */
function read(books) {
    let index = 0;
    return {
        next(){
            // done只要能取到就位false，取不到就位true
            let done = index==books.length-1
            let value = books[index++]
            return {
                value, done
            }
        }
    }
}
// 迭代器：迭代器可以不停的调用next方法得到一个结果{value, done}
// 当done为true的时候就表示取完了
let it = read(['js', 'node'])
// it有一个方法叫next，每次调用next都会返回一个结果 {value, done}

// 循环取结果
// let result;
// do {
//     result = it.next();
//     console.log(result)
// }while (!result.done)