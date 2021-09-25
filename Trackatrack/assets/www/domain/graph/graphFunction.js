var paint_lim_inf, paint_lim_sup, graphFunction=new Object();

//Get limite inferior de la lista de datos obtenida por el algoritmo que ha elegido el usuario
graphFunction.getLimInf=function() {
	return paint_lim_inf;
};

//Get limite superior de la lista de datos obtenida por el algoritmo que ha elegido el usuario
graphFunction.getLimSup=function() {
	return paint_lim_sup;
};

//Añadir a la lista de elementos nuevos datos en el dia actual
graphFunction.addHour=function(text, value, funct) {
    if(text==0) controller.setDocumentIdCreateOption('listHour'+funct, controller.getTraduction('listHour_min') , value);
    else controller.setDocumentIdCreateOption('listHour'+funct, text+" "+controller.getTraduction('listHour_hour'), value);
};

//Añadir a la lista de elementos nuevos datos de dias anteriores
graphFunction.addDate=function(text, value, funct) {
    if(text<=7) {
    	if(text==0) controller.setDocumentIdCreateOption('listDate'+funct, controller.getTraduction('listDate_today') , value);
    	else controller.setDocumentIdCreateOption('listDate'+funct, controller.getTraduction('listDate_sinceday')+" "+text+" "+controller.getTraduction('listDate_days') , value);
    } else if(text<=10) controller.setDocumentIdCreateOption('listDate'+funct, "8-10 "+controller.getTraduction('listDate_day') , value);
    else if(text>10) controller.setDocumentIdCreateOption('listDate'+funct, "+10 "+controller.getTraduction('listDate_day') , value);
};

//Inicializamos datos de las listas antes de mostrar el gráfico
graphFunction.initDataFunction=function(arrayData, funct){ 
    paint_lim_inf=0;
    paint_lim_sup=-1;
    var minDate, maxDate, minYear, maxYear, minMonth, maxMonth, minDay, maxDay;
    minDate=arrayData[0].date.split("/");
    maxDate=arrayData[arrayData.length-1].date.split("/");
    minYear=minDate[2].split("-")[0];
    maxYear=maxDate[2].split("-")[0];
    minTime=minDate[2].split("-")[1].split(":");
	maxTime=maxDate[2].split("-")[1].split(":");
	minMonth=Number(minDate[1]);
	maxMonth=Number(maxDate[1]);
	minDay=Number(minDate[0]);
	maxDay=Number(maxDate[0]);
	minHour=Number(minTime[0]);
	maxHour=Number(maxTime[0]);
    var date_now = new Date(), lim_for;
    if(date_now.getFullYear()==maxYear && (date_now.getMonth()+1)==maxMonth && date_now.getDate()==maxDay) { //Si hay datos de el dia actual buscamos por horas
    	var hour_today=Number(graphFunction.getHourToday(date_now, arrayData));
    	lim_for=(date_now.getHours()-hour_today);
    	for(var i=0; i<=lim_for; i++) {
    		if(graphFunction.findHour(i, hour_today, date_now, arrayData)) {
    			graphFunction.addHour((lim_for-i), (maxHour-hour_today-i), funct); //Añadimos a la lista de horas
    		}
    	}
    }
    if(minYear==maxYear && minMonth==maxMonth /*&& minDay!=maxDay*/) { //Si hay datos de dias anteriores pero en el mismo mes
    	var ten_days=true, seven_days=true;
    	lim_for=(maxDay-minDay);
    	for(var i=0; i<=lim_for; i++) {
    		if(graphFunction.findDay(i, minDay, arrayData)) {
    			if((date_now.getDate()-maxDay+(lim_for-i))<=7) { //Datos de hace menos de una semana
    				graphFunction.addDate(((date_now.getDate()-maxDay)+lim_for-i), (lim_for-i), funct);
    			}
    			else if((date_now.getDate()-maxDay+(lim_for-i))>7 && (date_now.getDate()-maxDay+(lim_for-i))<=10 && seven_days){ //Datos entre 8 y 10 dias
	        		seven_days=false;
	        		graphFunction.addDate(((date_now.getDate()-maxDay)+lim_for-i), (lim_for-i), funct);
    			}
    			else if((date_now.getDate()-maxDay+(lim_for-i))>10 && ten_days) { //Datos de mas de 10 dias
    				graphFunction.addDate(((date_now.getDate()-maxDay)+lim_for-i), (lim_for-i), funct);
	        		ten_days=false;
    			}
    		}
    	}    	
    }
    if(minYear==maxYear && minMonth!=maxMonth && minDay!=maxDay) { //Si hay datos de distintos meses
    	var ten_days=true, seven_days=true, dif_day, day_prev, day_post, day_last, month, month_prev, month_post;
    	lim_for=arrayData.length-1;
    	day_last=Number(arrayData[lim_for].date.split("-")[0].split("/")[0]);
    	for(var i=0; i<lim_for; i++) {
    		day_prev=Number(arrayData[i].date.split("-")[0].split("/")[0]);
    		day_post=Number(arrayData[i+1].date.split("-")[0].split("/")[0]);
    		month_prev=Number(arrayData[i].date.split("-")[0].split("/")[1]);
    		month_post=Number(arrayData[i+1].date.split("-")[0].split("/")[1]);
    		if(day_prev!=day_post || i==arrayData.length-2) { //Si esta en el mes actual
    			if((date_now.getMonth()+1)==month_prev) {
    				dif_day=date_now.getDate()-day_prev;
    				if(dif_day<=7) {
    					graphFunction.addDate(dif_day, (day_last-day_prev), funct);
    				}
    				else if(dif_day<=10 && seven_days) {
    					graphFunction.addDate(dif_day, (day_last-day_prev), funct);
    					seven_days=false;
    				}
    				else if(dif_day>10 && ten_days && (date_now.getDate()-day_post)<=10) {
    					graphFunction.addDate(dif_day, (day_last-day_prev), funct);
    					ten_days=false;
    				}
    			}
    			else { //Si estan en algun mes pasado
    				if(month_prev==2) month=28;
    				else if(month_prev==4 || month_prev==6 || month_prev==9 || month_prev==11)
    					month=30;
    				else month=31;
    				dif_day=date_now.getDate()+(month-day_prev);
    				if(dif_day<=7) {
    					graphFunction.addDate(dif_day, (day_last+(month-day_prev)), funct);
    				}
    				else if(dif_day<=10 && seven_days) {
    					graphFunction.addDate(dif_day, (day_last+(month-day_prev)), funct);
    					seven_days=false;
    				}
    				else if(dif_day>10 && ten_days && (((date_now.getMonth()+1)!=month_post) && (date_now.getDate()+(month-day_post))<=10) || ((date_now.getMonth()+1)==month_post) && (date_now.getDate()-day_post<=10)) {
    					graphFunction.addDate(dif_day, (day_last+(month-day_prev)), funct);
    					ten_days=false;
    				}
    			}
    		}
    	}
    }
};

