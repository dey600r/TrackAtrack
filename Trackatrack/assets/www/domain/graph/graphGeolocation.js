var geolocation, paint_lim_infG, paint_lim_supG, /*frequentClusters=new Array()*/ pathClusters=new Array(), distancias=new Array(), pertenencias=new Array(), matrizClusters=new Array(), graphGeolocation=new Object();

//Get datos del GPS
graphGeolocation.getGeolocation=function() {
	return geolocation;
};

//Set datos del GPS
graphGeolocation.setGeolocation=function(geo) {
	geolocation=geo;
};

//Set superior datos del GPS
graphGeolocation.setLim_inf=function(lim) {
	paint_lim_infG=lim;
};

//Set limite superior datos del GPS
graphGeolocation.setLim_sup=function(lim) {
	paint_lim_supG=lim;
};

//Get datos del GPS ordenados por orden en clusters
graphGeolocation.getPathClusters=function() {
	return pathClusters;
};

//Get datos del GPS en clusters
graphGeolocation.getMatrizClusters=function() {
	return matrizClusters;
};

//Iniciamos los datos y la interfaz antes de mostrar el mapa
graphGeolocation.paintImageGeo=function(geo) {  
	geolocation=geo;
    paint_lim_infG=0;
    paint_lim_supG=-1;
    var date_ini=geolocation[0].date.split("-"), date_end=geolocation[geolocation.length-1].date.split("-");
    controller.setDocumentIdInnerHTML('fromGeo', date_ini[0]);
    controller.setDocumentIdInnerHTML('toGeo', date_end[0]);
    controller.setDocumentIdValue('dateFromGeo', date_ini[0].split("/")[2]+"-"+date_ini[0].split("/")[1]+"-"+date_ini[0].split("/")[0]);
    controller.setDocumentIdValue('dateToGeo', date_end[0].split("/")[2]+"-"+date_end[0].split("/")[1]+"-"+date_end[0].split("/")[0]);
    controller.setDocumentIdPlaceholder('hourFromGeo', date_ini[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minFromGeo', date_ini[1].split(":")[1]);
    controller.setDocumentIdPlaceholder('hourToGeo', date_end[1].split(":")[0]);
    controller.setDocumentIdPlaceholder('minToGeo', date_end[1].split(":")[1]);
    controller.setDocumentIdOptionsLength('listDateGeo', 1);
    controller.setDocumentIdOptionsLength('listHourGeo', 1);
    graphFunction.initDataFunction(geo, "Geo");
    navigator.notification.activityStop();
    graphGeolocation.paintGraphG(0,-1);
};

//Mostramos el mapa con los puntos de localizacion con los datos seleccionados por el usuario en el modo por fechas
graphGeolocation.paintGraphGeo=function() {
	graphFunction.paintGraph(geolocation, "Geo");
	paint_lim_infG=graphFunction.getLimInf();
    paint_lim_supG=graphFunction.getLimSup();
    graphGeolocation.paintGraphG(paint_lim_infG, paint_lim_supG);
};

//Mostramos el mapa con los puntos de localizacion con los datos seleccionados por el usuario en el modo por dias y horas
graphGeolocation.paintGraphForDayGeo=function(select){
	graphFunction.paintGraphForDay(select, geolocation, "Geo");
	paint_lim_infG=graphFunction.getLimInf();
    paint_lim_supG=graphFunction.getLimSup();
    graphGeolocation.paintGraphG(paint_lim_infG, paint_lim_supG);
};

//Repintamos el mapa ante algunas elecciones del usuario
graphGeolocation.repaint=function() {
	graphGeolocation.paintGraphG(paint_lim_infG, paint_lim_supG);
};

//Pintamos las localizaciones dependiendo del modo elegido por el usuario
graphGeolocation.paintGraphG=function(lim_inf, lim_sup) {
	if((lim_sup-lim_inf)>=150) navigator.notification.activityStart("", controller.getTraduction('lbl_loading_map'));
	var sistem_type, travel_mode=controller.getDocumentIdSelectedValue('travel_mode');
	if(travel_mode=="points") 
		sistem_type=controller.getDocumentIdSelectedValue('sistem_type_points');
	else if(travel_mode=="route") 
		sistem_type=controller.getDocumentIdSelectedValue('sistem_type_route');
	else {
		sistem_type=controller.getDocumentIdSelectedValue('sistem_type_area');
	}
	switch(travel_mode) {
	case "points":
		controller.paintGraphPoints(travel_mode, sistem_type, lim_inf, lim_sup);
		break;
	case "route":
		controller.paintGraphPoints(travel_mode, sistem_type, lim_inf, lim_sup);
		break;
	case "area":
		if(sistem_type!="clusters")	controller.paintGraphPoints(travel_mode, sistem_type, lim_inf, lim_sup);
		//else if((lim_sup-lim_inf)>50) controller.paintGraphClusters(sistem_type, lim_inf, lim_sup);
		//else controller.paintGraphPoints(travel_mode, sistem_type, lim_inf, lim_sup);
		else controller.paintGraphClusters(sistem_type, lim_inf, lim_sup);
		break;
	}
	navigator.notification.activityStop();
};

/*ALGORITMO DE CLUSTERING K-MEANS*/

//Iniciamos cada cluster con un punto de localizacion al azar
graphGeolocation.initMClusters=function(clusters) {
	matrizClusters[0]=new Array();
	matrizClusters[0][0]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/10)].lat;
	matrizClusters[0][1]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/10)].lon;
	matrizClusters[1]=new Array();
	matrizClusters[1][0]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/7)].lat;
	matrizClusters[1][1]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/7)].lon;
	if(clusters>=3) {
		matrizClusters[2]=new Array();
		matrizClusters[2][0]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/5)].lat;
		matrizClusters[2][1]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/5)].lon;
		if(clusters>=4) {
			matrizClusters[3]=new Array();
			matrizClusters[3][0]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/3)].lat;
			matrizClusters[3][1]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/3)].lon;
			if(clusters==5) {
				matrizClusters[4]=new Array();
				matrizClusters[4][0]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/2)].lat;
				matrizClusters[4][1]=geolocation[Math.floor((paint_lim_supG-paint_lim_infG)/2)].lon;
			}
		}
	}
};

