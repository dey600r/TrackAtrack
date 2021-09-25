var accelerometer, paint_lim_infA, paint_lim_supA, aux_lim_infA, aux_lim_supA, graphAccelerometer=new Object();

//Get todos los datos del accelerometro
graphAccelerometer.getAccelerometer=function() {
	return accelerometer;
};

//Iniciamos los datos y la interfaz para empezar a mostrar graficas
graphAccelerometer.paintImageAccel=function(accel){ //Inicializamos datos antes de mostrar el gráfico
	accelerometer=accel;
	paint_lim_infA=0;
    paint_lim_supA=-1;
    aux_lim_infA=0;
    aux_lim_supA=0;
    var date_ini=accelerometer[0].date.split("-"), date_end=accelerometer[accelerometer.length-1].date.split("-");
    controller.setDocumentIdInnerHTML('fromAccel', date_ini[0]);
    controller.setDocumentIdInnerHTML('toAccel', date_end[0]);
    controller.setDocumentIdValue('dateFromAccel', date_ini[0].split("/")[2]+"-"+date_ini[0].split("/")[1]+"-"+date_ini[0].split("/")[0]);
    controller.setDocumentIdValue('dateToAccel', date_end[0].split("/")[2]+"-"+date_end[0].split("/")[1]+"-"+date_end[0].split("/")[0]);
    controller.setDocumentIdPlaceholder('hourFromAccel', date_ini[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minFromAccel', date_ini[1].split(":")[1]);
    controller.setDocumentIdPlaceholder('hourToAccel', date_end[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minToAccel', date_end[1].split(":")[1]);
    controller.setDocumentIdOptionsLength('listDateAccel', 1);
    controller.setDocumentIdOptionsLength('listHourAccel', 1);
    graphFunction.initDataFunction(accel, "Accel");
    navigator.notification.activityStop();
    controller.paintGraphA(0, -1);
};

graphAccelerometer.initGraphAccel=function() {
	aux_lim_infA=0; aux_lim_supA=0;
	controller.setDocumentIdVisibility('transp_buttonA1', "visible");
	controller.setDocumentIdVisibility('transp_buttonA2', "visible");
	controller.setDocumentIdVisibility('transp_buttonA3', "visible");
	controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha.PNG)");
	controller.setDocumentIdVisibility('transp_buttonA5', "visible");
	controller.setDocumentIdVisibility('transp_buttonA6', "visible");
	controller.setDocumentIdVisibility('transp_buttonA7', "visible");
	controller.setDocumentIdVisibility('image_izqA', "visible");
	controller.setDocumentIdVisibility('image_derA' ,"visible");
};

//Pintamos la gráfica con los datos especificados por el usuario en el modo por fechas
graphAccelerometer.paintGraphAccel=function(){
	graphAccelerometer.initGraphAccel();
	graphFunction.paintGraph(accelerometer, "Accel");
	paint_lim_infA=graphFunction.getLimInf();
    paint_lim_supA=graphFunction.getLimSup();
	if(paint_lim_infA==0) controller.setDocumentIdVisibility('image_izqA', "hidden");
	if(paint_lim_supA==accelerometer.length-1) controller.setDocumentIdVisibility('image_derA', "hidden");
	controller.paintGraphA(paint_lim_infA, paint_lim_supA);
};

//Pintamos la gráfica con los datos especificados por el usuario en el modo por dias y horas
graphAccelerometer.paintGraphForDayAccel=function(select){
	graphAccelerometer.initGraphAccel();
    //Establecemos los límites de los datos que ha especificado el usuario
	graphFunction.paintGraphForDay(select, accelerometer, "Accel");
	paint_lim_infA=graphFunction.getLimInf();
    paint_lim_supA=graphFunction.getLimSup();
    if(paint_lim_infA==0) controller.setDocumentIdVisibility('image_izqA', "hidden");
	if(paint_lim_supA==accelerometer.length-1) controller.setDocumentIdVisibility('image_derA', "hidden");
	controller.paintGraphA(paint_lim_infA, paint_lim_supA);
};

//Hacemos un zoom en la grafica en la seccion indicada por el usuario
graphAccelerometer.paintZoomAccel=function(mode){ 
	//Establecemos los límites de los datos que ha especificado el usuario
    if(paint_lim_supA!=-1) {
    	var lim_inf=0, lim_sup=accelerometer.length, rango;
    	if(mode==0) { //Si no se hace zoom repintar grafica normal
    		if(aux_lim_infA==0 && aux_lim_supA==0) {
    			lim_inf=paint_lim_infA;
    			lim_sup=paint_lim_supA;
    			if(paint_lim_infA!=0) controller.setDocumentIdVisibility('image_izqA', "visible");
    			if(paint_lim_supA!=accelerometer.length-1) controller.setDocumentIdVisibility('image_derA', "visible");
    		}
    		else {
    			lim_inf=aux_lim_infA;
    			lim_sup=aux_lim_supA;
    		}
    	}
    	else { //Si se hace zoom
    		if(aux_lim_infA==0 && aux_lim_supA==0) { //Hacer zoom
    			rango=paint_lim_supA-paint_lim_infA;
    			lim_inf=paint_lim_infA+(Math.floor(rango/7)*(mode-1));
    			lim_sup=paint_lim_infA+(Math.floor(rango/7)*(mode));
    			aux_lim_infA=lim_inf; 
    			aux_lim_supA=lim_sup;
    			controller.setDocumentIdVisibility('transp_buttonA1', "hidden");
    			controller.setDocumentIdVisibility('transp_buttonA2', "hidden");
    			controller.setDocumentIdVisibility('transp_buttonA3', "hidden");
    			controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha1.PNG)");
    			controller.setDocumentIdVisibility('transp_buttonA5', "hidden");
    			controller.setDocumentIdVisibility('transp_buttonA6', "hidden");
    			controller.setDocumentIdVisibility('transp_buttonA7', "hidden");
    			controller.setDocumentIdVisibility('image_izqA', "hidden");
    			controller.setDocumentIdVisibility('image_derA' ,"hidden");
    			controller.setDocumentIdInnerHTML('infoDateAccel', controller.getDocumentIdInnerHTML('infoDateAccel')+" (zoom)");
    		}
    		else if(mode==4) { //Deshacer zoom
    			lim_inf=paint_lim_infA;
    			lim_sup=paint_lim_supA;
    			aux_lim_infA=0;
    			aux_lim_supA=0;
    			if(paint_lim_infA!=0) controller.setDocumentIdVisibility('image_izqA', "visible");
    			if(paint_lim_supA!=accelerometer.length-1) controller.setDocumentIdVisibility('image_derA', "visible");
    			controller.setDocumentIdVisibility('transp_buttonA1', "visible");
    			controller.setDocumentIdVisibility('transp_buttonA2', "visible");
    			controller.setDocumentIdVisibility('transp_buttonA3', "visible");
    			controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha.PNG)");
    			controller.setDocumentIdVisibility('transp_buttonA5', "visible");
    			controller.setDocumentIdVisibility('transp_buttonA6', "visible");
    			controller.setDocumentIdVisibility('transp_buttonA7', "visible");
    			controller.setDocumentIdInnerHTML('infoDateAccel', controller.getDocumentIdInnerHTML('infoDateAccel').split("(")[0]);
    		}	
    	}
    	controller.paintGraphA(lim_inf, lim_sup);
    } else alert(controller.getTraduction('alert_no_data'));
};

var touchXA, touchYA, paintA=false;
//El usuario empieza a tocar la grafica para desplazarla
graphAccelerometer.touchStartAccel=function(event) {
	touchXA=event.changedTouches[0].screenX;
   	touchYA=event.changedTouches[0].screenY;
};

//El usuario esta moviendo la grafica
graphAccelerometer.touchMoveAccel=function(event) {
    var dif_touchY=touchYA-event.changedTouches[0].screenY, auxTouchY=Math.abs(dif_touchY);
    if(paint_lim_supA!=-1 && (paint_lim_supA-paint_lim_infA)<=2000) {
    	var dif_touchX=touchXA-event.changedTouches[0].screenX, auxTouchX=Math.abs(dif_touchX);
        var lim_inf, lim_sup;
    	if(auxTouchX>25 && auxTouchY<20 && aux_lim_infA==0 && aux_lim_supA==0) {
    		paintA=true;
    		if(dif_touchX>0) { //Desplazamiento de la grafica a la izquierda
    			lim_inf=paint_lim_infA+auxTouchX;
    			lim_sup=paint_lim_supA+auxTouchX;
    			if(lim_sup>=accelerometer.length) {
    				lim_inf=paint_lim_infA;
    				lim_sup=accelerometer.length-1;
    				controller.setDocumentIdVisibility('image_derA', "hidden");
    			} else {
    				controller.setDocumentIdVisibility('image_derA', "visible");
    				controller.setDocumentIdVisibility('image_izqA', "visible");
    			}
    			controller.setDocumentIdImage('transp_buttonA3', "url(../images/flecha3.PNG)");
    			controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha3.PNG)");
    			controller.setDocumentIdImage('transp_buttonA5', "url(../images/flecha3.PNG)");
    		}
    		else { //Desplazamiento de la grafica a la derecha
    			lim_inf=paint_lim_infA-auxTouchX;
    			lim_sup=paint_lim_supA-auxTouchX;
    			if(lim_inf<0) {
    				lim_inf=0;
    				lim_sup=paint_lim_supA;
    				controller.setDocumentIdVisibility('image_derA', "hidden");
    			} else {
    				controller.setDocumentIdVisibility('image_derA', "visible");
    				controller.setDocumentIdVisibility('image_izqA', "visible");
    			}
    			controller.setDocumentIdImage('transp_buttonA3', "url(../images/flecha2.PNG)");
    			controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha2.PNG)");
    			controller.setDocumentIdImage('transp_buttonA5', "url(../images/flecha2.PNG)");
    		}
    		controller.setDocumentIdVisibility('transp_buttonA1', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonA2', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonA6', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonA7', "hidden");
    		controller.setDocumentIdInnerHTML('infoDateAccel', "");
    		touchXA=event.changedTouches[0].screenX;
    		touchYA=event.changedTouches[0].screenY;
    		paint_lim_infA=lim_inf;
    		paint_lim_supA=lim_sup;
    		controller.paintGraphA(lim_inf,lim_sup);
    	}
    }  
    else if(auxTouchY<10 && paint_lim_supA==-1) alert(controller.getTraduction('alert_no_data'));
    else if(auxTouchY<20 && (paint_lim_supA-paint_lim_infA)>2000) alert(controller.getTraduction('alert_less_data'));
};

