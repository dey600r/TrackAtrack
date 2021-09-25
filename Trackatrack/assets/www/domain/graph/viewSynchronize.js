var viewSynchronize=new Object(), limitUser, limitAccel, limitComp, limitGeo, limitApp, packageDataAuto=2000, packageData=8000, errorSynchronize=false;

//Get numero de datos que se enviaran al servidor manualmente
viewSynchronize.getPackageData=function() {
	return Number(packageData);
};

//Get numero de datos que se enviaran al servidor automaticamente
viewSynchronize.getPackageDataAuto=function() {
	return Number(packageDataAuto);
};

//Set numero de datos que se enviaran al servidor manualmente
viewSynchronize.setPackageData=function(value) {
	packageData=value;
};

//Set numero de datos que se enviaran al servidor automaticamente
viewSynchronize.setPackageDataAuto=function(value) {
	packageDataAuto=value;
};

//Get error en algun proceso de sincronizacion de datos con el servidor
viewSynchronize.getErrorSynchronize=function() {
	return errorSynchronize;
};

//Get ultimo id del usuario
viewSynchronize.getLimitUser=function() {
	return limitUser;
};

//Get ultimo dato del acelerometro
viewSynchronize.getLimitAccel=function() {
	return limitAccel;
};

//Set ultimo dato del acelerometro
viewSynchronize.setLimitAccel=function(value) {
	limitAccel=value;
};

//Get ultimo dato de la brujula
viewSynchronize.getLimitComp=function() {
	return limitComp;
};

//Set ultimo dato de la brujula
viewSynchronize.setLimitComp=function(value) {
	limitComp=value;
};

//Get ultimo dato del GPS
viewSynchronize.getLimitGeo=function() {
	return limitGeo;
};

//Set ultimo dato del GPS
viewSynchronize.setLimitGeo=function(value) {
	limitGeo=value;
};

//Get ultimo dato de las aplicaciones ejecutadas
viewSynchronize.getLimitApp=function() {
	return limitApp;
};

//Set ultimo dato de las aplicaciones ejecutadas
viewSynchronize.setLimitApp=function(value) {
	limitApp=value;
};

//Iniciar datos del movil en la interfaz
viewSynchronize.initDataMobile=function() {
	controller.setDocumentIdInnerHTML('table_idMobileUser', "id "+userDB.getUser().id);
	controller.setDocumentIdInnerHTML('table_nameMobileUser', userDB.getUser().name);
	controller.setDocumentIdInnerHTML('table_idMobileAccel', accelerometerDB.getContAccelerometerDB()-1+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateMobileAccel', accelerometerDB.getAccelerometerDateEnd());
	controller.setDocumentIdInnerHTML('table_idMobileComp', compassDB.getContCompassDB()-1+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateMobileComp', compassDB.getCompassDateEnd());
	controller.setDocumentIdInnerHTML('table_idMobileGeo', geolocationDB.getContGeolocationDB()-1+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateMobileGeo', geolocationDB.getGeolocationDateEnd());
	controller.setDocumentIdInnerHTML('table_idMobileApp', appMobileDB.getContAppDB()-1+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateMobileApp', appMobileDB.getAppDateEnd());
};

//Iniciar datos del usuario del servidor en la interfaz
viewSynchronize.initDataServerUser=function(data) {
	limitUser=data[0];
	controller.setDocumentIdInnerHTML('table_idServerUser', "id "+data[0]);
	controller.setDocumentIdInnerHTML('table_nameServerUser', data[1]);
	errorSynchronize=false;
	if(userDB.getUser().id==data[0]) {
		controller.setDocumentIdDisabled("#btn_sendUser");
		controller.setDocumentIdEnabled("#table_ServerErrorUser");
	}else {
		controller.setDocumentIdEnabled("#btn_sendUser");
		controller.setDocumentIdDisabled("#table_ServerErrorUser");
	}
};

//Iniciar datos del accelerometro del servidor en la interfaz
viewSynchronize.initDataServerAccel=function(data) {
	limitAccel=Number(data[0]);
	controller.setDocumentIdInnerHTML('table_idServerAccel', limitAccel+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateServerAccel', data[1]);
	errorSynchronize=false;
	if(accelerometerDB.getContAccelerometerDB()<=limitAccel+1) {
		controller.setDocumentIdDisabled("#btn_sendAccel");
		controller.setDocumentIdEnabled("#table_ServerErrorAccel");
	}else {
		controller.setDocumentIdEnabled("#btn_sendAccel");
		controller.setDocumentIdDisabled("#table_ServerErrorAccel");
	}
};

//Iniciar datos de la brujula del servidor en la interfaz
viewSynchronize.initDataServerComp=function(data) {
	limitComp=Number(data[0]);
	controller.setDocumentIdInnerHTML('table_idServerComp', limitComp+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateServerComp', data[1]);
	errorSynchronize=false;
	if(compassDB.getContCompassDB()<=limitComp+1) {
		controller.setDocumentIdDisabled("#btn_sendComp");
		controller.setDocumentIdEnabled("#table_ServerErrorComp");
	}else {
		controller.setDocumentIdEnabled("#btn_sendComp");
		controller.setDocumentIdDisabled("#table_ServerErrorComp");
	}
};

//Iniciar datos del GPS del servidor en la interfaz
viewSynchronize.initDataServerGeo=function(data) {
	limitGeo=Number(data[0]);
	controller.setDocumentIdInnerHTML('table_idServerGeo', limitGeo+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateServerGeo', data[1]);
	errorSynchronize=false;
	if(geolocationDB.getContGeolocationDB()<=limitGeo+1) {
		controller.setDocumentIdDisabled("#btn_sendGeo");
		controller.setDocumentIdEnabled("#table_ServerErrorGeo");
	}else {
		controller.setDocumentIdEnabled("#btn_sendGeo");
		controller.setDocumentIdDisabled("#table_ServerErrorGeo");
	}
};

//Iniciar datos de las actividades del servidor en la interfaz
viewSynchronize.initDataServerApp=function(data) {
	limitApp=Number(data[0]);
	controller.setDocumentIdInnerHTML('table_idServerApp', limitApp+" "+controller.getTraduction("lbl_data"));
	controller.setDocumentIdInnerHTML('table_dateServerApp', data[1]);
	errorSynchronize=false;
	if(appMobileDB.getContAppDB()<=limitApp+1) {
		controller.setDocumentIdDisabled("#btn_sendApp");
		controller.setDocumentIdEnabled("#table_ServerErrorApp");
	}else {
		controller.setDocumentIdEnabled("#btn_sendApp");
		controller.setDocumentIdDisabled("#table_ServerErrorApp");
	}
};

//Mostrar error de conexion con el servidor en la interfaz
viewSynchronize.showErrorGetLimit=function(device) {
	controller.setDocumentIdVisibility("error_sendData", "visible");
	controller.setDocumentIdInnerHTML('error_sendData', controller.getTraduction("error_getData"));
	errorSynchronize=true;
};

//Mostrar error al enviar datos al servidor 
viewSynchronize.showErrorInsertManual=function(device) {
	controller.setDocumentIdVisibility("error_sendData", "visible");
	controller.setDocumentIdInnerHTML('error_sendData', controller.getTraduction("error_sendData"));
};
