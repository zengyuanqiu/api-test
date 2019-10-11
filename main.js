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
	count++
	console.log('访问次数：' + count)
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    let {body} = req
    if(!body.isJson) {
    	let key = body.method === 'get' ? 'params' : 'data'
    	body[key] = qs.stringify(body[key])
    }
    delete body.isJson
 	axios(body).then(result => {
 		res.send(result.data)
 	}).catch(err => {
 		res.send({error: "Request failed with status code 500"})
 	})
})
app.listen(3002, function() {
	console.log('localhost:3002')
})