//El usuario deja de tocar la grafica y paramos el desplazamiento
graphAccelerometer.touchEndAccel=function(event) {
    var dif_touchY=touchYA-event.changedTouches[0].screenY;
    if(paint_lim_supA!=-1) {
    	var dif_touchX=touchXA-event.changedTouches[0].screenX;
    	if(paintA==true && aux_lim_infA==0 && aux_lim_supA==0) { //Si es un desplazamiento de grafica
    		paintA=false;
    		controller.setDocumentIdInnerHTML('infoDateAccel', accelerometer[paint_lim_infA].date+" -> "+accelerometer[paint_lim_supA].date);
    		controller.setDocumentIdVisibility('transp_buttonA1', "visible");
    		controller.setDocumentIdVisibility('transp_buttonA2', "visible");
    		controller.setDocumentIdImage('transp_buttonA3', "url(../images/flecha.PNG)");
    		controller.setDocumentIdImage('transp_buttonA4', "url(../images/flecha.PNG)");
    		controller.setDocumentIdImage('transp_buttonA5', "url(../images/flecha.PNG)");
    		controller.setDocumentIdVisibility('transp_buttonA6', "visible");
    		controller.setDocumentIdVisibility('transp_buttonA7', "visible");
    		controller.paintGraphA(paint_lim_infA, paint_lim_supA);
    	} else if(Math.abs(dif_touchX)<15 && Math.abs(dif_touchY)<15 && paintA==false){
    		if(aux_lim_infA==0 && aux_lim_supA==0) { //Si es un zoom sobre la grafica
    			var ancho=(window.innerWidth-80)/7, seccion=(touchXA-40)/ancho;
    			if(seccion>=0 && seccion<1) graphAccelerometer.paintZoomAccel(1);
        		else if(seccion>=1 && seccion<2) graphAccelerometer.paintZoomAccel(2);
        		else if(seccion>=2 && seccion<3) graphAccelerometer.paintZoomAccel(3);
        		else if(seccion>=3 && seccion<4) graphAccelerometer.paintZoomAccel(4);
        		else if(seccion>=4 && seccion<5) graphAccelerometer.paintZoomAccel(5);
        		else if(seccion>=5 && seccion<6) graphAccelerometer.paintZoomAccel(6);
        		else if(seccion>=6 && seccion<7) graphAccelerometer.paintZoomAccel(7);
    		} else graphAccelerometer.paintZoomAccel(4);
    	}
    } else if(Math.abs(dif_touchY)<10) alert(controller.getTraduction('alert_no_data'));
};

graphAccelerometer.touchZoomRepaintAccel=function(mode) { //Repintar la grafica por zoom
	if(paint_lim_supA!=-1 && aux_lim_infA==0 && aux_lim_supA==0) {
		graphFunction.touchZoomRepaint(mode, accelerometer, paint_lim_infA, paint_lim_sup);
		paint_lim_infA=graphFunction.getLimInf();
	    paint_lim_supA=graphFunction.getLimSup();
	    controller.setDocumentIdInnerHTML('infoDateAccel', accelerometer[paint_lim_infA].date+" -> "+accelerometer[paint_lim_supA].date);
	    controller.setDocumentIdVisibility('image_izqA', "visible");
	    controller.setDocumentIdVisibility('image_derA', "visible");
		if(paint_lim_infA==0) controller.setDocumentIdVisibility('image_izqA', "hidden");
		if(paint_lim_supA==accelerometer.length-1) controller.setDocumentIdVisibility('image_derA', "hidden");
		controller.paintGraphA(paint_lim_infA, paint_lim_supA);
	} else if(paint_lim_supA!=-1) alert(controller.getTraduction('alert_no_data'));
};

