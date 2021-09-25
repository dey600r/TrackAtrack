var compass, paint_lim_infC, paint_lim_supC, aux_lim_infC, aux_lim_supC, zoom=4, zoom_lim_inf, zoom_lim_sup, graphCompass=new Object();

//Get datos de la brujula
graphCompass.getCompass=function() {
	return compass;
};

//Inicializamos datos antes de mostrar el gráfico
graphCompass.paintImageComp=function(comp){ 
    compass=comp;
    paint_lim_infC=0;
    paint_lim_supC=-1;
    aux_lim_infC=0;
    aux_lim_supC=0;
    var date_ini=compass[0].date.split("-"), date_end=compass[compass.length-1].date.split("-");
    controller.setDocumentIdInnerHTML('fromComp', date_ini[0]);
    controller.setDocumentIdInnerHTML('toComp', date_end[0]);
    controller.setDocumentIdValue('dateFromComp', date_ini[0].split("/")[2]+"-"+date_ini[0].split("/")[1]+"-"+date_ini[0].split("/")[0]);
    controller.setDocumentIdValue('dateToComp', date_end[0].split("/")[2]+"-"+date_end[0].split("/")[1]+"-"+date_end[0].split("/")[0]);
    controller.setDocumentIdPlaceholder('hourFromComp', date_ini[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minFromComp', date_ini[1].split(":")[1]);
    controller.setDocumentIdPlaceholder('hourToComp', date_end[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minToComp', date_end[1].split(":")[1]);
    controller.setDocumentIdOptionsLength('listDateComp', 1);
    controller.setDocumentIdOptionsLength('listHourComp', 1);
    graphFunction.initDataFunction(comp, "Comp");
    navigator.notification.activityStop();
    controller.paintGraphC(0,-1);
};

//Iniciar la grafica segun el tipo de grafica
graphCompass.initGraphComp=function() {
	aux_lim_infC=0;
	aux_lim_supC=0;
	zoom=4;
	if(controller.getDocumentIdSelected('listImage')==0) {
		controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp').split("(")[0]);
		controller.setDocumentIdVisibility('transp_buttonC1', "visible");
		controller.setDocumentIdVisibility('transp_buttonC2', "visible");
		controller.setDocumentIdVisibility('transp_buttonC3', "visible");
		controller.setDocumentIdImage('transp_buttonC1', "url(../images/flecha.PNG)");
		controller.setDocumentIdVisibility('transp_buttonC4', "visible");
		controller.setDocumentIdImage('transp_buttonC4', "url(../images/flecha.PNG)");
		controller.setDocumentIdImage('transp_buttonC2', "url(../images/flecha.PNG)");
		controller.setDocumentIdVisibility('transp_buttonC5', "visible");
		controller.setDocumentIdVisibility('transp_buttonC6', "visible");
		controller.setDocumentIdVisibility('transp_buttonC7', "visible");
		if(paint_lim_infC!=0) controller.setDocumentIdVisibility('image_izqC', "visible");
		if(paint_lim_supC!=compass.length-1) controller.setDocumentIdVisibility('image_derC', "visible");
		controller.setDocumentIdVisibility('icono_zoom', "hidden");
		controller.setDocumentIdVisibility('btn_zoom', "hidden");
	}
	else {
		controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp').split("(")[0]);
		controller.setDocumentIdVisibility('transp_buttonC1', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC2', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC3', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC4', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC5', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC6', "hidden");
		controller.setDocumentIdVisibility('transp_buttonC7', "hidden");
		controller.setDocumentIdVisibility('image_izqC', "hidden");
		controller.setDocumentIdVisibility('image_derC', "hidden");
		controller.setDocumentIdVisibility('icono_zoom', "visible");
		controller.setDocumentIdVisibility('btn_zoom', "visible");
		controller.setDocumentIdSrc('icono_zoom', "../images/zoom4.png");
	}
};

//Pintamos la grafica con los datos seleccionados por el usuario en el modo de fechas (desde-hasta)
graphCompass.paintGraphComp=function(){
	graphCompass.initGraphComp();
	graphFunction.paintGraph(compass, "Comp");
    paint_lim_infC=graphFunction.getLimInf();
    paint_lim_supC=graphFunction.getLimSup();
	zoom_lim_inf=paint_lim_infC;
	zoom_lim_sup=paint_lim_supC;
	if(paint_lim_infC==0) controller.setDocumentIdVisibility('image_izqC', "hidden");
	if(paint_lim_supC==compass.length-1) controller.setDocumentIdVisibility('image_derC', "hidden");
	controller.paintGraphC(paint_lim_infC, paint_lim_supC);
};

//Pintamos la grfica con los datos seleccionados por el usuario en el modo por dias
graphCompass.paintGraphForDayComp=function(select){ 
	graphCompass.initGraphComp();
	graphFunction.paintGraphForDay(select, compass, "Comp");
    paint_lim_infC=graphFunction.getLimInf();
    paint_lim_supC=graphFunction.getLimSup();
	zoom_lim_inf=paint_lim_infC;
 	zoom_lim_sup=paint_lim_supC;
 	if(paint_lim_infC==0) controller.setDocumentIdVisibility('image_izqC', "hidden");
 	if(paint_lim_supC==compass.length-1) controller.setDocumentIdVisibility('image_derC', "hidden");
 	controller.paintGraphC(paint_lim_infC, paint_lim_supC);
};

//Pintamos la grafica haciendo zoom sobre los datos seleccionados
graphCompass.paintZoomComp=function(mode){ 
    //Establecemos los límites de los datos que ha especificado el usuario
	if(paint_lim_supC!=-1) {
		var lim_inf=0, lim_sup=compass.length, rango;
		if(mode==0) { //Si no hay zoom pintamos la grfica
			if(paint_lim_supC!=-1) {
				lim_inf=paint_lim_infC;
				lim_sup=paint_lim_supC;
				zoom_lim_inf=paint_lim_infC;
				zoom_lim_sup=paint_lim_supC;
				aux_lim_infC=0;
				aux_lim_supC=0;
				zoom=4;
				graphCompass.initGraphComp();
				controller.paintGraphC(lim_inf, lim_sup);
			} else {
				graphCompass.initGraphComp();
				controller.paintGraphC(0, 0);
			}
		}
		else { //Si elegimos el zoom ampliamos o deshacemos
			if(controller.getDocumentIdSelected('listImage')==0) { //Si es la grafica 
				if((aux_lim_infC==0 && aux_lim_supC==0)) { //Hacemos zoom
					rango=paint_lim_supC-paint_lim_infC;
					lim_inf=paint_lim_infC+(Math.floor(rango/7)*(mode-1));
					lim_sup=paint_lim_infC+(Math.floor(rango/7)*(mode));
					controller.setDocumentIdVisibility('transp_buttonC1', "hidden");
					controller.setDocumentIdVisibility('transp_buttonC2', "hidden");
					controller.setDocumentIdVisibility('transp_buttonC3', "hidden");
					controller.setDocumentIdImage('transp_buttonC4', "url(../images/flecha1.PNG)");
					controller.setDocumentIdVisibility('transp_buttonC5', "hidden");
					controller.setDocumentIdVisibility('transp_buttonC6', "hidden");
					controller.setDocumentIdVisibility('transp_buttonC7', "hidden");
					controller.setDocumentIdVisibility('image_izqC', "hidden");
					controller.setDocumentIdVisibility('image_derC' ,"hidden");
					controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp')+" (zoom)");   
					aux_lim_infC=lim_inf;
					aux_lim_supC=lim_sup;
				}	
				else if(mode==4) { //Quitamos el zoom
					lim_inf=paint_lim_infC;
					lim_sup=paint_lim_supC;
					aux_lim_infC=0;
					aux_lim_supC=0;
					zoom=4;
					graphCompass.initGraphComp();
				}	
				controller.paintGraphC(lim_inf, lim_sup);
			}	
			else { //Si es la imagen de la brujula
				rango=paint_lim_supC-paint_lim_infC;
				if(mode==1 && zoom>1) { //Aumentamos el zoom
					zoom--;
					lim_inf=zoom_lim_inf;
					lim_sup=zoom_lim_inf+(Math.floor(rango/4)*zoom);
					zoom_lim_inf=lim_inf;
					zoom_lim_sup=lim_sup;
					controller.setDocumentIdVisibility('btn_zoom', "visible");
					controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp').split("(")[0]+" (zoom+)");
					controller.paintGraphC(lim_inf, lim_sup);
					controller.setDocumentIdSrc('icono_zoom', "../images/zoom"+zoom+".png");
				}
				else if(mode==2 && zoom<4) { //Decrementamos el zoom
					zoom++;
					lim_inf=zoom_lim_inf;
					lim_sup=zoom_lim_inf+(Math.floor(rango/4)*zoom);
					zoom_lim_inf=lim_inf;
					zoom_lim_sup=lim_sup;
					controller.setDocumentIdVisibility('btn_zoom', "visible");
					controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp').split("(")[0]+" (zoom-)");
					controller.paintGraphC(lim_inf, lim_sup);
					controller.setDocumentIdSrc('icono_zoom', "../images/zoom"+zoom+".png");
					if(zoom>3) controller.setDocumentIdInnerHTML('infoDateComp', controller.getDocumentIdInnerHTML('infoDateComp').split("(")[0]);
				}
			}
		}
    } else alert(controller.getTraduction('alert_no_data'));
};

var touchXC, touchYC, paintC=false;
//El usuario empieza a tocar la grafica
graphCompass.touchStartComp=function(event) {
     touchXC=event.changedTouches[0].screenX;
     touchYC=event.changedTouches[0].screenY;
};

//El usuario mueve la grafica
graphCompass.touchMoveComp=function(event) {
	var dif_touchY=touchYC-event.changedTouches[0].screenY, auxTouchY=Math.abs(dif_touchY);
    if(paint_lim_supC!=-1 && (paint_lim_supC-paint_lim_infC)<=2000 && controller.getDocumentIdSelected('listImage')==0) {
    	var dif_touchX=touchXC-event.changedTouches[0].screenX, auxTouchX=Math.abs(dif_touchX);
        var lim_inf, lim_sup;
    	if(auxTouchX>25 && auxTouchY<20 && aux_lim_infC==0 && aux_lim_supC==0) {
    		paintC=true;
    		if(dif_touchX>0) { //Desplazamos hacia la izquierda
    			lim_inf=paint_lim_infC+auxTouchX;
    			lim_sup=paint_lim_supC+auxTouchX;
    			if(lim_sup>=compass.length) {
    				lim_inf=paint_lim_infC;
    				lim_sup=compass.length-1;
    				controller.setDocumentIdVisibility('image_derC', "hidden");
    			} else {
    				controller.setDocumentIdVisibility('image_derC', "visible");
    				controller.setDocumentIdVisibility('image_izqC', "visible");
    			}
    			controller.setDocumentIdImage('transp_buttonC3', "url(../images/flecha3.PNG)");
    			controller.setDocumentIdImage('transp_buttonC4', "url(../images/flecha3.PNG)");
    			controller.setDocumentIdImage('transp_buttonC5', "url(../images/flecha3.PNG)");
    		}
    		else { //Desplazamos hacia la derecha
    			lim_inf=paint_lim_infC-auxTouchX;
    			lim_sup=paint_lim_supC-auxTouchX;
    			if(lim_inf<0) {
    				lim_inf=0;
    				lim_sup=paint_lim_supC;
    				controller.setDocumentIdVisibility('image_derC', "hidden");
    			} else {
    				controller.setDocumentIdVisibility('image_derC', "visible");
    				controller.setDocumentIdVisibility('image_izqC', "visible");
    			}
    			controller.setDocumentIdImage('transp_buttonC3', "url(../images/flecha2.PNG)");
    			controller.setDocumentIdImage('transp_buttonC4', "url(../images/flecha2.PNG)");
    			controller.setDocumentIdImage('transp_buttonC5', "url(../images/flecha2.PNG)");
    		}
    		controller.setDocumentIdVisibility('transp_buttonC1', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonC2', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonC6', "hidden");
    		controller.setDocumentIdVisibility('transp_buttonC7', "hidden");
    		controller.setDocumentIdInnerHTML('infoDateComp', "");
    		touchXC=event.changedTouches[0].screenX;
    		touchYC=event.changedTouches[0].screenY;
    		paint_lim_infC=lim_inf;
    		paint_lim_supC=lim_sup;
    		controller.paintGraphC(lim_inf,lim_sup);
    	}
    }  
    else if(auxTouchY<10 && paint_lim_supC==-1) alert(controller.getTraduction('alert_no_data'));
    else if(auxTouchY<20 && (paint_lim_supC-paint_lim_infC)>2000 && controller.getDocumentIdSelected('listImage')==0) alert(controller.getTraduction('alert_less_data'));
};

//El usuario deja de tocar la grafica
graphCompass.touchEndComp=function(event) {
	var dif_touchY=touchYC-event.changedTouches[0].screenY;
	if(paint_lim_supC!=-1 && controller.getDocumentIdSelected('listImage')==0) { //Si hay datos seleccionados
		var dif_touchX=touchXC-event.changedTouches[0].screenX;
		if(paintC==true && aux_lim_infC==0 && aux_lim_supC==0) { //Detectamos si desplazamos la grafica
    		paintC=false;
    		controller.setDocumentIdInnerHTML('infoDateComp', compass[paint_lim_infC].date+" -> "+compass[paint_lim_supC].date);
    		controller.setDocumentIdVisibility('transp_buttonC1', "visible");
    		controller.setDocumentIdVisibility('transp_buttonC2', "visible");
    		controller.setDocumentIdImage('transp_buttonC3', "url(../images/flecha.PNG)");
    		controller.setDocumentIdImage('transp_buttonC4', "url(../images/flecha.PNG)");
    		controller.setDocumentIdImage('transp_buttonC5', "url(../images/flecha.PNG)");
    		controller.setDocumentIdVisibility('transp_buttonC6', "visible");
    		controller.setDocumentIdVisibility('transp_buttonC7', "visible");
    		controller.paintGraphC(paint_lim_infC, paint_lim_supC);
		} else if(Math.abs(dif_touchX)<15 && Math.abs(dif_touchY)<15 && paintC==false){ //Hacemos zoom
    		if(aux_lim_infC==0 && aux_lim_supC==0) {
    			var ancho=(window.innerWidth-80)/7, seccion=(touchXC-40)/ancho;
    			if(seccion>=0 && seccion<1) paintZoomComp(1);
        		else if(seccion>=1 && seccion<2) graphCompass.paintZoomComp(2);
        		else if(seccion>=2 && seccion<3) graphCompass.paintZoomComp(3);
        		else if(seccion>=3 && seccion<4) graphCompass.paintZoomComp(4);
        		else if(seccion>=4 && seccion<5) graphCompass.paintZoomComp(5);
        		else if(seccion>=5 && seccion<6) graphCompass.paintZoomComp(6);
        		else if(seccion>=6 && seccion<7) graphCompass.paintZoomComp(7);
    		} else graphCompass.paintZoomComp(4);
    	}
	} else if(Math.abs(dif_touchY)<10 && paint_lim_supC==-1) alert(controller.getTraduction('alert_no_data'));
};

var increment=false;
//Zoom de la imagen de la brujula
graphCompass.touchZoom=function() {
	if(paint_lim_supC!=-1) {
		if(increment==false) { 
			if(zoom>1) graphCompass.paintZoomComp(1);
			if(zoom==1) increment=true; 
		} else {
			if(zoom<4) graphCompass.paintZoomComp(2);
			if(zoom==4) increment=false; 
		}
	} else alert(controller.getTraduction('alert_no_data'));
};

//Repintamos la imagen para la funcionalidad del zoom
graphCompass.touchZoomRepaintComp=function(mode) {
	if(paint_lim_supC!=-1 && aux_lim_infC==0 && aux_lim_supC==0) { //Si ha datos seleccionados
		graphFunction.touchZoomRepaint(mode, compass, paint_lim_infC, paint_lim_supC);
		paint_lim_infC=graphFunction.getLimInf();
	    paint_lim_supC=graphFunction.getLimSup();
	    controller.setDocumentIdInnerHTML('infoDateComp', compass[paint_lim_infC].date+" -> "+compass[paint_lim_supC].date);
	    controller.setDocumentIdVisibility('image_izqC', "visible");
	    controller.setDocumentIdVisibility('image_derC', "visible");
		if(paint_lim_infC==0) controller.setDocumentIdVisibility('image_izqC', "hidden");
	 	if(paint_lim_supC==compass.length-1) controller.setDocumentIdVisibility('image_derC', "hidden");
	 	controller.paintGraphC(paint_lim_infC, paint_lim_supC);
	} else if(paint_lim_supC!=-1) alert(controller.getTraduction('alert_no_data'));
};
