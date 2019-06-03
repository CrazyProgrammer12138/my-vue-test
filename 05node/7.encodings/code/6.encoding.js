function transfer(number) {
    let arr = ["110","10","10"]
    let str = number.toString(2) // 1001110000001111
    arr[2] += str.substring(str.length-6)
    arr[1] += str.substring(str.length-12,str.length-6)
    arr[0] += str.substring(0, str.length-12)
    return arr.map(item=>parseInt(item, 2).toString(16))
}

let r = transfer(0x4E07)
console.log(r);

