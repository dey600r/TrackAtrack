var accelerometerConnect=new Object();

//Enviar datos del acelerometro al servidor en el modo automatico
accelerometerConnect.insertAutoAccelerometer=function(coordinatesAccel) {
	var accel = new Array(), aux, arrayAux;
	for(var i=0; i<coordinatesAccel.length; i++) { //Enviamos un numero determinado de filas de la BD para no sobrecargar el programa
		aux= {idUser: userDB.getUser().id, idAccel: coordinatesAccel[i].id, x: coordinatesAccel[i].x, y: coordinatesAccel[i].y, z: coordinatesAccel[i].z, date: coordinatesAccel[i].date};
		accel.push(aux);
	}
	var servidor='http://'+userDB.getUser().serv+'/serverInsertAccelerometer.php';
	arrayAux={json:JSON.stringify(accel)};
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertAccelerometer.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json'
	});
}; 

//Pregunta al servidor cual es el ultimo dato que ha sido enviado
accelerometerConnect.getLimitAccelerometer=function() {
	var id={idUser: userDB.getUser().id}; //Identificador del usuario para que el servidor busque sus datos en su BD
	var servidor='http://'+userDB.getUser().serv+'/serverGetLimitAccelerometer.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverGetLimitAccelerometer.php',
		url: servidor,
		type:'POST', 
		data: id, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ 
			viewSynchronize.showErrorGetLimit(); //Avisamos al usuario de un error en la conexion con el servidor
			console.log("ERROR "+strError+" "+text_status);},
		timeout:10000, 
		success:function(data){ //Mostramos datos al usuario
			if(data==null) {
				data=new Array();
				data[0]=0;
				data[1]=0;
			}
			viewSynchronize.initDataServerAccel(data);	
		}
	});
};

//Enviamos datos del accelerometro al servidor en el modo manual
accelerometerConnect.insertManualAccelerometer=function(coordinatesAccel) {
	var accel = new Array(), aux, arrayAux, timeError;
	for(var i=0; i<coordinatesAccel.length; i++) { //Enviamos un numero determinado de filas de la BD para no sobrecargar el programa
		aux= {idUser: userDB.getUser().id, idAccel: coordinatesAccel[i].id, x: coordinatesAccel[i].x, y: coordinatesAccel[i].y, z: coordinatesAccel[i].z, date: coordinatesAccel[i].date};
		accel.push(aux);
	}
	arrayAux={json:JSON.stringify(accel)};
	if(coordinatesAccel.length<5000) timeError=30000;
	else if(coordinatesAccel.length<10000) timeError=45000;
	else timeError=60000;
	var servidor='http://'+userDB.getUser().serv+'/serverInsertAccelerometer.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertAccelerometer.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos al usuario de un error de envio al servidor
			viewSynchronize.showErrorInsertManual();
			console.log("ERROR: "+text_status+" "+strError);},
		timeout:timeError,
		success:function(data) {
			if(data=="ok") accelerometerConnect.getLimitAccelerometer();
		}
	});
	var newData=new Array(); //Guardamos datos y avisamos a la interfaz de que se ha terminado el proceso
	newData[0]=coordinatesAccel[coordinatesAccel.length-1].id;
	newData[1]=coordinatesAccel[coordinatesAccel.length-1].date;
	viewSynchronize.setLimitAccel(newData[0]);
	viewSynchronize.initDataServerAccel(newData);
	navigator.notification.activityStop();
};