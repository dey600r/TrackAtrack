document.addEventListener("deviceready", onDeviceReady, false);

//Phonegap esta listo para usarse
function onDeviceReady() {
	traductionDB.createTraductionDB(); //Acceso a la BD para traducir
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.getElementById('btn_start').value="Start";
	//document.addEventListener("resume", onResume, false);
	//document.addEventListener("pause", onPause, false);
	window.addEventListener('orientationchange', updateOrientation);
	window.addEventListener("batterycritical", onBatteryCritical, false);
	navigator.globalization.getPreferredLanguage( //Idioma del movil
	     function (language) {
	       	controller.setLanguage(language.value);
	        },
	        function () {}
	      );
}

//Salir de la app
function onBackKeyDown() {
	navigator.notification.confirm(controller.getTraduction('lbl_exit'), exitFromApp, 'Exit', controller.getTraduction('lbl_exit_btn'));
}
 
//Salir de la app
function exitFromApp(buttonIndex) {
   	if (buttonIndex==2){
   		stopAll();
   		navigator.app.exitApp();
   	}
}    

function stopAll() {
	var appBattery=new Array(); //Guardamos que se apaga la aplicacion
    appBattery.push({name: "Trackatrack", state: "Closed"});
    appMobileDB.insertarAppDB(appBattery);
	apiAccelerometer.stopAccel();
	apiAccelerometer.stopAccel();
	apiCompass.stopComp();
	apiGeolocation.stopGeo();
	apiAppMobile.stopApp();
	synchronize.stopSynchronize();
}
	
//Bateria critica se para la app
function onBatteryCritical(info) {
	var appBattery=new Array(); //Guardamos que puede que el movil se apague
    appBattery.push({name: "Battery", state: "Critical"});
    appMobileDB.insertarAppDB(appBattery);
	apiAccelerometer.stopAccel();
	apiCompass.stopComp();
   	apiGeolocation.stopGeo();
   	apiAppMobile.stopApp();
   	synchronize.stopSynchronize();
   	alert(controller.getTraduction('lbl_battery') + info.level + "%. "+controller.getTraduction('lbl_battery_stop'));
   	document.getElementById('icono_fondo').src="../images/icono_spy_stop.png";
    document.getElementById('lbl_btn_start').innerHTML=controller.getTraduction('btn_start');
	document.getElementById('btn_start').value="Start";
}
  
function clickAdvanced() {
	var data_select=document.getElementById('perf-manual-gps').selectedIndex, option;
	option=document.getElementById('perf-manual-gps').options[data_select].value;
	if(option=="advanced") $("#panelGpsBody").slideDown("slow");
	else $("#panelGpsBody").slideUp("slow");
}

//Poner en marcha la aplicacion
function takeOnOff() {
	//Si hay un usuario y hay servicios activados
	if(userDB.getContUserDB()>0) { 
		if(document.getElementById('checkbox-accelerometer').checked==true || document.getElementById('checkbox-compass').checked==true || document.getElementById('checkbox-gps').checked==true || document.getElementById('checkbox-activities').checked==true) {
			if(document.getElementById('btn_start').value=="Start") {
				document.getElementById('lbl_btn_start').innerHTML=controller.getTraduction('btn_stop');
				document.getElementById('btn_start').value="Stop";
				apiAccelerometer.takeAccel(); 
				apiCompass.takeCompass(); 
				apiGeolocation.takeGeo();
				apiAppMobile.takeApp();
				synchronize.startSynchronize();
				document.getElementById('icono_fondo').src="../images/icono_spy_play.png";
				document.getElementById('info_data').innerHTML=controller.getTraduction('lbl_start');
			}else {
				document.getElementById('lbl_btn_start').innerHTML=controller.getTraduction('btn_start');
				document.getElementById('btn_start').value="Start";
				apiAccelerometer.stopAccel();
				apiCompass.stopComp();
				apiGeolocation.stopGeo();
				apiAppMobile.stopApp();
				synchronize.stopSynchronize();
				document.getElementById('icono_fondo').src="../images/icono_spy_stop.png";
				document.getElementById('info_data').innerHTML=controller.getTraduction('lbl_stop');
			}
		} else alert(controller.getTraduction('alert_no_dev'));
	} else alert(controller.getTraduction('alert_no_det'));
}

function onResume() {
	apiAccelerometer.stopAccel();
	apiCompass.stopComp();
    apiGeolocation.stopGeo();
    apiAppMobile.stopApp();
    document.getElementById('icono_fondo').src="../images/icono_spy_stop.png";
}
        
function onPause() {
	//apiAccelerometer.takeAccel(); 
    //apiCompass.takeCompass(); 
    //apiGeolocation.takeGeo();
	//apiAppMobile.takeApp();
    //document.getElementById('icono_fondo').src="../images/icono_spy_play.png";
}

//Evento de giro del dispositivo
function updateOrientation() {
	switch(window.orientation) {
		case 0:
    		document.getElementById('mimapa').className='portMap';
   			if(document.getElementById('canvasCompass').className=='landComp')
   				document.getElementById('canvasCompass').className='portComp';
    		break;
    	case 90:
    		document.getElementById('mimapa').className='landMap';
    		if(document.getElementById('canvasCompass').className=='portComp')
   				document.getElementById('canvasCompass').className='landComp';
   			break;
    	case 180:
    		document.getElementById('mimapa').className='portMap';
    		if(document.getElementById('canvasCompass').className=='landComp')
   				document.getElementById('canvasCompass').className='portComp';
   			break;
    	case -90:
    		document.getElementById('mimapa').className='landMap';
    		if(document.getElementById('canvasCompass').className=='portComp')
   				document.getElementById('canvasCompass').className='landComp';
   			break;		
	}  
}