//Calculamos la madia de las distancias entre los clusters y todos los demas puntos
graphGeolocation.calcularMDistancias=function(clusters) {
	var tempp, temp1, temp2;
	for(var i=0; i<clusters; i++) {
		distancias[i]=new Array();
		for(var j=paint_lim_infG; j<=paint_lim_supG; j++) {
			tempp=0;
			temp1=Math.pow((geolocation[j].lat-matrizClusters[i][0]), 2);
			temp2=Math.pow((geolocation[j].lon-matrizClusters[i][1]), 2);
			tempp=tempp+temp1+temp2;
			distancias[i][j]=Math.sqrt(tempp);
		}
	}
};

//Calculamos la matriz de pertenencias para cada cluster
graphGeolocation.calcularMPertenencias=function(clusters) {
	if(clusters==2) {
		pertenencias[0]=new Array();
		pertenencias[1]=new Array();
		for(var j=paint_lim_infG; j<=paint_lim_supG; j++) {
			if(distancias[0][j]>distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;
			}else {
				pertenencias[0][j]=1; pertenencias[1][j]=0;
			}
		}
	}
	else if(clusters==3) {
		pertenencias[0]=new Array();
		pertenencias[1]=new Array();
		pertenencias[2]=new Array();
		for(var j=paint_lim_infG; j<paint_lim_supG; j++) {
			if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2;
			}else if(distancias[0][j]<=distancias[1][j] && distancias[1][j]<=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=0;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[2][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=1;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=0;
			} else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=2;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=1;
			} else {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2;
			}
		}
	} else if(clusters==4) {
		pertenencias[0]=new Array();
		pertenencias[1]=new Array();
		pertenencias[2]=new Array();
		pertenencias[3]=new Array();
		for(var j=paint_lim_infG; j<paint_lim_supG; j++) {
			if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=3;
			}else if(distancias[0][j]<distancias[1][j] && distancias[1][j]<distancias[2][j] && distancias[2][j]<distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=0;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=3;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=1;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=2;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=2;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=1;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=3;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=2;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=3;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=2;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=0;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=0;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=3;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=1;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=0;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=3;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=0;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=1;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=2;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=0;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=2;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=1;
			}else {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=3;
			}
		}
	} else if(clusters==5) {
		pertenencias[0]=new Array();
		pertenencias[1]=new Array();
		pertenencias[2]=new Array();
		pertenencias[3]=new Array();
		pertenencias[4]=new Array();
		for(var j=paint_lim_infG; j<paint_lim_supG; j++) {
			if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[0][j]<distancias[1][j] && distancias[1][j]<distancias[2][j] && distancias[2][j]<distancias[3][j] && distancias[3][j]<distancias[4][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=0; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=1; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=3;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else if(distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=3;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else if(distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j]) {
				pertenencias[0][j]=2; pertenencias[1][j]=4;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=0;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=4;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=2;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=1;	pertenencias[2][j]=4; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=4;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=4; pertenencias[4][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[4][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=4;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[3][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=4; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else if(distancias[4][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j] && distancias[0][j]>=distancias[2][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=2;	pertenencias[2][j]=4; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else if(distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j] && distancias[0][j]>=distancias[1][j]) {
				pertenencias[0][j]=3; pertenencias[1][j]=4;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=0;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=3;
			}else if(distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=2;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=1;	pertenencias[2][j]=3; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=3;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=0; pertenencias[3][j]=3; pertenencias[4][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[4][j] && distancias[4][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=3;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[3][j] && distancias[3][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=1; pertenencias[3][j]=3; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else if(distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[2][j] && distancias[2][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=2;	pertenencias[2][j]=3; pertenencias[3][j]=1; pertenencias[4][j]=0;
			}else if(distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=1; pertenencias[4][j]=2;
			}else if(distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=0; pertenencias[3][j]=2; pertenencias[4][j]=1;
			}else if(distancias[3][j]>=distancias[2][j] && distancias[2][j]>=distancias[4][j] && distancias[4][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=0; pertenencias[4][j]=2;
			}else if(distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[3][j] && distancias[3][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=1; pertenencias[3][j]=2; pertenencias[4][j]=0;
			}else if(distancias[3][j]>=distancias[4][j] && distancias[4][j]>=distancias[2][j] && distancias[2][j]>=distancias[1][j] && distancias[1][j]>=distancias[0][j]) {
				pertenencias[0][j]=4; pertenencias[1][j]=3;	pertenencias[2][j]=2; pertenencias[3][j]=0; pertenencias[4][j]=1;
			}else {
				pertenencias[0][j]=0; pertenencias[1][j]=1;	pertenencias[2][j]=2; pertenencias[3][j]=3; pertenencias[4][j]=4;
			}
		}
	}
};

//Asociamos cada localizacion (latitud, longitud) al cluster que mas cerca tenga
graphGeolocation.calcularMCentroides=function(clusters) {
	var suma=new Array(), cantidad=new Array(), media=new Array(), location;
	suma[0]=new Array(); suma[0][0]=0; suma[0][1]=0; //Iniciamos los datos necesarios
	suma[1]=new Array(); suma[1][0]=0; suma[1][1]=0;
	cantidad[0]=0; cantidad[1]=0; 
	media[0]=new Array();
	media[1]=new Array();
	if(clusters>=3) {
		suma[2]=new Array(); suma[2][0]=0; suma[2][1]=0; cantidad[2]=0;
		if(clusters>=4) {
			suma[3]=new Array(); suma[3][0]=0; suma[3][1]=0; cantidad[3]=0;
			if(clusters==5) {
				suma[4]=new Array(); suma[4][0]=0; suma[4][1]=0; cantidad[4]=0;
			}
		}
	}
	for(var i=0; i<clusters; i++) { //Recorremos todos los clusters
		pathClusters[i]=[];
		for(var j=paint_lim_infG; j<=paint_lim_supG; j++) { //Recorremos todas las localizacions
			if(pertenencias[i][j]!=0) {
				//Segundo la distancia los metemos en un cluster u otro
				if(clusters==5 && pertenencias[i][j]==4) {
					location=[geolocation[j].lat, geolocation[j].lon, geolocation[j].spe];
					pathClusters[i].push(location);
					cantidad[i]=cantidad[i]+1;
					suma[i][0]=suma[i][0]+geolocation[j].lat;
					suma[i][1]=suma[i][1]+geolocation[j].lon;
				}
				else if(clusters==4 && pertenencias[i][j]==3) {
					location=[geolocation[j].lat, geolocation[j].lon, geolocation[j].spe];
					pathClusters[i].push(location);
					cantidad[i]=cantidad[i]+1;
					suma[i][0]=suma[i][0]+geolocation[j].lat;
					suma[i][1]=suma[i][1]+geolocation[j].lon;
				}
				else if(clusters==3 && pertenencias[i][j]==2) {
					location=[geolocation[j].lat, geolocation[j].lon, geolocation[j].spe];
					pathClusters[i].push(location);
					cantidad[i]=cantidad[i]+1;
					suma[i][0]=suma[i][0]+geolocation[j].lat;
					suma[i][1]=suma[i][1]+geolocation[j].lon;
				} else if(clusters==2 && pertenencias[i][j]==1) {
					location=[geolocation[j].lat, geolocation[j].lon, geolocation[j].spe];
					pathClusters[i].push(location);
					cantidad[i]=cantidad[i]+1;
					suma[i][0]=suma[i][0]+geolocation[j].lat;
					suma[i][1]=suma[i][1]+geolocation[j].lon;
				}
			} 
		}
		media[0][i]=suma[i][0]/cantidad[i];
		media[1][i]=suma[i][1]/cantidad[i];
		//if(pathClusters[i].length==0) {
			matrizClusters[i][0]=media[0][i];
			matrizClusters[i][1]=media[1][i];
		//} else {
		//	matrizClusters[i][0]=pathClusters[i][Math.floor(pathClusters[i].length/2)][0];
		//	matrizClusters[i][1]=pathClusters[i][Math.floor(pathClusters[i].length/2)][1];
		//}	
	}
};

graphGeolocation.getMostFrequent=function(arrayIndex) {
	var aux=-1, index=0, ok=true;
	for(var i=0; i<pathClusters.length; i++) {
		for(var j=0; j<arrayIndex.length; j++) {
			if(i==arrayIndex[j]) ok=false;
		}
		if(ok==true && pathClusters[i].length>aux) {
			aux=pathClusters[i].length;
			index=i;
		}
		ok=true;
	}
	return index;
};