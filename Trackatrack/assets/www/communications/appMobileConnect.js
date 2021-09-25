var appMobileConnect=new Object();

//Enviamos datos de las aplicaciones ejecutadas al servidor en modo automatico
appMobileConnect.insertAutoAppMobile=function(coordinatesApp) {
	var app=new Array(), aux, arrayAux;
	for(var i=0; i<coordinatesApp.length; i++) { //Se envia un numero determinado de filas de la BD para no sobrecargar el programa
		aux= {idUser: userDB.getUser().id, idApp: coordinatesApp[i].id, name: coordinatesApp[i].name, state: coordinatesApp[i].state, date: coordinatesApp[i].date};
		app.push(aux);
	}
	arrayAux={json:JSON.stringify(app)};
	var servidor='http://'+userDB.getUser().serv+'/serverInsertActivities.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertActivities.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json'
	});
};

//Preguntamos al servidor cual fue el ultimo dato enviado
appMobileConnect.getLimitAppMobile=function() {
	var id={idUser: userDB.getUser().id};
	var servidor='http://'+userDB.getUser().serv+'/serverGetLimitActivities.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverGetLimitActivities.php',
		url: servidor,
		type:'POST', 
		data: id, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos al usuario si ha ocurrido algun error de conexion
			viewSynchronize.showErrorGetLimit();
			console.log("ERROR "+strError+" "+text_status);},
		timeout:10000, 
		success:function(data){
			if(data==null) { //Guardamos los datos recibidos y los enviamos a la interfaz
				data=new Array();
				data[0]=0;
				data[1]=0;
			}
			viewSynchronize.initDataServerApp(data);	
		}
	});
};

//Enviamos datos de las aplicaciones ejecutadas al servidor en modo manual
appMobileConnect.insertManualAppMobile=function(coordinatesApp) {
	var app=new Array(), aux, arrayAux, timeError;
	for(var i=0; i<coordinatesApp.length; i++) { //Se envia un numero determinado de filas de la BD para no sobrecargar el programa
		aux= {idUser: userDB.getUser().id, idApp: coordinatesApp[i].id, name: coordinatesApp[i].name, state: coordinatesApp[i].state, date: coordinatesApp[i].date};
		app.push(aux);
	}
	arrayAux={json:JSON.stringify(app)};
	if(coordinatesApp.length<5000) timeError=30000;
	else if(coordinatesApp.length<10000) timeError=45000;
	else timeError=60000;
	var servidor='http://'+userDB.getUser().serv+'/serverInsertActivities.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertActivities.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos de un error en la conexion con el servidor
			viewSynchronize.showErrorInsertManual();
			console.log("ERROR: "+text_status+" "+strError);},
		timeout:timeError,
		success:function(data) {
			if(data=="ok") appMobileConnect.getLimitAppMobile();
		}
	});
	var newData=new Array(); //Guardamos datos y avisamos al usuario de que se ha terminado el proceso
	newData[0]=coordinatesApp[coordinatesApp.length-1].id;
	newData[1]=coordinatesApp[coordinatesApp.length-1].date;
	viewSynchronize.setLimitApp(newData[0]);
	viewSynchronize.initDataServerApp(newData);
	navigator.notification.activityStop();
};