// 发布订阅靠的是一对多的关系
// {'失恋':[eat, cry, shopping]}
class EventEmitter {
    constructor(){
        this._events = {};
    }
    on(eventName, callback){
        if (!this._events[eventName]){
            this._events[eventName] = [callback]
        } else {
            this._events[eventName].push(callback)
        }
    }
    emit(eventName){
        if (this._events[eventName]) {
            this._events[eventName].forEach(cb=>cb())
        }
    }
    removeListener(eventName, callback){
        if (this._events[eventName]) {
            // filter: 过滤器
            this._events[eventName] = this._events[eventName].filter(cb=>cb!=callback)
        }
    }
    once(eventName, callback){
        //1、先绑定
        //2、要在callback中删除绑定，创建一个第三方函数
        let fn = ()=>{ // 绑定的是fn  执行的时候会触发fn函数
            callback();// fn 函数中调用原有的callback
            // 删除fn 再次执行时只会执行一次
            this.removeListener(eventName, fn)
        }
        this.on(eventName, fn)

    }
}

let e = new EventEmitter()
let cry = ()=>{
    console.log('cry')
}
// e.on('失恋', cry);
// e.removeListener('失恋', cry)
e.once('失恋', cry);
e.emit('失恋');