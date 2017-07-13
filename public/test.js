/*$(document).ready(function(){
	var datas={};
	$.get("http://localhost:27000/",function(data){
		for (var i = 0; i <data.length ; i++) {
			console.log(data[i]);
			$('#tbody').append('<tr>'+
				'<td>'+'<input type="checkbox" value="" class="check">'+'</td>'+
				'<td>'+data[i]['Descrip Proveedor']+'</td>'+
				'<td>'+data[i]['Numero de Factura']+'</td>'+
				'<td>'+data[i]['Zona factura']+'</td>'+
				'<td>'+data[i]['Edades']+'</td>'+
				'<td>'+data[i]['Suma de Importe pendiente']+'</td>'+
				'</tr>'
				);
		}
	});
	var checks = $('#check');
});*/