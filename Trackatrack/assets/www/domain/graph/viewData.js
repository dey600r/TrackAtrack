var viewData=new Object();

//Iniciar la tabla del usuario
viewData.initUserDetails=function() {
	//controller.setDocumentIdInnerHTML('table_id' ,userDB.getUser().id);
	controller.setDocumentIdInnerHTML('table_name' ,userDB.getUser().name);
	controller.setDocumentIdInnerHTML('table_age', userDB.getUser().age);
	controller.setDocumentIdInnerHTML('table_profession', userDB.getUser().prof);
	controller.setDocumentIdInnerHTML('table_mobile', userDB.getUser().mobile);
	controller.setDocumentIdInnerHTML('table_plataform', userDB.getUser().plat);
	controller.setDocumentIdInnerHTML('table_version', userDB.getUser().version);
};

//TABLA DE DATOS

//Iniciar la columna de servicios activados
viewData.initDeviceActivated=function() {
	if(controller.getDocumentIdChecked('checkbox-accelerometer')) 
		controller.setDocumentIdSrc('table_activatedAccel', "../images/icono_tick.png");
	else controller.setDocumentIdSrc('table_activatedAccel', "../images/icono_error.png");
    if(controller.getDocumentIdChecked('checkbox-compass')) 
    	controller.setDocumentIdSrc('table_activatedComp', "../images/icono_tick.png");
    else controller.setDocumentIdSrc('table_activatedComp', "../images/icono_error.png");
    if(controller.getDocumentIdChecked('checkbox-gps')) 
    	controller.setDocumentIdSrc('table_activatedGeo', "../images/icono_tick.png");
    else controller.setDocumentIdSrc('table_activatedGeo', "../images/icono_error.png");
    if(controller.getDocumentIdChecked('checkbox-activities')) 
    	controller.setDocumentIdSrc('table_activatedApp', "../images/icono_tick.png");
    else controller.setDocumentIdSrc('table_activatedApp', "../images/icono_error.png");
};

//Iniciar la columna de servicios ejecutandose
viewData.initDeviceRunning=function() {
	if(apiAccelerometer.getAccelerationWatch()!=null) controller.setDocumentIdSrc('table_runningAccel', "../images/icono_play.png");
	else controller.setDocumentIdSrc('table_runningAccel', "../images/icono_stop.png");
	if(apiCompass.getCompassWatch()!==null) controller.setDocumentIdSrc('table_runningComp', "../images/icono_play.png");
	else controller.setDocumentIdSrc('table_runningComp', "../images/icono_stop.png");
	if(apiGeolocation.getGeolocationWatch()!==null) controller.setDocumentIdSrc('table_runningGeo',"../images/icono_play.png");
	else controller.setDocumentIdSrc('table_runningGeo', "../images/icono_stop.png");
	if(apiAppMobile.getAppWatch()!=false) controller.setDocumentIdSrc('table_runningApp',"../images/icono_play.png");
	else controller.setDocumentIdSrc('table_runningApp', "../images/icono_stop.png");
};

//Iniciar la columna del numero de datos totales por servicio
viewData.initDeviceData=function() {
	if(accelerometerDB.getContAccelerometerDB()>1) controller.setDocumentIdInnerHTML('table_dataAccel', (accelerometerDB.getContAccelerometerDB()-accelerometerDB.getContInitAccelerometerDB()));
	if(compassDB.getContCompassDB()>1) controller.setDocumentIdInnerHTML('table_dataComp', (compassDB.getContCompassDB()-compassDB.getContInitCompassDB()));
	if(geolocationDB.getContGeolocationDB()>1) controller.setDocumentIdInnerHTML('table_dataGeo', (geolocationDB.getContGeolocationDB()-geolocationDB.getContInitGeolocationDB()));
	if(appMobileDB.getContAppDB()>1) controller.setDocumentIdInnerHTML('table_dataApp', (appMobileDB.getContAppDB()-appMobileDB.getContInitAppDB()));
};

