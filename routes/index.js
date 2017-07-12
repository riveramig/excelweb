var express = require('express');
var router = express.Router();
var fs = require('fs');
var excel2json = require('xlsx-to-json');
var xlsxj = require("xlsx-to-json");
/* GET home page. */

xlsxj({
		input: "./FacturasAPagar.xlsx",
		output: "routes/output.json"
	}, function(err, result) {
		if(err) {
			console.error(err);
		}else {
			console.log(result);
		}
	});

router.get('/', function(req, res, next) {

	res.sendFile(__dirname+'/output.json');
});

router.get('/table',function(req,res){
	res.render('index');
})
module.exports = router;
