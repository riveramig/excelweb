var express = require('express');
var router = express.Router();
var fs = require('fs');
var excel2json = require('xlsx-to-json');
var xlsxj = require("xlsx-to-json");
/* GET home page. */

xlsxj({
		input: "//172.16.20.6/company/Todos/PruebaPagos/FacturasAPagar.xlsx",
		output: "routes/output.json"
	}, function(err, result) {
		if(err) {
			console.error(err);
		}else {
			console.log('Data Loaded!!!');
		}
	});

router.get('/', function(req, res, next) {

	res.sendFile(__dirname+'/output.json');
});

router.get('/table',function(req,res){
	res.render('index');
})

router.get('/test',function(req,res){
	res.json({data:1});
})
module.exports = router;
