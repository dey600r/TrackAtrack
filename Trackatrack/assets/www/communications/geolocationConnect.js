var geolocationConnect=new Object();

//Enviamos datos del GPS al servidor en el modo automatico
geolocationConnect.insertAutoGeolocation=function(coordinatesGeo) {
	var geo=new Array(), aux, arrayAux;
	for(var i=0; i<coordinatesGeo.length; i++) { //Enviamos un numero determinado de filas en la BD para no sobrecargar la aplicacion
		aux= {idUser: userDB.getUser().id, idGeo: coordinatesGeo[i].id, latitude: coordinatesGeo[i].lat, longitude: coordinatesGeo[i].lon, altitude: coordinatesGeo[i].alt, accuracy: (Math.round(coordinatesGeo[i].pre*10)/10), speed: (Math.round(coordinatesGeo[i].spe*10)/10), date: coordinatesGeo[i].date};
		geo.push(aux);
	}
	arrayAux={json:JSON.stringify(geo)};
	var servidor='http://'+userDB.getUser().serv+'/serverInsertGeolocation.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertGeolocation.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json'
	});
};

//Preguntamos al servidor cual fue el ultimo dato enviado
geolocationConnect.getLimitGeolocation=function() {
	var id={idUser: userDB.getUser().id};
	var servidor='http://'+userDB.getUser().serv+'/serverGetLimitGeolocation.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverGetLimitGeolocation.php',
		url: servidor,
		type:'POST', 
		data: id, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos de un error de comunicacion con el servidor
			viewSynchronize.showErrorGetLimit();
			console.log("ERROR "+strError+" "+text_status);},
		timeout:10000, 
		success:function(data){ //Actualizamos datos
			if(data==null) {
				data=new Array(); 
				data[0]=0;
				data[1]=0;
			}
			viewSynchronize.initDataServerGeo(data);	
		}
	});
};

//Enviamos datos del GPS al servidor en el modo manual
geolocationConnect.insertManualGeolocation=function(coordinatesGeo) {
	var geo=new Array(), aux, arrayAux, timeError;
	for(var i=0; i<coordinatesGeo.length; i++) { //Enviamos un numero determinado de filas en la BD para no sobrecargar la aplicacion
		aux= {idUser: userDB.getUser().id, idGeo: coordinatesGeo[i].id, latitude: coordinatesGeo[i].lat, longitude: coordinatesGeo[i].lon, altitude: coordinatesGeo[i].alt, accuracy: (Math.round(coordinatesGeo[i].pre*10)/10), speed: (Math.round(coordinatesGeo[i].spe*10)/10), date: coordinatesGeo[i].date};
		geo.push(aux);
	}
	arrayAux={json:JSON.stringify(geo)};
	if(coordinatesGeo.length<5000) timeError=30000;
	else if(coordinatesGeo.length<10000) timeError=45000;
	else timeError=60000;
	var servidor='http://'+userDB.getUser().serv+'/serverInsertGeolocation.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertGeolocation.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos de un error de conexion
			viewSynchronize.showErrorInsertManual();
			console.log("ERROR: "+text_status+" "+strError);},
		timeout:timeError,
		success:function(data) {
			if(data=="ok") geolocationConnect.getLimitGeolocation();
		}
	});
	var newData=new Array(); //Actualizamos datos para mostrarlos en la interfaz
	newData[0]=coordinatesGeo[coordinatesGeo.length-1].id;
	newData[1]=coordinatesGeo[coordinatesGeo.length-1].date;
	viewSynchronize.setLimitGeo(newData[0]);
	viewSynchronize.initDataServerGeo(newData);
	navigator.notification.activityStop();
};