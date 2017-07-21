var express = require('express');
var router = express.Router();
var sanitize = require('sanitize-filename');
var fs = require('fs');
var xlsxj = require("xlsx-to-json");
var json2csv =  require('json2csv');
var fields = ['Descrip Proveedor','Edades','Numero de Factura','Suma de Importe pendiente','Zona factura'];

//var stream=fs.createWriteStream('routes/sample.json');
//var csv=require('csvtojson');


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

router.get('/', function(req, res, next) {;
	res.sendFile(__dirname+'/output.json');
});

router.get('/table',function(req,res){
	res.render('index');
})

router.post('/sendData',function(req,res){
	console.log(req.body.date);
	var result = json2csv({data:req.body.cart,fields:fields});
	var temp='Facturas-'+req.body.date;
	//-----
	var fileName=sanitize(temp);
	var directory='C:/Users/practicanteti/SharePoint/Pruebas - Documentos/'+fileName;
	console.log(fileName);
	fs.mkdirSync(directory);
	fs.writeFile(directory+'/'+fileName+'.csv',result,function(err){
		if(err) throw err;
		console.log('file saved');
	})
	res.json({message:'data sent'});
})
module.exports = router;
