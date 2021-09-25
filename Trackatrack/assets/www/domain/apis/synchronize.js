var synchronize=new Object(), timerSynchronize, timerSendAccel, timerSendComp, timerSendGeo, timerSendApp, timerDelete, last_update="?", last_delete="?";

//Temporizador para poner en funcionamiento la sincronizacion de datos con el servidor
synchronize.startSynchronize=function() {
	if(controller.getDocumentIdSelectedValue("sinc-auto")!=0) {
		var limit=controller.getDocumentIdSelectedValue("sinc-autoData"), wait_time, options=Number(controller.getDocumentIdSelectedValue("sinc-auto"));
		var networkState;
		if(limit<1000) wait_time=5000;
		else if(limit<5000) wait_time=10000;
		else if(limit<7000) wait_time=18000;
		else if(limit<12000) wait_time=25000;
		else wait_time=30000;
		var date=new Date(), next;
		if(options>5) { //Si el intervalo de tiempo es demasiado grande y sobre pasa el modo nocturno
			if((Number(date.getHours())+options)>24) { //Recortamos horas para activar el modo nocturno
				options=26-Number(date.getHours());
			}
		}
		if(Number(date.getHours())>1 && Number(date.getHours())<7) { //Modo nocturno: Entre 1:00 y 7:00 se sincroniza cada 10 min 
			options=10*60000;
			next=(((date.getMinutes()+10)>59)?((((date.getHours()+1)<10)?"0":"")+(date.getHours()+1)):(((date.getHours()<10)?"0":"")+(date.getHours())))+":"+(((date.getMinutes()+10)>59)?((((10-(60-date.getMinutes()))<10)?"0":"")+(10-(60-date.getMinutes()))):(date.getMinutes()+10))+":"+((date.getSeconds()<10)?"0":"")+date.getSeconds()+"-"+((date.getDate()<10)?"0":"")+(date.getDate())+"/"+(((date.getMonth()+1<10)?"0":"")+(date.getMonth()+1))+"/"+date.getFullYear();
		} else { 
			next=(((date.getHours()+options)>23)?(((options-(24-date.getHours())<10)?"0":"")+(options-(24-date.getHours()))):(((date.getHours()+options<10)?"0":"")+(date.getHours()+options)))+":"+((date.getMinutes()<10)?"0":"")+date.getMinutes()+":"+((date.getSeconds()<10)?"0":"")+date.getSeconds()+"-"+((date.getHours()+options>23)?(((date.getDate()+1<10)?"0":"")+(date.getDate()+1)):((date.getDate()<10)?"0":"")+date.getDate())+"/"+(((date.getMonth()+1<10)?"0":"")+(date.getMonth()+1))+"/"+date.getFullYear();
			options*=3600000;
		}
		controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_act")+" "+next);
		controller.setDocumentIdEnabled("#footer_sinc");
	 	timerSynchronize=window.setInterval(function(){ //Temporizador de sincronizacion automatica
	 		networkState = navigator.connection.type;
			if(networkState!=Connection.UNKNOWN && networkState!=Connection.NONE && networkState!=Connection.ETHERNET && networkState!=Connection.CELL_2G) {
				var date=new Date();
				last_update=((date.getHours()<10)?"0":"")+date.getHours()+":"+((date.getMinutes()<10)?"0":"")+date.getMinutes()+":"+((date.getSeconds()<10)?"0":"")+date.getSeconds()+"-"+((date.getDate()<10)?"0":"")+date.getDate()+"/"+((date.getMonth()<9)?"0":"")+(date.getMonth()+1)+"/"+date.getFullYear();
				//Preguntamos al servidor los datos que tiene
				controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc"));
				userConnect.getUser();
	    		accelerometerConnect.getLimitAccelerometer();
	    		compassConnect.getLimitCompass();
	    		geolocationConnect.getLimitGeolocation();
	    		appMobileConnect.getLimitAppMobile();
		 		//Paramos la recogida de datos para un envio de datos mas eficiente
	    		var startOn=controller.getDocumentIdValue("btn_start");
		 		controller.setDocumentIdInnerHTML('lbl_btn_start', controller.getTraduction('btn_start'));
		 		controller.setDocumentIdValue('btn_start', "Start");
				apiAccelerometer.stopAccel();
				apiCompass.stopComp();
				apiGeolocation.stopGeo();
				apiAppMobile.stopApp();
				controller.setDocumentIdSrc('icono_fondo', "../images/icono_spy_stop.png");
				controller.setDocumentIdInnerHTML('info_data', controller.getTraduction('lbl_stop'));
				//SINCRONIZACION AUTOMATICA
				timerSendAccel=window.setInterval(function(){ //Temporizador para sincronizar accelerometro
					var networkState = navigator.connection.type;
					if(networkState!=Connection.UNKNOWN && networkState!=Connection.NONE && networkState!=Connection.ETHERNET && networkState!=Connection.CELL_2G) {
						if(viewSynchronize.getLimitUser()==0) {
							controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_user"));
							userConnect.insertUser();
						}
						controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_accel"));
						accelerometerDB.getDataLimitAccelAuto();
						timerSendComp=window.setInterval(function(){ //Temporizador para sincronizar compass
							controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_comp"));
							compassDB.getDataLimitCompAuto();
							timerSendGeo=window.setInterval(function(){ //Temporizador para sincronizar GPS
								controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_geo"));
								geolocationDB.getDataLimitGeoAuto();
								timerSendApp=window.setInterval(function(){ //Temporizador para sincronizar actividades
									controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_app"));
									appMobileDB.getDataLimitAppAuto();
									if(Number(controller.getDocumentIdSelectedValue("delete-freq-auto"))!=0) { //Borrado automatico
										var date_init=accelerometerDB.getAccelerometerDateInit().split("/")[0];
										var date_end=accelerometerDB.getAccelerometerDateEnd().split("/")[0];
										if((Number(date_init)+Number(controller.getDocumentIdSelectedValue("delete-freq-auto")))<=Number(date_end)) {
											timerDelete=window.setInterval(function(){
												var date=new Date();
												last_delete=((date.getHours()<10)?"0":"")+date.getHours()+":"+((date.getMinutes()<10)?"0":"")+date.getMinutes()+":"+((date.getSeconds()<10)?"0":"")+date.getSeconds()+"-"+((date.getDate()<10)?"0":"")+date.getDate()+"/"+((date.getMonth()<9)?"0":"")+(date.getMonth()+1)+"/"+date.getFullYear();
												synchronize.deleteDataAuto();
												window.clearInterval(timerDelete);
											}, wait_time);
										}
									}
									if(startOn=="Stop") {//Ponemos en funcionamiento la recogida de datos 
										controller.setDocumentIdInnerHTML('lbl_btn_start', controller.getTraduction('btn_stop'));
										controller.setDocumentIdValue('btn_start', "Stop");
										apiAccelerometer.takeAccel(); 
										apiCompass.takeCompass(); 
										apiGeolocation.takeGeo();
										apiAppMobile.takeApp();
										controller.setDocumentIdSrc('icono_fondo', "../images/icono_spy_play.png");
										controller.setDocumentIdInnerHTML('info_data', controller.getTraduction('lbl_start'));
									}
									controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_fin"));
									window.clearInterval(timerSendApp);
									synchronize.startSynchronize();
								}, wait_time);
								window.clearInterval(timerSendGeo);
							}, wait_time);
							window.clearInterval(timerSendComp);
						}, wait_time);
						window.clearInterval(timerSendAccel);
					} else if(controller.getDocumentIdSelectedValue("sinc-auto")!=0) {
						synchronize.startSynchronize();
					}
				}, 10000);
				window.clearInterval(timerSynchronize);
			} else {
				window.clearInterval(timerSynchronize);
				synchronize.startSynchronize();
			}
	 	}, options); 
	} else {
		controller.setDocumentIdEnabled("#footer_sinc");
		controller.setDocumentIdInnerHTML("lblFooter_synchronize", controller.getTraduction("lbl_sinc_des"));
	}
};

