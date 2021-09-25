var graphAppMobile=new Object(), apps, paint_lim_infP, paint_lim_supP, aux_lim_infP, aux_lim_supP;

//Get datos de las aplicaciones ejecutadas
graphAppMobile.getApps=function() {
	return apps;
};

//Set datos de las aplicaciones ejecutadas
graphAppMobile.setApps=function(appMobile) {
	apps=appMobile;
};

//Set limites de datos
graphAppMobile.setLim_inf=function(lim) {
	paint_lim_infP=lim;
};

//Set limites de datos
graphAppMobile.setLim_sup=function(lim) {
	paint_lim_supP=lim;
};

//Iniciamos datos e interfaz anter de pintar graficas
graphAppMobile.paintImageApp=function(appMobile) {
	apps=appMobile;
	paint_lim_infP=0;
    paint_lim_supP=-1;
    aux_lim_infP=0;
    aux_lim_supP=0;
    var date_ini=apps[0].date.split("-"), date_end=apps[apps.length-1].date.split("-");
    controller.setDocumentIdInnerHTML('fromApp', date_ini[0]);
    controller.setDocumentIdInnerHTML('toApp', date_end[0]);
    controller.setDocumentIdValue('dateFromApp', date_ini[0].split("/")[2]+"-"+date_ini[0].split("/")[1]+"-"+date_ini[0].split("/")[0]);
    controller.setDocumentIdValue('dateToApp', date_end[0].split("/")[2]+"-"+date_end[0].split("/")[1]+"-"+date_end[0].split("/")[0]);
    controller.setDocumentIdPlaceholder('hourFromApp', date_ini[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minFromApp', date_ini[1].split(":")[1]);
    controller.setDocumentIdPlaceholder('hourToApp', date_end[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minToApp', date_end[1].split(":")[1]);
    controller.setDocumentIdOptionsLength('listDateApp', 1);
    controller.setDocumentIdOptionsLength('listHourApp', 1);
    graphFunction.initDataFunction(apps, "App");
    navigator.notification.activityStop();
};

//Pintamos la grafica elegida por el usuario en el modo por fechas
graphAppMobile.paintGraphApp=function(){ 
	graphFunction.paintGraph(apps, "App");
	paint_lim_infP=graphFunction.getLimInf();
    paint_lim_supP=graphFunction.getLimSup();
    if(controller.getDocumentIdSelected('listModeApp')==1) {
    	controller.paintGraphSummaryP(graphAppMobile.getSummaryApps());
    }else controller.paintGraphP(paint_lim_infP, paint_lim_supP); 
};

//Pintamos la grafica elegida por el usuario en el modo por dias y horas
graphAppMobile.paintGraphForDayApp=function(select){
	graphFunction.paintGraphForDay(select, apps, "App");
	paint_lim_infP=graphFunction.getLimInf();
    paint_lim_supP=graphFunction.getLimSup();
    if(controller.getDocumentIdSelected('listModeApp')==1) {
    	controller.paintGraphSummaryP(graphAppMobile.getSummaryApps());
    }else controller.paintGraphP(paint_lim_infP, paint_lim_supP); 
};

//Repintamos la grafica ante cualquier eleccion del usuario
graphAppMobile.repaintGraphApp=function() {
	if(paint_lim_sup!=-1) {
		if(controller.getDocumentIdSelected('listModeApp')==1) {
    		controller.paintGraphSummaryP(graphAppMobile.getSummaryApps());
    	}else controller.paintGraphP(paint_lim_infP, paint_lim_supP);
	} else alert(controller.getTraduction('alert_no_data'));
};

//Detectar si es un proceso de usuario o del sistema para mostrarlo en las graficas
graphAppMobile.isProcessUser=function(appsMobile, i, lim_inf, lim_sup) {
	var length;
	if(appsMobile[i].name=='Unknown connection' || appsMobile[i].name=='Ethernet connection' || appsMobile[i].name=='WiFi connection' || appsMobile[i].name=='Cell 2G connection' || appsMobile[i].name=='Cell 3G connection' || appsMobile[i].name=='Cell 4G connection' || appsMobile[i].name=='No network connection')
		return true;
	if(appsMobile[i].state=="Opened") {
		if((i+10)>lim_sup) length=lim_sup;
		else length=i+10;
		for(var j=i+1; j<length; j++) {
			if(appsMobile[i].name==appsMobile[j].name && appsMobile[j].state!="Opened") return true;
		}
	} else {
		if((i-10)<lim_inf) length=lim_inf;
		else length=i-10;
		for(var j=i-1; j>length; j--) {
			if(appsMobile[i].name==appsMobile[j].name && appsMobile[j].state=="Opened") return true;
		}
	}
	return false;
};

//Generar un resumen de datos de las aplicaciones recorridas
graphAppMobile.getSummaryApps=function () {
	var summaryApps=new Array();
    for(var i=paint_lim_infP; i<paint_lim_supP; i++) { //Recorremos las apps
    	if(apps[i].state=="Opened" && apps[i].name!="Trackatrack" && apps[i].name!="Vodafone" && apps[i].name!='Unknown connection' && apps[i].name!='Ethernet connection' && apps[i].name!='WiFi connection' && apps[i].name!='Cell 2G connection' && apps[i].name!='Cell 3G connection' && apps[i].name!='Cell 4G connection' && apps[i].name!='No network connection') {
    		if(graphAppMobile.isAppIn(summaryApps, apps[i].name)==true) { //Si es una aplicacion conocida
    			for(var j=i+1; j<=paint_lim_supP; j++) { //Buscamos cuando se cierra la app mas adelante
    				if(apps[i].name==apps[j].name || apps[j].state=="ScreenOff") { 
    					if(apps[j].state!="Opened") { //Si el estado ha cambiado la guardamos en la BD
    						for(var k=0; k<summaryApps.length; k++) {
    							if(summaryApps[k].name==apps[j].name && apps[i].name==apps[j].name) {
    								summaryApps[k].freq+=1;
    								summaryApps[k].time+=graphAppMobile.getTimeOpenApp(apps[i].date, apps[j].date);
    								break;
    							}
    						}
    						break;
    					} else {
    						for(var k=0; k<summaryApps.length; k++) {
    							if(summaryApps[k].name==apps[j].name) {
    								summaryApps[k].freq+=1;
    								summaryApps[k].time+=10;
    								break;
    							}
    						}
    						break;
    					}
    				}
    			}
    		} else { //Si es una app no conocida la guardamos en la BD
    			summaryApps.push({name: apps[i].name, freq: 1, time: 1});
    			for(var j=i+1; j<=paint_lim_supP; j++) {
    				if(apps[i].name==apps[j].name) {
    					if(apps[j].state!="Opened") {
    						summaryApps[summaryApps.length-1].time=graphAppMobile.getTimeOpenApp(apps[i].date, apps[j].date);
    						break;
    					} else {
    						summaryApps[summaryApps.length-1].time+=9;
    						break;
    					}
    				}
    			}
    		}
    	}	
    }
    return summaryApps;
};

//Si es una aplicacion conocida con anterioridad
graphAppMobile.isAppIn=function(array, appName) {
	for(var i=0; i<array.length; i++) {
		if(array[i].name==appName) return true;
	}
	return false;
};

//Funcion que devuelve el tiempo que ha estado abierta una aplicacion
graphAppMobile.getTimeOpenApp=function(initTime, endTime) {
	var time, seg, min, hour, aux_initTime, aux_endTime;
	if(initTime.split("-")[0].split("/")[0]==endTime.split("-")[0].split("/")[0]) {
		aux_initTime=initTime.split("-")[1];
		aux_endTime=endTime.split("-")[1];
		seg=Number(aux_endTime.split(":")[2])-Number(aux_initTime.split(":")[2]);
		min=Number(aux_endTime.split(":")[1])-Number(aux_initTime.split(":")[1]);
		hour=Number(aux_endTime.split(":")[0])-Number(aux_initTime.split(":")[0]);
		time=(hour*3600)+(min*60)+seg;
	} else {
		aux_initTime=initTime.split("-")[1];
		aux_endTime=endTime.split("-")[1];
		seg=Number(aux_endTime.split(":")[2])+(60-Number(aux_initTime.split(":")[2]));
		min=Number(aux_endTime.split(":")[1])+(59-Number(aux_initTime.split(":")[1]));
		hour=Number(aux_endTime.split(":")[0])+(23-Number(aux_initTime.split(":")[0]));
		time=(hour*3600)+(min*60)+seg;
	}
	return Math.abs(time);
};