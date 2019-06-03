//concat 链接buffer
let buf3 = Buffer.from('连')
let buf4 = Buffer.from('连')




// concat 实现
Buffer.concat2 = function (list, total=list.reduce((len, item)=>len+item.length, 0)) {
    if (list.length == 1){
        return list[0]
    }
    // Buffer 固定长度，设定下来就不能更改
    let result = Buffer.alloc(total)
    let index = 0
    for (let buf of list) {
        buf.map(item=>{
            if (index>=total) {
                return result
            } else {
                result[index++] = item
            }
        })
    }

    return result
}
let result = Buffer.concat2([buf3, buf4], 5)
console.log(result.toString());
