//set DEBUG=static:*
let config=require('./config')
let http=require('http')
// chalk 控制颜色
let chalk=require('chalk')
let path=require('path')
let url=require('url')
let fs=require('fs')
let mime=require('mime')
let zlib=require('zlib')
let {promisify,inspect}=require('util')
let stat = promisify(fs.stat)
let handlebars = require('handlebars')
//读取目录的内容 目录中的文件名的数组
let readdir = promisify(fs.readdir)
// 在控制台输出的模块， 名称有特点有两部分，第一部分一般是项目名，第二部分是模块名
// 每个debug实例都有一个名字， 是否在控制台打印取决于环境变量中的debug值是否等于static:app
let debug=require('debug')('static:app')

function list() {
    // 需要拿到渲染的html模板，使用path，并设置编码
    let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8')
    // 编辑模板并且返回
    return handlebars.compile(tmpl)
}
/** 
 * 1.显示目录下面的文件列表和返回内容
 * 2.实现一个压缩功能
*/
// 创建一个服务器
class Server{
    constructor(argv){
        // 为了灵活性建立配置文件config.js
        this.list = list();// 这里Server只执行一次所以不需要async,接着把数据传入模板
        this.config = Object.assign({}, config, argv)
    }
    // 调用start方法启动服务器
    start(){
       let server =  http.createServer();
       // 当客户端向服务器发送数据的时候会触发request事件
       // bind(this)希望request的this永远指向当前实例
       server.on('request', this.request.bind(this))
       server.listen(this.config.port, ()=>{
            let url = `http://${this.config.host}:${this.config.port}`
            debug(`server started at${chalk.green(url)}`);
            
       });
    }
    //静态文件服务器 显示某个目录下的静态文件
    async request(req, res){
        // 先取到客户端想访问的文件或者文件夹路径
        let {pathname} = url.parse(req.url)
        if(pathname == '/favicon.ico'){
            return this.sendError('not found', req, res)
        }
        let filepath = path.join(this.config.root, pathname)

        try{
            let statObj = await stat(filepath)
            // 判断目录还是文件
            if(statObj.isDirectory()){//文件夹的话应该显示下面的文件列表
                // 需要进入html模板，把数据传入模板中
                // 需要获取文件路径
                let files = await readdir(filepath)
                // file()这样写直接是返回, 
                files = files.map(file=>({//file是每个文件项
                    name: file,
                    url: path.join(pathname, file)
                }))
                
                // {title:'zfpx',files:[{name:'1',url:'/1'}]}; 数据格式
                // 返回一个渲染之后的html
                let html = this.list({
                    title: pathname,
                    files
                })
                //既然是字符串就要设置头
                res.setHeader('Content-Type', 'text/html')
                // 返回给客户端
                res.end(html)
            }else{// 发送文件
                this.sendFile(req, res, filepath, statObj)
            }

        }catch(e){
            debug(inspect(e));//inspect把一个对象转成字符串
            this.sendError(e, req, res)
        }
        
    }
    sendFile(req, res, filepath, statObj){
        // 如果走缓存就直接返回
        if(this.handleCache(req, res, filepath, statObj)) return;
        // mime.getType通过文件后缀拿的，先拿到文件后缀在通过文件后缀拿到文件类型，通过文件类型拿到Content-type
        res.setHeader('Content-Type', mime.getType(filepath)+';charset=utf-8;')
        let encoding = this.getEncoding(req, res);
        if(encoding){
            fs.createReadStream(filepath).pipe(encoding).pipe(res)
        }else {
            // 创建一个可读流读文件，在通过管道传给客户端
            fs.createReadStream(filepath).pipe(res)
        }
    }
    handleCache(req, res, filepath,statObj){
        // 和lastModified对比
        let ifModifiedSince = req.headers['if-modified-since']
        // 和etag对比
        let ifNoneMatch = req.headers['if-none-match']
        /**
         * 浏览器会将文件缓存到Cache目录，第二次请求时浏览器会先检查Cache目录下是否含有该文件，如果有，并且还没到Expires设置的时间，即文件还没有过期，那么此时浏览器将直接从Cache目录中读取文件，而不再发送请求Expires是服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求,这是HTTP1.0的内容，现在浏览器均默认使用HTTP1.1,所以基本可以忽略Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据,如果同时设置的话，其优先级高于Expires
        */
        res.setHeader('Cache-Control', 'private,max-age=30')
        res.setHeader('Expires', new Date(Date.now()+30*1000).toGMTString())
        let etag = statObj.size;
        let lastModified = statObj.ctime.toGMTString()// 最后修改时间
        res.setHeader('ETag', etag)
        res.setHeader('Last-Modified', lastModified)
        if(ifNoneMatch && ifNoneMatch!=etag){
            return false;
        }
        if(ifModifiedSince && ifModifiedSince!=lastModified){
            return false;
        }
        if(ifNoneMatch || ifModifiedSince){
            res.writeHead(304)
            res.end();
            return true;
        } else {
            return false;
        }

    }
    // 服务器错误处理
    sendError(err, req, res){
        res.statusCode = 500;
        res.end(`${err.toString()}`)
    }
    getEncoding(req, res){
        // 看客户端支持什么压缩类型 Accept-Encoding: gzip, deflate, br
        let acceptEncoding = req.headers['accept-encoding'];
        //如果有 gzip 创建一个转换流
        if(/\bgzip\b/.test(acceptEncoding)){
            // 告诉客户端压缩的方式
            res.setHeader('Content-Encoding', 'gzip')
            return zlib.createGzip();
        } else if(/\bdeflate\b/.test(acceptEncoding)){
            res.setHeader('Content-Encoding', 'deflate')
            return zlib.createDeflate();
        } else {
            return null;
        }

    }
}
// let server = new Server()

// server.start();// 启动服务-谁想启动调用new这个方法调用start就可以
module.exports = Server;