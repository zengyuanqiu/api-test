var exp = require('express')
var app = exp()
var qs = require('qs')
var axios = require('axios')
var bp = require('body-parser')
var count = 0

app.use(exp.static(__dirname))
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())

app.use('/proxy', (req, res) => {
    // 允许请求的操作放在回调函数顶端
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    let { body } = req
    if(!body.url) return res.send({error: 'Not find'})
 	axios(body).then(result => {
 		res.send(result.data)
 	}).catch(err => {
 		res.send(err)
 	})
    count++
    console.log('访问次数：' + count)
})
app.listen(3002, function() {
	console.log('running success to localhost:3002')
})