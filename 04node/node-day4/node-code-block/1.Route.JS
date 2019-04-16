let express = require('express')
let app = express()
app.listen(8080)
// /user/login
let user = require('./routes/user')
app.use('/user', user)
// /article
let article = require('./routes/article')
app.use('/article', article)