//Funcion que devuelve la hora del primer dato que se ha recogido en el dia actual
graphFunction.getHourToday=function(date_now, arrayData) {
	var today=date_now.getDate(), this_month=date_now.getMonth()+1;
	for(var i=0; i<arrayData.length; i++) {
		if(arrayData[i].date.split("-")[0].split("/")[0]==today && arrayData[i].date.split("-")[0].split("/")[1]==this_month) 
			return arrayData[i].date.split("-")[1].split(":")[0];
	}
	return date_now.getHours();
};

//Funcion que detecta si la hora especifica existe entre los datos
graphFunction.findHour=function(i, hour_today, date_now, arrayData) {
	var today=date_now.getDate(), this_month=date_now.getMonth()+1;
	for(var j=0; j<arrayData.length; j++) {
		if(arrayData[j].date.split("-")[1].split(":")[0]==(hour_today+i) && arrayData[j].date.split("-")[0].split("/")[0]==today && arrayData[j].date.split("-")[0].split("/")[1]==this_month)
			return true;
	}
	return false;
};

//Funcion que detecta si el dia especifico existe entre los datos
graphFunction.findDay=function(i, minDay, arrayData) {
	for(var j=0; j<arrayData.length; j++) {
		if(arrayData[j].date.split("-")[0].split("/")[0]==(minDay+i))
			return true;
	}
	return false;
};

