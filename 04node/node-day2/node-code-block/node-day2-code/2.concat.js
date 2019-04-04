var buf1 = Buffer.from('试试')
var buf2 = Buffer.from('一下')
var buf = Buffer.allocUnsafe(12)
// 拷贝buffer（copy）
// targetBuffer：目标buffer，targetStart：目标的开始，
// sourceStart：源的开始，sourcEnd：源的结束
buf1.copy(buf, 0) // 0-6
buf2.copy(buf, 6)
