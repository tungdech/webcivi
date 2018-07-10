const http = require('http')
const fs = require('fs');
const hostname = '0.0.0.0'
const port = 80;
const filePath = __dirname + '/accList';
const myKey = 'tung'
// Set bodyparser for using body in request
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.get('', function(req, res) {
    res.sendFile('Vien-Ha-Thu-O-Mat-Ong-Rung1.html', {root: __dirname })
});
router.post('/addInfo', function(req, res){
	var res = res; var req = req;
	console.log(req.body);
	if (!req.body) {
		res.send('error');
		return;
	}
	res.send(req.body.name)
	checkFile(filePath, function(isExist){
		if (!isExist) {
			fs.writeFile(filePath, "", 'utf8', (err) = {
			fs.appendFileSync(filePath, 'utf8', req.body.name + ", " + req.body.phone + ", " + req.body.address + '\n',
			err =>{ if (err) console.log('error file')})
			}
		} else {
			fs.appendFileSync(filePath, 'utf8', req.body.name + ", " + req.body.phone + ", " + req.body.address + '\n',
			err =>{ if (err) console.log('error file')})
		}
	})
	fs.appendFileSync(filePath, 'utf8', req.body.name + " " + req.body.phone + '\n',
	function(err){ if (err) console.log('error file')})

})

const path = require('path');
function checkFile(path, callback){
	path.exists(path, fucntion(exist){
		callback(exist)
	})
}

router.get('/get', function(req, res){
	console.log(req.params.key);
	if (req.params.key == myKey){
		let text = fs.readFileSync(filePath);
		res.send(test);
	} else {
		res.send('Sorry')
	}
})

app.use('/', router);

app.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`)
})


