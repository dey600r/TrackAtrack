//CREACION DE PAGINA
$('#page-home').live('pagecreate', function(event){
	var userLang = navigator.language || navigator.userLanguage; 
	 if(userLang.split("-")[0]=="es") //Traduccion al español
		 $("[data-localize]").localize("traduction", { language: "es" });
});

//INICIO DE PAGINA
$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    $('.api-div#api-exit').show();
    
    //EVENTOS DIRECTOS DEL HTML
	
    //Boton de header intro
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        document.getElementById('lbl_user_success').innerHTML=controller.getTraduction('lbl_user_success_init');
        document.getElementById('lbl_user_error').innerHTML=controller.getTraduction('lbl_user_success_init1');
        document.getElementById('lbl_user_error').className='';
        controller.setDocumentIdColor('lbl_name', "#00C20B");
        controller.setDocumentIdColor('lbl_age', "#00C20B");
        controller.setDocumentIdColor('lbl_profession', "#00C20B");
        $.mobile.silentScroll(0); 
    });
    
    //Boton de header exit
    $('#exit').click(function() {
    	navigator.notification.confirm(controller.getTraduction('lbl_exit'), exitFromApp, 'Exit', controller.getTraduction('lbl_exit_btn'));
        function exitFromApp(buttonIndex) {
            if (buttonIndex==2){ navigator.app.exitApp();}
        }
    });
    
    //Radio button del apartado de configuracion de rendimiento
    $('#perf-low').click(function() {
        document.getElementById('info_perf').innerHTML=controller.getTraduction('lbl_perf_low');
        $("#panelPerfBody").slideUp("slow");   
    });
    
    $('#perf-medium').click(function() {
        document.getElementById('info_perf').innerHTML=controller.getTraduction('lbl_perf_medium');
        $("#panelPerfBody").slideUp("slow");    
    });
    
    $('#perf-high').click(function() {
        document.getElementById('info_perf').innerHTML=controller.getTraduction('lbl_perf_high');
        $("#panelPerfBody").slideUp("slow");
    });
    
    $('#perf-manual').click(function() {
        document.getElementById('info_perf').innerHTML=controller.getTraduction('lbl_perf');
        $("#panelPerfBody").slideToggle("slow");
    });
        
    //Checkbox del apartado de configuracion de servicios
    $('#checkbox-accelerometer').click(function() {
    	checkingSelect();
    });
    
    $('#checkbox-compass').click(function() {
    	checkingSelect();
    });
    
    $('#checkbox-gps').click(function() {
    	checkingSelect();
    });
    
    $('#checkbox-activities').click(function() {
    	checkingSelect();
    });
    
    function checkingSelect() {//Si no hay ningun servicio activado avisar al usuario
    	var activar=true;
        if(document.getElementById('checkbox-accelerometer').checked) activar=false;
        if(document.getElementById('checkbox-compass').checked) activar=false;
        if(document.getElementById('checkbox-gps').checked) activar=false;
        if(document.getElementById('checkbox-activities').checked) activar=false;
        if(activar) document.getElementById('info_set').style.visibility="visible";
        else document.getElementById('info_set').style.visibility="hidden";
    }
    
    //Onclicks para la interaccion del usuario     
    $('#click-viewData').click(function() { //Click para abrir la vista resumen de datos
    	if(userDB.getContUserDB()==0) {
    		document.getElementById('info_viewUser').innerHTML=controller.getTraduction('info_viewUser');
        	document.getElementById('info_viewUser').className="";
        	document.getElementById('info_viewData').innerHTML=controller.getTraduction('info_viewData');
        	document.getElementById('info_viewData').className="";
    	}
    	else {
    		if(accelerometerDB.getContAccelerometerDB()==1 && compassDB.getContCompassDB()==1 && geolocationDB.getContGeolocationDB()==1) {
    			document.getElementById('info_viewUser').innerHTML=controller.getTraduction('info_viewUser_data');
            	document.getElementById('info_viewUser').className="help";
    			document.getElementById('info_viewData').innerHTML=controller.getTraduction('info_viewData');
            	document.getElementById('info_viewData').className="";
    		}
    		else {
    			document.getElementById('info_viewUser').innerHTML=controller.getTraduction('info_viewUser_data');
    			document.getElementById('info_viewUser').className="help";
    			document.getElementById('info_viewData').innerHTML=controller.getTraduction('info_viewData_data');
    			document.getElementById('info_viewData').className="help";
    		}
    		//Iniciar cada una de las columnas de las tablas
    		viewData.initUserDetails();
    		viewData.initDeviceActivated();
    		viewData.initDeviceRunning();
    		viewData.initDeviceData();
    		viewData.initDeviceError();
    		viewData.initDeviceDate();
    		viewData.initDeviceFrequency();
    	}
    });
    
    $('#click-accelerometer').click(function() { //Click para visualizar datos del acelerometro
    	initShadow();
        if(accelerometerDB.getContAccelerometerDB()==1) {
            document.getElementById('info_accel').innerHTML=controller.getTraduction('info_no_accel');
        	document.getElementById('info_accel').className="";
    	}
        else {
        	document.getElementById('info_accel').className="help";
        	document.getElementById('info_accel').innerHTML=controller.getTraduction('info_si_accel');
        	document.getElementById('canvasAccelerometer').addEventListener('touchstart', graphAccelerometer.touchStartAccel, false);
        	document.getElementById('canvasAccelerometer').addEventListener('touchend', graphAccelerometer.touchEndAccel, false);
        	document.getElementById('canvasAccelerometer').addEventListener('touchmove', graphAccelerometer.touchMoveAccel, false);
        	navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_loading_data'));
        	//Recoger datos de la BD y mostrar en la interfaz
        	if(apiAccelerometer.getNewDataAccelerometer()==true || graphAccelerometer.getAccelerometer()==null) {
        		accelerometerDB.getDataAccel();
        		apiAccelerometer.setNewDataAccelerometer(false);
        	}
        	else graphAccelerometer.paintImageAccel(graphAccelerometer.getAccelerometer());
        }
    });
    
    $('#click-compass').click(function() { //Click para mostrar los datos de la brujula
    	initShadow();
        if(compassDB.getContCompassDB()==1){
            document.getElementById('info_comp').innerHTML=controller.getTraduction('info_no_comp');
        	document.getElementById('info_comp').className="";
    	}
        else {
        	document.getElementById('info_comp').className="help";
        	document.getElementById('info_comp').innerHTML=controller.getTraduction('info_si_comp');
        	document.getElementById('canvasCompass').addEventListener('touchstart', graphCompass.touchStartComp, false);
        	document.getElementById('canvasCompass').addEventListener('touchend', graphCompass.touchEndComp, false);
        	document.getElementById('canvasCompass').addEventListener('touchmove', graphCompass.touchMoveComp, false);
        	navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_loading_data'));
        	//Recoger datos de la BD y mostrar en la interfaz
        	if(apiCompass.getNewDataCompass()==true || graphCompass.getCompass()==null) {
        		compassDB.getDataComp();
        		apiCompass.setNewDataCompass(false);
        	}
        	else graphCompass.paintImageComp(graphCompass.getCompass());
        }
     });
    
    $('#click-geolocation').click(function() { //Click para mostrar los datos del GPS
    	initShadow();
        if(geolocationDB.getContGeolocationDB()==1){
            document.getElementById('info_geo').innerHTML=controller.getTraduction('info_no_gps');
        	document.getElementById('info_geo').className="";
    	}
        else {
        	document.getElementById('info_geo').className="help";
        	document.getElementById('info_geo').innerHTML=controller.getTraduction('info_si_gps');
        	navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_loading_data'));
        	//Recoger datos de la BD y motrar en la interfaz
        	if(apiGeolocation.getNewDataGeolocation()==true || graphGeolocation.getGeolocation()==null) {
        		geolocationDB.getDataGeo();
        		apiGeolocation.setNewDataGeolocation(false);
        	}
        	else graphGeolocation.paintImageGeo(graphGeolocation.getGeolocation());
        }
     });
    
    $('#click-activities').click(function() { //Click para mostrar los datos de las apps ejecutadas
    	initShadow();
    	if(appMobileDB.getContAppDB()==1){
            document.getElementById('info_app').innerHTML=controller.getTraduction('info_no_app');
        	document.getElementById('info_app').className="";
    	}
    	else {
    		document.getElementById('info_app').className="help";
        	document.getElementById('info_app').innerHTML=controller.getTraduction('info_si_app');
        	navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_loading_data'));
        	//Recoger datos de la BD y mostrar en la interfaz
        	if(apiAppMobile.getNewDataApp()==true || graphAppMobile.getApps()==null) {
        		appMobileDB.getDataApp();
        		apiAppMobile.setNewDataApp(false);
        	}
        	else graphAppMobile.paintImageApp(graphAppMobile.getApps());
    	}
    });
    
    $("#click-setting").click(function() {
    	document.getElementById('info_sincSet').innerHTML=controller.getTraduction('lbl_synchronizeSetting');
    	document.getElementById('info_sincSet').className="help";
    });
    
    $("#click-server").click(function(){ //Click para mostrar los datos del servidor
    	initShadow();
    	if(userDB.getContUserDB()==0) {
    		document.getElementById('info_viewServer').innerHTML=controller.getTraduction('info_viewUser');
        	document.getElementById('info_viewServer').className="";
        	controller.setDocumentIdEnabled("#table_ServerErrorUser");
        	controller.setDocumentIdEnabled("#table_ServerErrorAccel");
        	controller.setDocumentIdEnabled("#table_ServerErrorComp");
        	controller.setDocumentIdEnabled("#table_ServerErrorGeo");
        	controller.setDocumentIdEnabled("#table_ServerErrorApp");
        	controller.setDocumentIdDisabled("#btn_sendUser");
        	controller.setDocumentIdDisabled("#btn_sendAccel");
        	controller.setDocumentIdDisabled("#btn_sendComp");
        	controller.setDocumentIdDisabled("#btn_sendGeo");
        	controller.setDocumentIdDisabled("#btn_sendApp");
    	}
    	else {
    		var networkState = navigator.connection.type;
    		if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
    			document.getElementById('info_viewServer').innerHTML=controller.getTraduction('error_connect');
            	document.getElementById('info_viewServer').className="";
            	controller.setDocumentIdInnerHTML('table_idServerUser', "-");
            	controller.setDocumentIdInnerHTML('table_nameServerUser', "-");
            	controller.setDocumentIdInnerHTML('table_idServerAccel', "-");
            	controller.setDocumentIdInnerHTML('table_dateServerAccel', "-");
            	controller.setDocumentIdInnerHTML('table_idServerComp', "-");
            	controller.setDocumentIdInnerHTML('table_dateServerComp', "-");
            	controller.setDocumentIdInnerHTML('table_idServerGeo', "-");
            	controller.setDocumentIdInnerHTML('table_dateServerGeo', "-");
            	controller.setDocumentIdInnerHTML('table_idServerApp', "-");
            	controller.setDocumentIdInnerHTML('table_dateServerApp', "-");
            	controller.setDocumentIdDisabled("#btn_sendUser");
        		controller.setDocumentIdEnabled("#table_ServerErrorUser");
        		controller.setDocumentIdDisabled("#btn_sendAccel");
        		controller.setDocumentIdEnabled("#table_ServerErrorAccel");
        		controller.setDocumentIdDisabled("#btn_sendComp");
        		controller.setDocumentIdEnabled("#table_ServerErrorComp");
        		controller.setDocumentIdDisabled("#btn_sendGeo");
        		controller.setDocumentIdEnabled("#table_ServerErrorGeo");
        		controller.setDocumentIdDisabled("#btn_sendApp");
        		controller.setDocumentIdEnabled("#table_ServerErrorApp");
    		}
    		else {
    			document.getElementById('info_viewServer').className="help";
        		document.getElementById('info_viewServer').innerHTML=controller.getTraduction('info_viewServer');
        		$("#error_sendData").slideUp("fast");
        		userConnect.getUser();
        		viewSynchronize.initDataMobile();
        		accelerometerConnect.getLimitAccelerometer();
        		compassConnect.getLimitCompass();
        		geolocationConnect.getLimitGeolocation();
        		appMobileConnect.getLimitAppMobile();
    		}
    	}
	});
    
    function initShadow() {
    	document.getElementById("btn_sendUser").style.boxShadow="none";
    	document.getElementById("btn_sendAccel").style.boxShadow="none";
    	document.getElementById("btn_sendComp").style.boxShadow="none";
    	document.getElementById("btn_sendGeo").style.boxShadow="none";
    	document.getElementById("btn_sendApp").style.boxShadow="none";
    	document.getElementById("btn_up_accel").style.boxShadow="none";
    	document.getElementById("btn_up_comp").style.boxShadow="none";
    	document.getElementById("btn_up_geo").style.boxShadow="none";
    	document.getElementById("btn_up_app").style.boxShadow="none";
    	document.getElementById("btn_zoom").style.boxShadow="none";
    }
    
    //EVENTOS DE FUNCIONALIDAD
    $(document).ready(function(){
    	 	
    	$('#btn_start').click(function() {takeOnOff();});
    	
    	/*CONFIGURACION*/
    	
    	$("#api-btn_save_data").click(function(){apiUser.saveData();});
    		
    	$("#perf-manual-gps").change(function(){clickAdvanced();});
    	
    	$("#icono_help_dist").click(function() {navigator.notification.alert(controller.getTraduction('alert_help_dist'), function(){}, "INFO");});
    	$("#icono_help_max").click(function() {navigator.notification.alert(controller.getTraduction('alert_help_max'), function(){}, "INFO");});
    	$("#icono_help_time").click(function() {navigator.notification.alert(controller.getTraduction('alert_help_time'), function(){}, "INFO");});
    	$("#icono_help_acc").click(function() {navigator.notification.alert(controller.getTraduction('alert_help_acc'), function(){}, "INFO");});
    	$("#icono_help_server").click(function() {navigator.notification.alert(controller.getTraduction('alert_help_server'), function(){}, "INFO");});
    	
    	/*ACCELEROMETRO*/
    	
    	$("#dateAccel-fromto").click(function(){
    		$("#panelDateLBodyAccel").slideUp("slow");
    	    $("#panelDateFTBodyAccel").slideDown("fast");
    	});
    	
    	$("#dateAccel-last").click(function(){
    		$("#panelDateFTBodyAccel").slideUp("slow");
    	    $("#panelDateLBodyAccel").slideDown("fast");
    	});
    	
    	$('#listCoordinate').change(function() {graphAccelerometer.paintZoomAccel(0);});
    	$('#dateFromAccel').change(function() {graphAccelerometer.paintGraphAccel();});
    	$('#dateToAccel').change(function() {graphAccelerometer.paintGraphAccel();});
    	$('#hourFromAccel').change(function() {controller.paintGraphTime(0, "Accel");});
    	$('#minFromAccel').change(function() {controller.paintGraphTime(0, "Accel");});
    	$('#hourToAccel').change(function() {controller.paintGraphTime(1, "Accel");});
    	$('#minToAccel').change(function() {controller.paintGraphTime(1, "Accel");});
    	$('#listHourAccel').change(function() {graphAccelerometer.paintGraphForDayAccel(0);});
    	$('#listDateAccel').change(function() {graphAccelerometer.paintGraphForDayAccel(1);});
    	$('#image_izqA').click(function() {graphAccelerometer.touchZoomRepaintAccel(1);});
    	$('#image_derA').click(function() {graphAccelerometer.touchZoomRepaintAccel(2);});
    	$('#transp_buttonA1').click(function() {graphAccelerometer.paintZoomAccel(1);});
    	$('#transp_buttonA2').click(function() {graphAccelerometer.paintZoomAccel(2);});
    	$('#transp_buttonA3').click(function() {graphAccelerometer.paintZoomAccel(3);});
    	$('#transp_buttonA4').click(function() {graphAccelerometer.paintZoomAccel(4);});
    	$('#transp_buttonA5').click(function() {graphAccelerometer.paintZoomAccel(5);});
    	$('#transp_buttonA6').click(function() {graphAccelerometer.paintZoomAccel(6);});
    	$('#transp_buttonA7').click(function() {graphAccelerometer.paintZoomAccel(7);});
    	$('#btn_up_accel').mousedown(function() {document.getElementById("btn_up_accel").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_up_accel').mouseup(function() {$.mobile.silentScroll(0);});
    	
    	/*BRUJULA*/
    	
    	$("#dateComp-fromto").click(function(){
    		$("#panelDateLBodyComp").slideUp("slow");
    	    $("#panelDateFTBodyComp").slideDown("fast");
    	});
    	
    	$("#dateComp-last").click(function(){
    		$("#panelDateFTBodyComp").slideUp("slow");
    	    $("#panelDateLBodyComp").slideDown("fast");
    	});
    	
    	$('#listImage').change(function() {graphCompass.paintZoomComp(0);});
    	$('#dateFromComp').change(function() {graphCompass.paintGraphComp();});
    	$('#dateToComp').change(function() {graphCompass.paintGraphComp();});
    	$('#hourFromComp').change(function() {controller.paintGraphTime(0, "Comp");});
    	$('#minFromComp').change(function() {controller.paintGraphTime(0, "Comp");});
    	$('#hourToComp').change(function() {controller.paintGraphTime(1, "Comp");});
    	$('#minToComp').change(function() {controller.paintGraphTime(1, "Comp");});
    	$('#listHourComp').change(function() {graphCompass.paintGraphForDayComp(0);});
    	$('#listDateComp').change(function() {graphCompass.paintGraphForDayComp(1);});
    	$('#image_izqC').click(function() {graphCompass.touchZoomRepaintComp(1);});
    	$('#image_derC').click(function() {graphCompass.touchZoomRepaintComp(2);});
    	//$('#zoom_label').click(function() {graphCompass.touchZoom();});
    	//$('#icono_zoom').click(function() {graphCompass.touchZoom();});
    	$('#btn_zoom').mousedown(function() {document.getElementById("btn_zoom").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_zoom').mouseup(function() {graphCompass.touchZoom();});
    	$('#transp_buttonC1').click(function() {graphCompass.paintZoomComp(1);});
    	$('#transp_buttonC2').click(function() {graphCompass.paintZoomComp(2);});
    	$('#transp_buttonC3').click(function() {graphCompass.paintZoomComp(3);});
    	$('#transp_buttonC4').click(function() {graphCompass.paintZoomComp(4);});
    	$('#transp_buttonC5').click(function() {graphCompass.paintZoomComp(5);});
    	$('#transp_buttonC6').click(function() {graphCompass.paintZoomComp(6);});
    	$('#transp_buttonC7').click(function() {graphCompass.paintZoomComp(7);});
    	$('#btn_up_comp').mousedown(function() {document.getElementById("btn_up_comp").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_up_comp').mouseup(function() {$.mobile.silentScroll(0);});
    	
    	/*GEOLOCALIZACION*/
    	
    	$("#dateGeo-fromto").click(function(){
    		$("#panelDateLBodyGeo").slideUp("slow");
    	    $("#panelDateFTBodyGeo").slideDown("fast");
    	});
    	
    	$("#dateGeo-last").click(function(){
    		$("#panelDateFTBodyGeo").slideUp("slow");
    	    $("#panelDateLBodyGeo").slideDown("fast");
    	});
    	
    	$("#fromGeo").click(function(){
    	    $("#panelDateBody").slideToggle("slow");
    	});
    	
    	$('#travel_mode').change(function() {
    		init();
    		var data_select=document.getElementById('travel_mode').selectedIndex;
    	    if(document.getElementById('travel_mode').options[data_select].value=="points") {
    	    	$("#panelPointsGeo").slideDown("slow");
    	    	$("#panelRouteGeo").slideUp("fast");
    	    	$('#panelAreaGeo').slideUp("fast");
    	    	$('#panelGpsPoints').slideDown("slow");
    	    	$('#panelGpsRoute').slideUp("slow");
    	    	$('#panelGpsArea').slideUp("slow");
    	    }else if(document.getElementById('travel_mode').options[data_select].value=="route") {
    	    	$("#panelRouteGeo").slideDown("slow");
    	    	$("#panelPointsGeo").slideUp("fast");
    	    	$('#panelAreaGeo').slideUp("fast");
    	    	$('#panelGpsRoute').slideDown("slow");
    	    	$('#panelGpsPoints').slideUp("slow");
    	    	$('#panelGpsArea').slideUp("slow");
    	    }else if(document.getElementById('travel_mode').options[data_select].value=="area") {
    	    	$("#panelAreaGeo").slideDown("slow");
    	    	$("#panelRouteGeo").slideUp("fast");
    	    	$('#panelPointsGeo').slideUp("fast");
    	    	$('#panelGpsArea').slideDown("slow");
    	    	$('#panelGpsRoute').slideUp("slow");
    	    	$('#panelGpsPoints').slideUp("slow");
    	    }
    	    graphGeolocation.repaint();
    	});
    	
    	$('#dateFromGeo').change(function() {init(); graphGeolocation.paintGraphGeo();});
    	$('#dateToGeo').change(function() {init(); graphGeolocation.paintGraphGeo();});
    	$('#listHourGeo').change(function() {init(); graphGeolocation.paintGraphForDayGeo(0);});
    	$('#listDateGeo').change(function() {init(); graphGeolocation.paintGraphForDayGeo(1);});
    	$('#hourFromGeo').change(function() {init(); controller.paintGraphTime(0, "Geo");});
    	$('#minFromGeo').change(function() {init(); controller.paintGraphTime(0, "Geo");});
    	$('#hourToGeo').change(function() {init(); controller.paintGraphTime(1, "Geo");});
    	$('#minToGeo').change(function() {init(); controller.paintGraphTime(1, "Geo");});
    	$('#sistem_type_points').change(function() {init(); graphGeolocation.repaint();});
    	$('#sistem_type_route').change(function() {init(); graphGeolocation.repaint();});
    	$('#sistem_type_area').change(function() {init(); graphGeolocation.repaint();});
    	$('#btn_up_geo').mousedown(function() {document.getElementById("btn_up_geo").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_up_geo').mouseup(function() {$.mobile.silentScroll(0);});
    	
    	function init() { //Ocultar ventanas de informacion de puntos
    		$('#overlay2').slideUp("slow");
			$('#overlay').slideUp("slow");
    	}
    	
    	$('#id_exit_gps').click(function() {
    		$('#overlay').slideUp("slow");
    		controller.getMarker().setAnimation(null);
    	});
    	
    	$('#id_exit_gps2').click(function() {
    		$('#overlay2').slideUp("slow");
    		controller.getMarker().setAnimation(null);
    	});
    	
    	$('#id_info_gps').click(function() {getAddress();});
    	$('#id_info_gps2').click(function() {getAddress();});
    	
    	function getAddress() { //Obtener una direccion a partir de una localizacion formada por latitud y longitud
    		var geocoder = new google.maps.Geocoder(), pos=controller.getMarker().getPosition();
    		geocoder.geocode({
    		    latLng: pos,
    		  }, function(responses) {
    		    if (responses && responses.length > 0) {
    		      navigator.notification.alert(responses[0].formatted_address, function(){}, "INFO");
    		    } else {
    		      alert(controller.getTraduction('alert_address'));
    		    }
    		  });
    	}
    	
    	/*APLICACIONES EJECUTADAS*/
    	
    	$("#dateApp-fromto").click(function(){
    		$("#panelDateLBodyApp").slideUp("slow");
    	    $("#panelDateFTBodyApp").slideDown("fast");
    	});
    	
    	$("#dateApp-last").click(function(){
    		$("#panelDateFTBodyApp").slideUp("slow");
    	    $("#panelDateLBodyApp").slideDown("fast");
    	});
    	
    	$('#dateFromApp').change(function() {graphAppMobile.paintGraphApp();});
    	$('#dateToApp').change(function() {graphAppMobile.paintGraphApp();});
    	$('#hourFromApp').change(function() {controller.paintGraphTime(0, "App");});
    	$('#minFromApp').change(function() {controller.paintGraphTime(0, "App");});
    	$('#hourToApp').change(function() {controller.paintGraphTime(1, "App");});
    	$('#minToApp').change(function() {controller.paintGraphTime(1, "App");});
    	$('#listHourApp').change(function() {graphAppMobile.paintGraphForDayApp(0);});
    	$('#listDateApp').change(function() {graphAppMobile.paintGraphForDayApp(1);});
    	$('#listModeAppTrac').change(function() {initTableApp('listModeAppTrac'); graphAppMobile.repaintGraphApp();});
    	$('#listModeAppSum').change(function() {initTableApp('listModeAppSum'); graphAppMobile.repaintGraphApp();});
    	$('#btn_up_app').mousedown(function() {document.getElementById("btn_up_app").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_up_app').mouseup(function() {$.mobile.silentScroll(0);});
    	
    	$('#listModeApp').change(function() {
    		var data_select=document.getElementById('listModeApp').selectedIndex;
    	    if(document.getElementById('listModeApp').options[data_select].value=="Tracing") {
    	    	$("#panelModeAppTrac").slideDown("slow");
    	    	$("#panelModeAppSum").slideUp("fast");
    	    	initTableApp('listModeAppTrac');
    	    }else if(document.getElementById('listModeApp').options[data_select].value=="Summary") {
    	    	$("#panelModeAppTrac").slideUp("slow");
    	    	$("#panelModeAppSum").slideDown("fast");
    	    	initTableApp('listModeAppSum');
    	    }
    	    graphAppMobile.repaintGraphApp();
    	});
    	
    	function initTableApp(id){ //Ocultar botonos para mostrar diferentes graficos de las aplicaciones ejecutadas
    		var data_select=document.getElementById(id).selectedIndex;
    	    if(document.getElementById(id).options[data_select].value=="Table" || document.getElementById(id).options[data_select].value=="All") {
    	    	$("#table_summaryApp").slideDown("fast");
    	    	document.getElementById('graphApp').style.display="none";
    	    	document.getElementById('graphAppAux').style.display="none";
    	    } else {
    	    	$("#table_summaryApp").slideUp("fast");
    	    	document.getElementById('graphApp').style.display="block";
    	    	data_select=document.getElementById(id).selectedIndex;
        	    if(document.getElementById(id).options[data_select].value=="Pie" || document.getElementById(id).options[data_select].value=="Rows") 
        	    	document.getElementById('graphAppAux').style.display="block";
        	    else document.getElementById('graphAppAux').style.display="none";
    	    }
    	}
    	
    	/*SYNCHRONIZED*/
    	
    	$("#btn_delete").click(function() {
    		if(userDB.getContUserDB()==0) {
        		document.getElementById('info_sincSet').innerHTML=controller.getTraduction('info_viewUser');
            	document.getElementById('info_sincSet').className="";
        	}
        	else {
        		var networkState = navigator.connection.type;
        		if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
        			document.getElementById('info_sincSet').innerHTML=controller.getTraduction('error_connect');
                	document.getElementById('info_sincSet').className="";
        		}
        		else {
        			document.getElementById('info_sincSet').innerHTML=controller.getTraduction('lbl_synchronizeSetting');
                	document.getElementById('info_sincSet').className="help";
                	var option=controller.getDocumentIdValue("delete-device-manual");
                	var perc=controller.getDocumentIdSelectedValue("delete-manual");
                	if(option=="Accel") {
                		accelerometerConnect.getLimitAccelerometer();
                		navigator.notification.confirm(controller.getTraduction('lbl_delete')+" "+perc+"% "+controller.getTraduction('lbl_delete2')+controller.getTraduction("lbl_delete3")+" "+controller.getTraduction("lbl_accel")+controller.getTraduction("lbl_delete6"), synchronize.deleteDataManual, controller.getTraduction('lbl_warning'), controller.getTraduction('lbl_exit_btn'));
                	} else if(option=="Comp") {
                		compassConnect.getLimitCompass();
                		navigator.notification.confirm(controller.getTraduction('lbl_delete')+" "+perc+"% "+controller.getTraduction('lbl_delete2')+controller.getTraduction("lbl_delete4")+" "+controller.getTraduction("lbl_comp")+controller.getTraduction("lbl_delete6"), synchronize.deleteDataManual, controller.getTraduction('lbl_warning'), controller.getTraduction('lbl_exit_btn'));
                	} else if(option=="Geo") {
                		geolocationConnect.getLimitGeolocation();
                		navigator.notification.confirm(controller.getTraduction('lbl_delete')+" "+perc+"% "+controller.getTraduction('lbl_delete2')+controller.getTraduction("lbl_delete3")+" GPS"+controller.getTraduction("lbl_delete6"), synchronize.deleteDataManual, controller.getTraduction('lbl_warning'), controller.getTraduction('lbl_exit_btn'));
                	} else {
                		appMobileConnect.getLimitAppMobile();
                		navigator.notification.confirm(controller.getTraduction('lbl_delete')+" "+perc+"% "+controller.getTraduction('lbl_delete2')+controller.getTraduction("lbl_delete5")+" "+controller.getTraduction("lbl_app")+controller.getTraduction("lbl_delete6"), synchronize.deleteDataManual, controller.getTraduction('lbl_warning'), controller.getTraduction('lbl_exit_btn'));
                	}
        		}
        	}
    	});
    	
    	$("#sinc-manual").change(function() {
    		var limit=controller.getDocumentIdSelectedValue("sinc-manual");
    		if(limit>=25000) 
    			alert(controller.getTraduction("alert_dataAmount"));
    		viewSynchronize.setPackageData(limit);
    	});
    	
    	$("#sinc-autoData").change(function() {
    		var limit=controller.getDocumentIdSelectedValue("sinc-autoData");
    		if(limit>=15000) 
    			alert(controller.getTraduction("alert_dataAmount"));
    		viewSynchronize.setPackageDataAuto(limit);
    	});
    	
    	
    	$("#icono_help_sinc").click(function() {
    		alert(synchronize.getDataSynchronize());
    	});
    	
    	$('#btn_sendUser').mousedown(function() {document.getElementById("btn_sendUser").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_sendUser').mouseup(function() {
    		document.getElementById("btn_sendApp").style.boxShadow="none";
    		document.getElementById("btn_sendAccel").style.boxShadow="none";
    		document.getElementById("btn_sendComp").style.boxShadow="none";
    		document.getElementById("btn_sendGeo").style.boxShadow="none";
    		if(viewSynchronize.getErrorSynchronize()==false) {
    			document.getElementById('error_sendData').style.visibility="hidden";
    			userConnect.insertUser();
    			userConnect.getUser();
    		}
    	});
    	
    	$('#btn_sendAccel').mousedown(function() {document.getElementById("btn_sendAccel").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_sendAccel').mouseup(function() {
    		document.getElementById('error_sendData').style.visibility="hidden";
    		if(viewSynchronize.getLimitUser()==0) alert(controller.getTraduction("error_serverUser"));
    		else if(viewSynchronize.getErrorSynchronize()==false) {
    			if((accelerometerDB.getContAccelerometerDB()-viewSynchronize.getLimitAccel())>30) navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_sending_data'));
    			accelerometerDB.getDataLimitAccel();
    		}
    		document.getElementById("btn_sendUser").style.boxShadow="none";
    		document.getElementById("btn_sendApp").style.boxShadow="none";
    		document.getElementById("btn_sendComp").style.boxShadow="none";
    		document.getElementById("btn_sendGeo").style.boxShadow="none";
    	});
    	
    	$('#btn_sendComp').mousedown(function() {document.getElementById("btn_sendComp").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_sendComp').mouseup(function() {
    		document.getElementById('error_sendData').style.visibility="hidden";
    		if(viewSynchronize.getLimitUser()==0) alert(controller.getTraduction("error_serverUser"));
    		else if(viewSynchronize.getErrorSynchronize()==false) {
    			if((compassDB.getContCompassDB()-viewSynchronize.getLimitComp())>30) navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_sending_data'));
    			compassDB.getDataLimitComp();
    		}
    		document.getElementById("btn_sendUser").style.boxShadow="none";
    		document.getElementById("btn_sendAccel").style.boxShadow="none";
    		document.getElementById("btn_sendApp").style.boxShadow="none";
    		document.getElementById("btn_sendGeo").style.boxShadow="none";
    	});
    	
    	$('#btn_sendGeo').mousedown(function() {document.getElementById("btn_sendGeo").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_sendGeo').mouseup(function() {
    		document.getElementById('error_sendData').style.visibility="hidden";
    		if(viewSynchronize.getLimitUser()==0) alert(controller.getTraduction("error_serverUser"));
    		else if(viewSynchronize.getErrorSynchronize()==false) {
    			if((geolocationDB.getContGeolocationDB()-viewSynchronize.getLimitGeo())>30) navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_sending_data'));
    			geolocationDB.getDataLimitGeo();
    		}
    		document.getElementById("btn_sendUser").style.boxShadow="none";
    		document.getElementById("btn_sendAccel").style.boxShadow="none";
    		document.getElementById("btn_sendComp").style.boxShadow="none";
    		document.getElementById("btn_sendApp").style.boxShadow="none";
    	});
    	
    	$('#btn_sendApp').mousedown(function() {document.getElementById("btn_sendApp").style.boxShadow="-1px -1px 15px #5f9cc5";});
    	$('#btn_sendApp').mouseup(function() {
    		document.getElementById('error_sendData').style.visibility="hidden";
    		if(viewSynchronize.getLimitUser()==0) alert(controller.getTraduction("error_serverUser"));
    		else if(viewSynchronize.getErrorSynchronize()==false) {
    			if((appMobileDB.getContAppDB()-viewSynchronize.getLimitApp())>30) navigator.notification.activityStart(controller.getTraduction('alert_loading'), controller.getTraduction('alert_sending_data'));
    			appMobileDB.getDataLimitApp();
    		}
    		document.getElementById("btn_sendUser").style.boxShadow="none";
    		document.getElementById("btn_sendAccel").style.boxShadow="none";
    		document.getElementById("btn_sendComp").style.boxShadow="none";
    		document.getElementById("btn_sendGeo").style.boxShadow="none";
    	});
    	
    });
     
    $('#btn_show_gyro').click(function() {
        if(document.getElementById('listImage').selectedIndex==0) 
            document.getElementById('lbl_gyro').innerHTML="GRAPH";
        else document.getElementById('lbl_gyro').innerHTML="COMPASS";
    });
    
    //EVENTOS DE FUNCIONAMIENTO DE LA INTERFAZ
    
    $('#btn_start').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);   
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        $('.api-div').hide();
        $(api).show();

        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});


