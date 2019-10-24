var exp = require('express')
var app = exp()
var qs = require('qs')
var axios = require('axios')
var bp = require('body-parser')
var count = 0
var date = new Date()
var day = date.getDate()

var calcCurDayCount = function() {
    var _date = new Date()
    var y = _date.getFullYear()
    var m = _date.getMonth() + 1
    var d = _date.getDate()
    var h = _date.getHours()
    var mm = _date.getMinutes()
    count = d === day ? count++ : 1
    day = d
    return count === 1 
        ? `${y}-${m}-${d} ${h}:${mm}访问，总次数为：${count}` 
        : `    ${h}:${mm}访问，总次数为：${count}`
}


app.use(exp.static(__dirname))
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())

app.use('/proxy', (req, res) => {
    // 允许请求的操作放在回调函数顶端
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    count++
    console.log(calcCurDayCount())
    let { body } = req
    if(!body.url) return res.send({error: 'Not find'})
 	axios(body).then(result => {
 		res.send(result.data)
 	}).catch(err => {
 		res.send({error: err.message})
 	})
})
app.listen(3002, function() {
	console.log('running success to localhost:3002')
})