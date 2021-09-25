var compassConnect=new Object();

//Enviamos datos de la brujula al servidor en modo automatico
compassConnect.insertAutoCompass=function(coordinatesComp) {
	var comp=new Array(), aux, arrayAux;
	for(var i=0; i<coordinatesComp.length; i++) { //Enviamos un numero determinado de filas de la BD
		aux= {idUser: userDB.getUser().id, idComp: coordinatesComp[i].id, degrees: coordinatesComp[i].degrees, date: coordinatesComp[i].date};
		comp.push(aux);
	}
	arrayAux={json:JSON.stringify(comp)};
	var servidor='http://'+userDB.getUser().serv+'/serverInsertCompass.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertCompass.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json'
	});
};

//Preguntamos al servidor cual fue el ultimo dato enviado
compassConnect.getLimitCompass=function() {
	var id={idUser: userDB.getUser().id}; //Identificador del usuario
	var servidor='http://'+userDB.getUser().serv+'/serverGetLimitCompass.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverGetLimitCompass.php',
		url: servidor,
		type:'POST', 
		data: id, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos de un error de conexion con el servidor
			viewSynchronize.showErrorGetLimit();
			console.log("ERROR "+strError+" "+text_status);},
		timeout:10000, 
		success:function(data){
			if(data==null) { //Enviamos los datos recividos a la interfaz
				data=new Array();
				data[0]=0;
				data[1]=0;
			}
			viewSynchronize.initDataServerComp(data);	
		}
	});
};

//Enviamos datos de la brujula al servidor en modo manual
compassConnect.insertManualCompass=function(coordinatesComp) {
	var comp=new Array(), aux, arrayAux, timeError;
	for(var i=0; i<coordinatesComp.length; i++) { //Enviamos un numero determinado de filas de la BD
		aux= {idUser: userDB.getUser().id, idComp: coordinatesComp[i].id, degrees: coordinatesComp[i].degrees, date: coordinatesComp[i].date};
		comp.push(aux);
	}
	arrayAux={json:JSON.stringify(comp)};
	if(coordinatesComp.length<5000) timeError=30000;
	else if(coordinatesComp.length<10000) timeError=45000;
	else timeError=60000;
	var servidor='http://'+userDB.getUser().serv+'/serverInsertCompass.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverInsertCompass.php',
		url: servidor,
		type:'POST', 
		data: arrayAux, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ //Avisamos de algun error en el envio
			viewSynchronize.showErrorInsertManual();
			console.log("ERROR: "+text_status+" "+strError);},
		timeout:timeError,
		success:function(data) {
			if(data=="ok") compassConnect.getLimitCompass();
		}
	});
	var newData=new Array(); //Actualizamos datos en el dispositivo
	newData[0]=coordinatesComp[coordinatesComp.length-1].id;
	newData[1]=coordinatesComp[coordinatesComp.length-1].date;
	viewSynchronize.setLimitComp(newData[0]);
	viewSynchronize.initDataServerComp(newData);
	navigator.notification.activityStop();
};