//Iniciar la columna de errores por servicio
viewData.initDeviceError=function() {
	if(apiAccelerometer.getAccelerationError()==true) 
		controller.setDocumentIdSrc('table_errorAccel', "../images/icono_warn.png");
	else controller.setDocumentIdSrc('table_errorAccel', "");
	if(apiCompass.getCompassError()==true)
		controller.setDocumentIdSrc('table_errorComp', "../images/icono_warn.png");
	else controller.setDocumentIdSrc('table_errorComp', "");
	if(apiGeolocation.getGeolocationError()==true)
		controller.setDocumentIdSrc('table_errorGeo', "../images/icono_warn.png");
	else controller.setDocumentIdSrc('table_errorGeo', "");
	if(apiAppMobile.getAppError()==true)
		controller.setDocumentIdSrc('table_errorApp', "../images/icono_warn.png");
	else controller.setDocumentIdSrc('table_errorApp', "");
};

//Iniciar la fila de fechas
viewData.initDeviceDate=function() {
	if(accelerometerDB.getContAccelerometerDB()>1) {
		controller.setDocumentIdInnerHTML('table_dateIniAccel', accelerometerDB.getAccelerometerDateInit());
		controller.setDocumentIdInnerHTML('table_dateEndAccel', accelerometerDB.getAccelerometerDateEnd());
	}
	if(compassDB.getContCompassDB()>1) {
		controller.setDocumentIdInnerHTML('table_dateIniComp', compassDB.getCompassDateInit());
		controller.setDocumentIdInnerHTML('table_dateEndComp', compassDB.getCompassDateEnd());
	}
	if(geolocationDB.getContGeolocationDB()>1) {
		controller.setDocumentIdInnerHTML('table_dateIniGeo', geolocationDB.getGeolocationDateInit());
		controller.setDocumentIdInnerHTML('table_dateEndGeo', geolocationDB.getGeolocationDateEnd());
	}
	if(appMobileDB.getContAppDB()>1) {
		controller.setDocumentIdInnerHTML('table_dateIniApp', appMobileDB.getAppDateInit());
		controller.setDocumentIdInnerHTML('table_dateEndApp', appMobileDB.getAppDateEnd());
	}
};

//Iniciar la columna de configuracion de los servicios
viewData.initDeviceFrequency=function() {
	if(controller.getDocumentIdChecked('perf-low')) {
		controller.setDocumentIdInnerHTML('table_frequencyAccel', "1,2s");
		controller.setDocumentIdInnerHTML('table_frequencyComp', "2s");
		controller.setDocumentIdInnerHTML('table_frequencyGeo', "450m");
		controller.setDocumentIdInnerHTML('table_frequencyApp', "4,5s");
	}
    else if(controller.getDocumentIdChecked('perf-medium')) {
    	controller.setDocumentIdInnerHTML('table_frequencyAccel', "0,9s");
    	controller.setDocumentIdInnerHTML('table_frequencyComp', "1,5s");
    	controller.setDocumentIdInnerHTML('table_frequencyGeo', "300m");
    	controller.setDocumentIdInnerHTML('table_frequencyApp', "3,5s");
    }
    else if(controller.getDocumentIdChecked('perf-high')) {
    	controller.setDocumentIdInnerHTML('table_frequencyAccel', "0,6s");
    	controller.setDocumentIdInnerHTML('table_frequencyComp', "1s");
    	controller.setDocumentIdInnerHTML('table_frequencyGeo', "100m");
    	controller.setDocumentIdInnerHTML('table_frequencyApp', "2,5s");
    }
    else if(controller.getDocumentIdChecked('perf-manual')) {
    	controller.setDocumentIdInnerHTML('table_frequencyAccel', (Number(controller.getDocumentIdSelectedValue('perf-manual-accel')))+"s");
    	controller.setDocumentIdInnerHTML('table_frequencyComp', (Number(controller.getDocumentIdSelectedValue('perf-manual-comp')))+"s");
    	var option=controller.getDocumentIdSelectedValue('perf-manual-gps');
    	if(option=="walking") 
    		controller.setDocumentIdInnerHTML('table_frequencyGeo', "200m");
    	else if(option=="bicycling") 
    		controller.setDocumentIdInnerHTML('table_frequencyGeo', "500m");
    	else if(option=="driving") 
    		controller.setDocumentIdInnerHTML('table_frequencyGeo', "1000m");
    	else if(option=="advanced") 
        	controller.setDocumentIdInnerHTML('table_frequencyGeo', (Number(controller.getDocumentIdSelectedValue('perf-manual-geoDis')))+"m");
    	controller.setDocumentIdInnerHTML('table_frequencyApp', (Number(controller.getDocumentIdSelectedValue('perf-manual-app')))+"s");
    }
};