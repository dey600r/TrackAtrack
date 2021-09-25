//ACTIVIDAD DEL MOVIL (APLICACIONES EJECUTADAS)
var apiAppMobile=new Object(), appRun=new Array(), oldApps=new Array(), newDataApp=false, appWatch=false, appError=false, timer;

//Get sensor app
apiAppMobile.getAppWatch=function() {
	return appWatch;
};

//Get nuevos datos de actividad app
apiAppMobile.getNewDataApp=function() {
	return newDataApp;
};

//Set nuevos datos de actividad app
apiAppMobile.setNewDataApp=function(value) {
	newDataApp=value;
};

//Set error actividad app
apiAppMobile.setAppError=function(error) {
	appError=error;
};

//Get error actividad app
apiAppMobile.getAppError=function(error) {
	return appError;
};

//Activar actividad app
apiAppMobile.takeApp=function() {
	if(controller.getDocumentIdChecked('checkbox-activities')) { //Si el usuario ha activado este servicio
        if (appWatch == false) {
        	oldApps[0]=0;
        	appWatch=true;
        	newDataApp=true;
        	var options; //Detectamos la configuracion del usuario
            if(controller.getDocumentIdChecked('perf-low')) options= 4500;
            else if(controller.getDocumentIdChecked('perf-medium')) options= 3500;
            else if(controller.getDocumentIdChecked('perf-high')) options= 2500;
            else if(controller.getDocumentIdChecked('perf-manual')) 
            	options= (Number(controller.getDocumentIdSelectedValue('perf-manual-app'))*1000);
            else options= 3000;
            var appOn=new Array(); //Guardamos cuando se puso en funcionamiento la app
            appOn.push({name: "Trackatrack", state: "On"});
            appMobileDB.insertarAppDB(appOn);
            //Comunicacion con android para detectar aplicaciones abiertas cada 'x' tiempo
        	timer=window.setInterval(function(){
        	cordova.exec(function(app){
        		appRun=app;
				}, function(error){
					//alert("Detector app running ERROR, restart app"); 
					appError=true;
					}, "PluginAppLauncher", "echo", ["echo"]);
        	var appDB=new Array();
        	var networkState = navigator.connection.type; //Detectar conexiones a internet
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.NONE]     = 'No network connection';
            appRun.push({name: states[networkState], run: true, back: false, scr: false});
        	for(var i=0; i<appRun.length; i++) { //Detectar el estado de la aplicacion abierta
        		if(oldApps[0]!=0) {
        			if(newAppChange(oldApps, appRun[i])==true) {
        				//console.log(appRun[i].name+" "+appRun[i].run+" "+appRun[i].scr);
        				if(appRun[i].run==true) {
        					if(appRun[i].scr==false) appDB.push({name: appRun[i].name, state: "Opened"});
        					else appDB.push({name: appRun[i].name, state: "ScreenOff"});
        				}
        				else if(appRun[i].run==false && appRun[i].back==true && appRun[i].scr==false) appDB.push({name: appRun[i].name, state: "Background"});
        				else if(appRun[i].run==false && appRun[i].back==false && appRun[i].scr==false) appDB.push({name: appRun[i].name, state: "Closed"});
        				else if(appRun[i].scr==false) appDB.push({name: appRun[i].name, state: "Thread"});
        			}
        		}
        	}
        	if(oldApps[0]==0) appDB.push({name: states[networkState], state: "Opened"});
        	appMobileDB.insertarAppDB(appDB); //Guardamos aplicaciones detectadas
        	oldApps=appRun;
        	}, options);
        }
	}
};

//Parar actividad app
apiAppMobile.stopApp=function() {
	if (appWatch == true) {
		var appOn=new Array(); //Guardamos cuando se paro la app
        appOn.push({name: "Trackatrack", state: "Off"});
        appMobileDB.insertarAppDB(appOn);
		appWatch=false;
		newDataApp=true;
		window.clearInterval(timer);
	}
};

//Funcion de ayuda para detectar cambios en las apps abiertas por el usuario
function newAppChange(oldApps, app) {
	for(var i=0; i<oldApps.length; i++) {
		if(oldApps[i].name==app.name) { //Comparamos el estado de las aplicaciones antes y despues
			if(oldApps[i].run!=app.run && app.scr==false) return true;
			else if(oldApps[i].run==true && oldApps[i].scr!=app.scr) return true;
			else return false;
		}
	}
	return true;
}