//Pintamos la gráfica con los datos especificados por el usuario en el modo de fechas (desde - hasta)
graphFunction.paintGraph=function(arrayData, funct){ 
	//Establecemos los límites de los datos que ha especificado el usuario
	var dateF=controller.getDocumentIdValue('dateFrom'+funct);
	var dateT=controller.getDocumentIdValue('dateTo'+funct);
	var valueHourF=controller.getDocumentIdValue('hourFrom'+ funct), valueMinF=controller.getDocumentIdValue('minFrom'+ funct);
	var timeF=((valueHourF>23)?"23":valueHourF)+":"+((valueMinF>59)?"59":valueMinF);
	var valueHourT=controller.getDocumentIdValue('hourTo'+ funct), valueMinT=controller.getDocumentIdValue('minTo'+ funct);
	var timeT=((valueHourT>23)?"23":valueHourT)+":"+((valueMinT>59)?"59":valueMinT);
	var yearF, yearT, monthF, monthT, dayF, dayT, hourF, hourT, minF, minT;
	var day_now, month_now, year_now, hour_now, min_now;
	paint_lim_inf=0;
	paint_lim_sup=arrayData.length-1;
	if(timeF==":") { //Si el usuario solo ha especificado desde una fecha
		dateF=dateF.split("-");
	   	yearF=Number(dateF[0]); monthF=Number(dateF[1]); dayF=Number(dateF[2]);
	   	dateT=dateT.split("-");
	   	yearT=Number(dateT[0]); monthT=Number(dateT[1]); dayT=Number(dateT[2]);
	   	if(timeT==":")
			controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
		else controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT+"-"+timeT);
	   	controller.setDocumentIdInnerHTML('from'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF);
		for(var i=0; i<arrayData.length; i++) {
			day_now=Number(arrayData[i].date.split("-")[0].split("/")[0]);
			month_now=Number(arrayData[i].date.split("-")[0].split("/")[1]);
			year_now=Number(arrayData[i].date.split("-")[0].split("/")[2]);
			if(((day_now>=dayF && month_now==monthF) || (month_now>monthF)) && year_now>=yearF) {
				paint_lim_inf=i;
				break;
			}
		}
	}
	else { //Si el usuario solo ha especificado desde una fecha con hora
		dateF=dateF.split("-");
	   	yearF=Number(dateF[0]); monthF=Number(dateF[1]); dayF=Number(dateF[2]);
	   	dateT=dateT.split("-");
	   	yearT=Number(dateT[0]); monthT=Number(dateT[1]); dayT=Number(dateT[2]);
	   	hourF=Number(timeF.split(":")[0]);
	   	minF=Number(timeF.split(":")[1]);
	   	if(timeT==":")
			controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+"-"+timeF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
		else controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+"-"+timeF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT+"-"+timeT);
		controller.setDocumentIdInnerHTML('from'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF);
		for(var i=0; i<arrayData.length; i++) {
			day_now=Number(arrayData[i].date.split("-")[0].split("/")[0]);
			month_now=Number(arrayData[i].date.split("-")[0].split("/")[1]);
			year_now=Number(arrayData[i].date.split("-")[0].split("/")[2]);
			hour_now=Number(arrayData[i].date.split("-")[1].split(":")[0]);
			min_now=Number(arrayData[i].date.split("-")[1].split(":")[1]);
			if(((day_now>=dayF && month_now==monthF) || (month_now>monthF)) && year_now>=yearF) {
				if(hour_now==hourF && min_now>=minF) {
					paint_lim_inf=i;
					break;
				}
				else if(hour_now>hourF) {
					paint_lim_inf=i;
					break;
				}
			}
		}
	}
	dateF=controller.getDocumentIdValue('dateFrom'+funct);
	dateT=controller.getDocumentIdValue('dateTo'+funct);
	if(timeT==":") { //Si el usuario ha especificado hasta una fecha
		dateF=dateF.split("-");
	   	yearF=Number(dateF[0]); monthF=Number(dateF[1]); dayF=Number(dateF[2]);
		dateT=dateT.split("-");
	   	yearT=Number(dateT[0]); monthT=Number(dateT[1]); dayT=Number(dateT[2]);
	   	if(timeF==":")
			controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
		else controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+"-"+timeF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
	   	controller.setDocumentIdInnerHTML('to'+funct, ((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
		for(var i=0; i<arrayData.length; i++) {
			day_now=Number(arrayData[i].date.split("-")[0].split("/")[0]);
			month_now=Number(arrayData[i].date.split("-")[0].split("/")[1]);
			year_now=Number(arrayData[i].date.split("-")[0].split("/")[2]);
			if(((day_now<=dayT && month_now==monthT) || (month_now<monthT)) && year_now<=yearT) {
				paint_lim_sup=i;
			}
		}
	}
	else { //Si el usuario ha especificado hasta una fecha con hora
		dateF=dateF.split("-");
	   	yearF=Number(dateF[0]); monthF=Number(dateF[1]); dayF=Number(dateF[2]);
		dateT=dateT.split("-");
	   	yearT=Number(dateT[0]); monthT=Number(dateT[1]); dayT=Number(dateT[2]);
		hourT=Number(timeT.split(":")[0]);
	   	minT=Number(timeT.split(":")[1]);
		if(timeF==":")
			controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT+"-"+timeT);
		else controller.setDocumentIdInnerHTML('infoDate'+funct, ((dayF<10)?"0":"")+dayF+"/"+((monthF<10)?"0":"")+monthF+"/"+yearF+"-"+timeF+" -> "+((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT+"-"+timeT);
		controller.setDocumentIdInnerHTML('to'+funct, ((dayT<10)?"0":"")+dayT+"/"+((monthT<10)?"0":"")+monthT+"/"+yearT);
		for(var i=(arrayData.length-1); i>=0; i--) {
			day_now=Number(arrayData[i].date.split("-")[0].split("/")[0]);
			month_now=Number(arrayData[i].date.split("-")[0].split("/")[1]);
			year_now=Number(arrayData[i].date.split("-")[0].split("/")[2]);
			hour_now=Number(arrayData[i].date.split("-")[1].split(":")[0]);
			min_now=Number(arrayData[i].date.split("-")[1].split(":")[1]);
			if(((day_now<=dayT && month_now==monthT) || (month_now<monthT)) && year_now<=yearT) {
				if(hour_now==hourT && min_now<=minT) { 
					paint_lim_sup=i;
					break;
				}
				else if(hour_now<hourT) {
					paint_lim_sup=i;
					break;
				}
			}
		}
	}
	if(paint_lim_inf==0 && paint_lim_sup==arrayData.length-1) controller.setDocumentIdInnerHTML('infoDate'+funct, controller.getTraduction('infoDate_all'));
};

//Pintamos la gráfica con los datos especificados por el usuario en el modo de datos por dias
graphFunction.paintGraphForDay=function(select, arrayData, funct){ 
    //Establecemos los límites de los datos que ha especificado el usuario
	var hour, hour_choice, today, month, this_month, lim_for, date, month_date, date_choice=0, optionDate, day_last, month_last, month_aux;
    var date_now = new Date();
    if(select==0) optionDate=controller.getDocumentIdSelectedValue('listHour'+funct);
    else optionDate=controller.getDocumentIdSelectedValue('listDate'+funct);
    paint_lim_inf=0;
    paint_lim_sup=arrayData.length-1;
    if(select==0 && optionDate!="-1") { //Si no ha seleccionado todos los datos buscamos los limites de la lista de datos por horas
    	controller.setDocumentIdInnerHTML('infoDate'+funct, controller.getDocumentIdSelectedText('listHour'+funct));
    	today=date_now.getDate();
    	this_month=date_now.getMonth()+1;
    	lim_for=arrayData.length-1;
    	for(var i=0; i<=lim_for; i++) {
    		hour=Number(arrayData[i].date.split("-")[1].split(":")[0]);
    		hour_choice=Number(arrayData[lim_for].date.split("-")[1].split(":")[0])-optionDate;
    		if(hour==hour_choice && arrayData[i].date.split("-")[0].split("/")[0]==today && arrayData[i].date.split("-")[0].split("/")[1]==this_month) {
    			paint_lim_inf=i;
    			break;
    		}
    	}
    	for(var i=lim_for; i>=0; i--) {
    		hour=Number(arrayData[i].date.split("-")[1].split(":")[0]);
    		hour_choice=Number(arrayData[lim_for].date.split("-")[1].split(":")[0])-optionDate;
    		if(hour==hour_choice  && arrayData[i].date.split("-")[0].split("/")[1]==this_month) {
    			paint_lim_sup=i;
    			break;
    		}
    	}
    }
    else if(select==1 && optionDate!="-1") { //Buscamos los datos por dias
    	controller.setDocumentIdInnerHTML('infoDate'+funct, controller.getDocumentIdSelectedText('listDate'+funct));
    	lim_for=arrayData.length-1;
    	day_last=Number(arrayData[lim_for].date.split("-")[0].split("/")[0]);
    	month_last=Number(arrayData[lim_for].date.split("-")[0].split("/")[1]);
    	var dif_day, dif_today;
    	dif_today=date_now.getDate()-day_last;
    	//Primero buscamos el limite inferior de la lista de datos
    	for(var i=0; i<=lim_for; i++) {
    		month_aux=Number(arrayData[i].date.split("-")[0].split("/")[1]);
    		if(month_aux==2) month=28;
			else if(month_aux==4 || month_aux==6 || month_aux==9 || month_aux==11)
				month=30;
			else month=31;
    		date=Number(arrayData[i].date.split("-")[0].split("/")[0]);
    		month_date=Number(arrayData[i].date.split("-")[0].split("/")[1]);
    		dif_day=day_last-optionDate;
    		if(dif_day<=0) 
    			date_choice=day_last+(month-optionDate);
    		else date_choice=dif_day;
    		if(optionDate<=(7-dif_today)) {
    			if(date==date_choice) {
    				if(dif_day<=0 && month_last!=month_date) {
    					paint_lim_inf=i;
    					break;
    				} else if (dif_day>0 && month_last==month_date) {
    					paint_lim_inf=i;
    					break;
    				}
    			}
    		}
    		else if(optionDate<=(10-dif_today)) {
    			if(date>=date_choice) {
    				if(dif_day<=0 && month_last!=month_date) {
    					paint_lim_inf=i;
    					break;
    				} else if (dif_day>0 && month_last==month_date) {
    					paint_lim_inf=i;
    					break;
    				}
    			}
    		}
    		else if(optionDate>(10-dif_today)) {
    			paint_lim_inf=0;
    			break;
    		}
    	}
    	//Despues buscamos el limite superior en la lista de datos
    	for(var i=lim_for; i>=0; i--) {
    		month_aux=Number(arrayData[i].date.split("-")[0].split("/")[1]);
    		if(month_aux==2) month=28;
			else if(month_aux==4 || month_aux==6 || month_aux==9 || month_aux==11)
				month=30;
			else month=31;
    		date=Number(arrayData[i].date.split("-")[0].split("/")[0]);
    		month_date=Number(arrayData[i].date.split("-")[0].split("/")[1]);
    		dif_day=day_last-optionDate;
    		if(dif_day<=0) 
    			date_choice=day_last+(month-optionDate);
    		else data_choice=dif_day;
    		if(optionDate<=(7-dif_today)) {
    			if(date==date_choice) {
    				if(dif_day<=0 && month_last!=month_date) {
        				paint_lim_sup=i;
        				break;
    				} else if (dif_day>0 && month_last==month_date) {
        				paint_lim_sup=i;
        				break;
    				}
    			}
    		}
    		else if(optionDate<=(10-dif_today)) {
    			if(date<=(date_choice+(optionDate-8))) {
    				if(dif_day<=0 && month_last!=month_date) {
        				paint_lim_sup=i;
    					break;
    				} else if (dif_day>0 && month_last==month_date) {
        				paint_lim_sup=i;
        				break;
    				}
    			}
    		}
    		else if(optionDate>(10-dif_today)) {
    			if(date<=date_choice) {
    				if(dif_day<=0 && month_last!=month_date) {
        				paint_lim_sup=i;
        				break;
    				} else if (dif_day>0 && month_last==month_date) {
        				paint_lim_sup=i;
    					break;
    				}
    			}
    		}
    	}
    }
    else controller.setDocumentIdInnerHTML('infoDate'+funct, controller.getTraduction('infoDate_all'));
};

//Funcion que desplaza los limites de la funcion para repintar la grafica cuando el usuario desplaza el dedo por la grafica
graphFunction.touchZoomRepaint=function(mode, arrayData, lim_inf_now, lim_sup_now) {
	var lim_inf, lim_sup, mov=Math.round((lim_sup_now-lim_inf_now)/2);
	if(mode==1) {	
		lim_inf=lim_inf_now-mov;
		lim_sup=lim_sup_now-mov;
		if(lim_inf<0) {
			lim_inf=0;
			lim_sup=lim_sup_now;
		}
	} else {
		lim_inf=lim_inf_now+mov;
		lim_sup=lim_sup_now+mov;
		if(lim_sup>=arrayData.length) {
			lim_inf=lim_inf_now;
			lim_sup=arrayData.length-1;
		} 
	}
	paint_lim_inf=lim_inf;
	paint_lim_sup=lim_sup;
};