//Devolver algunos datos de sincronizacion
synchronize.getDataSynchronize=function() {
	var networkState = navigator.connection.type; //Detectar conexiones a internet
    var states = {}, info;
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WIFI';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.NONE]     = 'NO';
    var date=new Date();
	if(last_update==0) last_update="?";
    info=controller.getTraduction("lbl_synchronization")+": "+((Number(date.getHours())>2 && Number(date.getHours())<6)?controller.getTraduction("lbl_noct"):((controller.getDocumentIdSelectedValue("sinc-auto")!=0)?controller.getTraduction("lbl_sinc_on"):controller.getTraduction("lbl_sinc_off")))+"\n"+controller.getTraduction("lbl_connect")+": "+states[networkState]+"\n"+controller.getTraduction("lbl_lastConnect")+": "+last_update+((last_delete=="?")?"":("\n"+controller.getTraduction("lbl_lastDelete")+": "+last_delete));
    return info;
};

//Parar el temporizador de sincronizacion
synchronize.stopSynchronize=function() {
	controller.setDocumentIdInnerHTML("lblFooter_synchronize", "");
	controller.setDocumentIdDisabled("#footer_sinc");
	window.clearInterval(timerSendAccel);
	window.clearInterval(timerSendComp);
	window.clearInterval(timerSendGeo);
	window.clearInterval(timerSendApp);
	window.clearInterval(timerSynchronize);
};

//Borrar datos manualmente del movil
synchronize.deleteDataManual=function(buttonIndex) {
	if (buttonIndex==2) { //Si el usuario esta seguro de borrar datos
		var option=controller.getDocumentIdValue("delete-device-manual");
		if(option=="Accel") accelerometerDB.deleteAccelerometerDB();
		else if(option=="Comp") compassDB.deleteCompassDB();
		else if(option=="Geo") geolocationDB.deleteGeolocationDB();
		else appMobileDB.deleteAppMobileDB();
	}
};

//Borrado automatico de datos
synchronize.deleteDataAuto=function() {
	accelerometerDB.deleteAutoAccelerometerDB(); //Borrar datos del acelerometro
	compassDB.deleteAutoCompassDB(); //Borrar datos de la brujula
	geolocationDB.deleteAutoGeolocationDB(); //Borrar datos del GPS
	appMobileDB.deleteAutoAppMobileDB(); //Borrar datos de las actividades
};