var controller=new Object(), language="English", trad=new Array();

function getController() {
	return controller;
}

controller.getDocumentId=function(id) {
	return document.getElementById(id);
};
controller.setLanguage=function(lang) {
	language=lang;
};

controller.getLanguage=function(){
	return language;
};

controller.setTraduction=function(traduction) {
	trad=traduction;
};

controller.getTraduction=function(id) {
	for(var i=0; i<trad.length; i++) {
		if(trad[i].idHtml==id) {
			if(language!="English") return trad[i].es;
			else return trad[i].en;
		}
	}
};

controller.initSystem=function() {
	userDB.createUserDB();
	userDB.initUserDB();
	accelerometerDB.createAccelerometerDB();
	compassDB.createCompassDB();
	geolocationDB.createGeolocationDB();
	appMobileDB.createAppDB();
};

/*FUNCIONES domain.apis*/

controller.getDocumentIdSelectedValue=function(id) {
	var data_select=document.getElementById(id).selectedIndex;
    return document.getElementById(id).options[data_select].value;
};

controller.setDocumentIdSelectedValue=function(id, value) {
	document.getElementById(id).selectedIndex=value;
};

controller.getDocumentIdChecked=function(id) {
	return document.getElementById(id).checked;
};

controller.setDocumentIdInnerHTML=function(id, msg) {
	document.getElementById(id).innerHTML=msg;
};

controller.setDocumentIdSrc=function(id, url) {
	document.getElementById(id).src=url;
};

controller.setDocumentIdColor=function(id, color) {
	 document.getElementById(id).style.color=color;
};

controller.setDocumentIdClass=function(id, className) {
	document.getElementById(id).className=className;
};

/*FUNCIONES domain.graph*/

controller.setDocumentIdPlaceholder=function(id, msg) {
	document.getElementById(id).placeholder=msg;
};

controller.setDocumentIdDisabled=function(id) {
	$(id).slideUp("fast");
};

controller.setDocumentIdEnabled=function(id) {
	$(id).slideDown("fast");
};

controller.setDocumentIdOptionsLength=function(id, value) {
	document.getElementById(id).options.length=value;
};

controller.setDocumentIdVisibility=function(id, value) {
	document.getElementById(id).style.visibility=value;
};

controller.setDocumentIdImage=function(id, url) {
	document.getElementById(id).style.backgroundImage=url;
};

controller.getDocumentIdValue=function(id) {
	return document.getElementById(id).value;
};

controller.setDocumentIdValue=function(id, value) {
	document.getElementById(id).value=value;
};

controller.getDocumentIdInnerHTML=function(id) {
	return document.getElementById(id).innerHTML;
};

controller.getDocumentIdSelected=function(id) {
	return document.getElementById(id).selectedIndex;
};

controller.setDocumentIdLeft=function(id, value) {
	document.getElementById(id).style.left=value;
};

controller.getDocumentIdLeft=function(id) {
	return document.getElementById(id).style.left;
};

controller.setDocumentIdTop=function(id, value) {
	document.getElementById(id).style.top=value;
};

controller.getDocumentIdTop=function(id) {
	return document.getElementById(id).style.top;
};

controller.setDocumentIdWidthHeight=function(id, width, height) {
	document.getElementById(id).style.width=width;
	document.getElementById(id).style.height=height;
};

controller.setDocumentIdCreateOption=function(id, text, value) {
	var opt=document.createElement("option");
    document.getElementById(id).options.add(opt);
    opt.text=text;
	opt.value=value;
};

controller.getDocumentIdSelectedText=function(id) {
	var data_select=document.getElementById(id).selectedIndex;
    return document.getElementById(id).options[data_select].text;
};

controller.paintGraphTime=function(mode, funct) {
	if(mode==0) {
		if(document.getElementById('minFrom'+funct).value=="") 
			document.getElementById('minFrom'+funct).value="00";
		else if(document.getElementById('minFrom'+funct).value>59)
			document.getElementById('minFrom'+funct).value="59";
		else if(document.getElementById('minFrom'+funct).value<10 && document.getElementById('minFrom'+funct).value.length==1) 
			document.getElementById('minFrom'+funct).value="0"+document.getElementById('minFrom'+funct).value;
		if(document.getElementById('hourFrom'+funct)=="") 
			document.getElementById('hourFrom'+funct).value="00";
		else if(document.getElementById('hourFrom'+funct).value>23)
			document.getElementById('hourFrom'+funct).value= "23";
		else if(document.getElementById('hourFrom'+funct).value<10 && document.getElementById('hourFrom'+funct).value.length==1) 
			document.getElementById('hourFrom'+funct).value="0"+document.getElementById('hourFrom'+funct).value;
	} else {
		if(document.getElementById('minTo'+funct).value=="") 
			document.getElementById('minTo'+funct).value="00";
		else if(document.getElementById('minTo'+funct).value>59)
			document.getElementById('minTo'+funct).value="59";
		else if(document.getElementById('minTo'+funct).value<10 && document.getElementById('minTo'+funct).value.length==1) 
			document.getElementById('minTo'+funct).value="0"+document.getElementById('minTo'+funct).value;
		if(document.getElementById('hourTo'+funct).value=="") 
			document.getElementById('hourTo'+funct).value="00";
		else if(document.getElementById('hourTo'+funct).value>23)
			document.getElementById('hourTo'+funct).value="23";
		else if(document.getElementById('hourTo'+funct).value<10 && document.getElementById('hourTo'+funct).value.length==1) 
			document.getElementById('hourTo'+funct).value="0"+document.getElementById('hourTo'+funct).value;
	}	
	if(funct=="Accel") graphAccelerometer.paintGraphAccel();
	else if(funct=="Comp") graphCompass.paintGraphComp();
	else if(funct=="Geo") graphGeolocation.paintGraphGeo();
	else graphAppMobile.paintGraphApp();
};

controller.setDocumentIdCreateRowTableNormal=function(row, value) {
	var cell = row.insertCell(0);
    var element = document.createElement("h5");
    element.innerHTML = value.name;
    element.className='table_form_app';
    if(value.name=='Unknown connection' || value.name=='Ethernet connection' || value.name=='WiFi connection' || value.name=='Cell 2G connection' || value.name=='Cell 3G connection' || value.name=='Cell 4G connection' || value.name=='No network connection')
    	element.style.color="#00C20B";
    cell.appendChild(element);
    cell = row.insertCell(1);
    element = document.createElement("h5");
    element.innerHTML = value.state;
    if(value.state=="Opened") element.style.color="#00C20B";
    else if(value.state=="Closed") element.style.color='red';
    else if(value.state=="Background") element.style.color="#0097D6";
    else if(value.state=="ScreenOff" || value.state=="On" || value.state=="Off" || value.state=="Critical") element.style.color="#FFFF00";
    element.className='table_form_app';
    cell.appendChild(element);
    cell = row.insertCell(2);
    element = document.createElement("h5");
    element.innerHTML = value.date;
    element.className='table_form_app';
    if(value.name=='Unknown connection' || value.name=='Ethernet connection' || value.name=='WiFi connection' || value.name=='Cell 2G connection' || value.name=='Cell 3G connection' || value.name=='Cell 4G connection' || value.name=='No network connection')
    	element.style.color="#00C20B";
    cell.appendChild(element);
};

controller.setDocumentIdCreateRowTableTitle=function(row, col1, col2, col3) {
	var cell1 = row.insertCell(0);
    var element1 = document.createElement("h5");
    element1.innerHTML = col1;
    element1.className='table_form_titleApp';
    cell1.appendChild(element1);
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("h5");
    element2.innerHTML = col2;
    element2.className='table_form_titleApp';
    cell2.appendChild(element2);
    var cell3 = row.insertCell(2);
    var element3 = document.createElement("h5");
    element3.innerHTML = col3;
    element3.className='table_form_titleApp';
    cell3.appendChild(element3);
};

controller.setDocumentIdCreateRowTableSummary=function(row, value) {
	var cell = row.insertCell(0);
    var element = document.createElement("h5");
    element.innerHTML = value.name;
    element.className='table_form_app';
    cell.appendChild(element);
    cell = row.insertCell(1);
    controller.getDocumentId('table_summaryApp');
    element = document.createElement("h5");
    element.innerHTML = value.freq;
    element.className='table_form_app';
    cell.appendChild(element);
    cell = row.insertCell(2);
    element = document.createElement("h5");
    element.innerHTML = value.time;
    element.className='table_form_app';
    cell.appendChild(element);
};

/*FUNCIONES PARA PINTAR LAS GRAFICAS domain.graph*/

controller.paintGraphA=function(lim_inf, lim_sup) { //Graficas del accelerometro
	var ctx = document.getElementById ('canvasAccelerometer');
	var contenido = ctx.getContext ('2d');
	var imageAccel = new Image();
	var accelerometer=graphAccelerometer.getAccelerometer();
    imageAccel.src = '../images/grafica.png';
    ctx.width=464;
    ctx.height=241;
    imageAccel.onload = function(){
        //Inicializamos la gráfica
    	contenido.clearRect(0, 0, ctx.width, ctx.height);
    	contenido.drawImage(imageAccel,0,0);
        if(paintA==false) {
        	if((lim_sup-lim_inf)>=4000) navigator.notification.activityStart("", controller.getTraduction('lbl_loading_graph'));
        	contenido.beginPath();
        	contenido.font="12px Arial";
        	//contenido.fillStyle="#00C20B";
        	contenido.fillStyle="#FFFFFF";
        	contenido.fillText("+20", 0, 9);
        	contenido.fillText("+15", 0, 32);
        	contenido.fillText("+10", 0, 60);
        	contenido.fillText("+5", 2, 86);
        	contenido.fillText("+0", 2, 114);
        	contenido.fillText("-5", 2, 139);
        	contenido.fillText("-10", 0, 162);
        	contenido.fillText("-15", 0, 190);
        	contenido.fillText("-20", 0, 220);
        	contenido.fillText("+20", 444, 9);
        	contenido.fillText("+15", 444, 32);
        	contenido.fillText("+10", 444, 60);
        	contenido.fillText("+5", 445, 86);
        	contenido.fillText("+0", 445, 114);
        	contenido.fillText("-5", 445, 139);
        	contenido.fillText("-10", 444, 162);
        	contenido.fillText("-15", 444, 190);
        	contenido.fillText("-20", 444, 220);
        	contenido.fillStyle="#000000";
        	contenido.font="12px Arial";
        	//Indicamos las fechas seleccionadas en el eje x de la gráfica
        	if(lim_sup!=-1) {
        		contenido.fillText(accelerometer[lim_inf].date, 23, 236);
        		contenido.fillText(accelerometer[lim_inf+(Math.floor((lim_sup-lim_inf)/2))].date, 170, 236);
        		contenido.fillText(accelerometer[lim_sup].date, 324, 236);
        	}
        }
        //Comenzamos a pintar la gráfica
        var combo=document.getElementById('listCoordinate');
        if(combo.selectedIndex==0 || combo.selectedIndex==1 || combo.selectedIndex==4 || combo.selectedIndex==5) { //Si el usuario elige pintar solo la X
            //Pintamos X
            contenido.lineWidth = 2;
            contenido.beginPath();
            var y, x, width=420/(lim_sup-lim_inf+1);
            y=113-(accelerometer[0].x*5.3);
            contenido.moveTo(21,y);
            for (var i=lim_inf; i<=lim_sup; i++){
            	coordenada=accelerometer[i].x;
            	if(coordenada>20) coordenada=20;
            	else if(coordenada<-20) coordenada=-20;
                if(coordenada==0) {;
                    x=(width*(i-lim_inf+1))+21;
                    contenido.lineTo(x,y);
                }
                else {
                    if(coordenada>0) {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                    else {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                }
            }
            contenido.strokeStyle = "#56F500";
            contenido.stroke();
        }
        if(combo.selectedIndex==0 || combo.selectedIndex==2 || combo.selectedIndex==4 || combo.selectedIndex==6) { //Si el usuario elige pintar solo la Y
            //Pintamos Y
            contenido.lineWidth = 2;
            contenido.beginPath();
            var y, x, width=420/(lim_sup-lim_inf+1);
            y=113-(accelerometer[0].y*5.3);
            contenido.moveTo(21,y);
            for (var i=lim_inf; i<=lim_sup; i++){
            	coordenada=accelerometer[i].y;
            	if(coordenada>20) coordenada=20;
            	else if(coordenada<-20) coordenada=-20;
                if(coordenada==0) {;
                    x=(width*(i-lim_inf+1))+21;
                    contenido.lineTo(x,y);
                }
                else {
                    if(coordenada>0) {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                    else {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                }
            }
            contenido.strokeStyle = "#FF270B";
            contenido.stroke();
        }
        if(combo.selectedIndex==0 || combo.selectedIndex==3 || combo.selectedIndex==5 || combo.selectedIndex==6) { //Si el usuario elige pintar solo la Z
            //Pintamos Z
            contenido.lineWidth = 2;
            contenido.beginPath();
            var y, x, width=420/(lim_sup-lim_inf+1);
            y=113-(accelerometer[0].z*5.3);
            contenido.moveTo(21,y);
            for (var i=lim_inf; i<=lim_sup; i++){
            	coordenada=accelerometer[i].z;
            	if(coordenada>20) coordenada=20;
            	else if(coordenada<-20) coordenada=-20;
                if(coordenada==0) {;
                    x=(width*(i-lim_inf+1))+21;
                    contenido.lineTo(x,y);
                }
                else {
                    if(coordenada>0) {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                    else {
                        y=113-(coordenada*5.3);
                        x=(width*(i-lim_inf+1))+21;
                        contenido.lineTo(x,y);
                    }
                }
            }
            contenido.strokeStyle = "#FFFF00";
            contenido.stroke();
        }
    	contenido.closePath();
    	navigator.notification.activityStop();
    };
};

controller.paintGraphC=function(lim_inf, lim_sup) { //Grafica de la brujula
	if((lim_sup-lim_inf)>=5000) navigator.notification.activityStart("", controller.getTraduction('lbl_loading_graph'));
	var ctx = document.getElementById ('canvasCompass');
    var contenido = ctx.getContext ('2d');
    var imageCompass = new Image();
    var compass=graphCompass.getCompass();
    imageCompass.src = '../images/grafica.png';
    //Comenzamos a pintar la gráfica
    if(document.getElementById('listImage').selectedIndex==0) {
        ctx.width=464;
        ctx.height=241;
        ctx.className='canvasGraph';
        imageCompass.onload = function(){
        	contenido.clearRect(0, 0, ctx.width, ctx.height);
            contenido.drawImage(imageCompass,0,0);
            if(paintC==false) {
            	contenido.beginPath();
            	contenido.font="13px Arial";
            	//contenido.fillStyle="#00C20B";
            	contenido.fillStyle="#FFFFFF";
            	contenido.fillText("359", 0, 9);
            	contenido.fillText("315", 0, 36);
            	contenido.fillText("270", 0, 64);
            	contenido.fillText("225", 0, 90);
            	contenido.fillText("180", 0, 118);
            	contenido.fillText("135", 0, 143);
            	contenido.fillText("90", 2, 166);
            	contenido.fillText("45", 2, 194);
            	contenido.fillText("0", 3, 221);
            	contenido.fillText("N", 444, 9);
            	contenido.fillText("W", 444, 64);
            	contenido.fillText("S", 444, 118);
            	contenido.fillText("E", 444, 166);
            	contenido.fillText("N", 444, 221);
            	contenido.fillStyle="#000000";
            	contenido.font="12px Arial";
            	//Indicamos las fechas seleccionadas en el eje x de la gráfica
            	if(lim_sup!=-1) {
            		contenido.fillText(compass[lim_inf].date, 23, 236);
            		contenido.fillText(compass[lim_inf+(Math.floor((lim_sup-lim_inf)/2))].date, 170, 236);
            		contenido.fillText(compass[lim_sup].date, 324, 236);
            	}
            }
            //Comenzamos a pintar la gráfica
            contenido.lineWidth = 2;
            contenido.beginPath();
            var y, x, width=420/(lim_sup-lim_inf+1);
            y=222-(compass[0].degrees*0.6);
            contenido.moveTo(21,y);
            for (var i=lim_inf; i<=lim_sup; i++){ //Recorremos los datos seleccionados
                y=222-(compass[i].degrees*0.6);
                x=(width*(i-lim_inf+1))+21;
                contenido.lineTo(x,y);
            }
            contenido.strokeStyle = "#0017C2";
            contenido.stroke();
            contenido.closePath();
            navigator.notification.activityStop();
        };
    }
    else {
        ctx.width=302;
        ctx.height=302;
        if(window.orientation==0 || window.orientation==180) 
        	ctx.className='portComp';
        else ctx.className='landComp';
        imageCompass.src = '../images/brujula.png';
        imageCompass.onload = function(){
            contenido.drawImage(imageCompass,0,0);
            contenido.beginPath();
            contenido.font="14px Arial";
            contenido.fillText("N", 151, 57);
            contenido.fillText("S", 138, 250);
            contenido.fillText("W", 48, 147);
            contenido.fillText("E", 245, 163);
            //Comenzamos a pintar la gráfica
            contenido.lineWidth = 1.5;
            contenido.beginPath();
            var radio=110/(lim_sup-lim_inf);
            contenido.moveTo(149,150);
            for (var i=lim_inf; i<lim_sup; i++){ //Recorremos los datos seleccionados
                anguloStart=compass[i].degrees-90;
                if(anguloStart<0) anguloStart=360+anguloStart;
                if((i+1)==lim_sup) 
                    contenido.arc(149,150,radio*(i-lim_inf+1),(anguloStart*Math.PI)/180,((anguloStart+0.01)*Math.PI)/180);
                else {
                    anguloEnd=compass[i+1].degrees-90;
                    if(anguloEnd<0) anguloEnd=360+anguloEnd;
                    if(anguloStart>anguloEnd) {
                        if(anguloStart>270 && anguloStart<360 && anguloEnd<90 && anguloEnd>0)
                            contenido.arc(149,150,radio*(i-lim_inf+1),(anguloStart*Math.PI)/180,(anguloEnd*Math.PI)/180, false);
                        else
                            contenido.arc(149,150,radio*(i-lim_inf+1),(anguloStart*Math.PI)/180,(anguloEnd*Math.PI)/180, true);
                    }
                    else {
                        if(anguloStart>0 && anguloStart<90 && anguloEnd<360 && anguloEnd>270)
                            contenido.arc(149,150,radio*(i-lim_inf+1),(anguloStart*Math.PI)/180,(anguloEnd*Math.PI)/180, true);
                        else 
                            contenido.arc(149,150,radio*(i-lim_inf+1),(anguloStart*Math.PI)/180,(anguloEnd*Math.PI)/180, false);
                    }
                }
            }
            contenido.strokeStyle = "#0017C2";
            contenido.stroke();
            contenido.closePath();
            navigator.notification.activityStop();
        };
    }
};

var marker=new google.maps.Marker(null), filter=0;
controller.getMarker=function() {
	return marker;
};

controller.paintGraphPoints=function(travel_mode, sistem_type, lim_inf, lim_sup) { //Mapas para el GPS
	var map, geolocation=graphGeolocation.getGeolocation(), path=[], location, optimized=true, old_lat=geolocation[lim_inf].lat, old_lng=geolocation[lim_inf].lon;
	//Iniciamos el mapa
	map = new GMaps({
		div: '#mimapa',
		lat: geolocation[lim_inf].lat,
		lng: geolocation[lim_inf].lon,
		zoom: 12,
		controltype: 'small',
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	//Funcionalidad de geolocalizacion actual
	map.addControl({
		  position: 'top_right',
		  content: 'Geolocate',
		  style: {
		    margin: '5px',
		    padding: '1px 6px',
		    border: 'solid 1px #717B87',
		    background: '#fff'
		  },
		  events: {
		    click: function(e){
		    	navigator.geolocation.getCurrentPosition(success, fail);
		    	function success(pos) {
		    		map.addMarker({lat: pos.coords.latitude,
						lng: pos.coords.longitude,
						title: 'Location',
						draggable: true,
			            animation: google.maps.Animation.DROP,
						icon: {url:'http://maps.google.com/mapfiles/arrow.png'},
						click: function(e) {
							document.getElementById('id_title_gps').innerHTML=controller.getTraduction('lbl_title_geolocate');
							document.getElementById('id_lat_gps').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000)/10000);
							document.getElementById('id_lng_gps').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000)/10000);
							document.getElementById('id_dis_gps').innerHTML="";
							document.getElementById('id_alt_gps').innerHTML="";
							document.getElementById('id_acc_gps').innerHTML="";
							document.getElementById('id_spe_gps').innerHTML="";
							var date=new Date();
							document.getElementById('id_dat_gps').innerHTML=controller.getTraduction('lbl_date')+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
							$('#overlay').slideDown("slow");
							$('#overlay2').slideUp("slow");
							marker.setAnimation(null);
							e.setAnimation(google.maps.Animation.BOUNCE);
							marker=e;
						}});
		    	}
		    	function fail(error) {
		    		alert(controller.getTraduction('alert_no_gps'));
		    	}
		    }
		  }
		});
	map.setCenter(geolocation[lim_inf].lat, geolocation[lim_inf].lon);
	for(var i=lim_inf; i<=lim_sup; i++) { //Comenzamos a pintar todos los puntos
		location=[geolocation[i].lat, geolocation[i].lon]; //Guardamos para el area
		path.push(location);
		if(travel_mode=="points" || (travel_mode=="route" && sistem_type=="line") || (travel_mode=="area" && sistem_type=="polygon")) { 
			if(i==lim_inf) { //Si es el primer punto de destacamos
				map.addMarker({lat: geolocation[i].lat,
					lng: geolocation[i].lon,
					title: 'Location',
					icon: {url:'http://www.google.com/mapfiles/dd-start.png'},
					click: function(e) { //Evento de click para comprobar los datos del localizador
						document.getElementById('id_title_gps').innerHTML=controller.getTraduction('lbl_title_init');
						document.getElementById('id_lat_gps').innerHTML=controller.getTraduction('lbl_lat')+" "+geolocation[lim_inf].lat;
						document.getElementById('id_lng_gps').innerHTML=controller.getTraduction('lbl_lng')+" "+geolocation[lim_inf].lon;
						document.getElementById('id_alt_gps').innerHTML=controller.getTraduction('lbl_alt')+" "+geolocation[lim_inf].alt+"m";
						document.getElementById('id_acc_gps').innerHTML=controller.getTraduction('lbl_acc')+" "+geolocation[lim_inf].pre+"m";
						document.getElementById('id_spe_gps').innerHTML=controller.getTraduction('lbl_spe')+" "+(Math.round(geolocation[lim_inf].spe*3.6*10)/10)+"km/h";
						if(lim_inf!=lim_sup) document.getElementById('id_dis_gps').innerHTML=controller.getTraduction('lbl_dist')+" 2: "+(Math.round(apiGeolocation.getMetres(geolocation[lim_inf].lat, geolocation[lim_inf].lon, geolocation[lim_inf+1].lat, geolocation[lim_inf+1].lon)*10)/10)+"m";
						document.getElementById('id_dat_gps').innerHTML=controller.getTraduction('lbl_date')+" "+geolocation[lim_inf].date;
						$('#overlay').slideDown("slow");
						$('#overlay2').slideUp("slow");
						marker.setAnimation(null);
						e.setAnimation(google.maps.Animation.BOUNCE);
						marker=e;
					}});
			} else if(i==lim_sup) { //Si es el ultimo punto lo destacamos
				map.addMarker({lat: geolocation[i].lat,
					lng: geolocation[i].lon,
					title: 'Location',
					icon: {url:'http://www.google.com/mapfiles/dd-end.png'},
					click: function(e) {
						document.getElementById('id_title_gps').innerHTML=controller.getTraduction('lbl_title_end');
						document.getElementById('id_lat_gps').innerHTML=controller.getTraduction('lbl_lat')+" "+geolocation[lim_sup].lat;
						document.getElementById('id_lng_gps').innerHTML=controller.getTraduction('lbl_lng')+" "+geolocation[lim_sup].lon;
						document.getElementById('id_alt_gps').innerHTML=controller.getTraduction('lbl_alt')+" "+geolocation[lim_sup].alt+"m";
						document.getElementById('id_acc_gps').innerHTML=controller.getTraduction('lbl_acc')+" "+geolocation[lim_sup].pre+"m";
						document.getElementById('id_spe_gps').innerHTML=controller.getTraduction('lbl_spe')+" "+(Math.round(geolocation[lim_sup].spe*3.6*10)/10)+"km/h";
						document.getElementById('id_dis_gps').innerHTML="";
						document.getElementById('id_dat_gps').innerHTML=controller.getTraduction('lbl_date')+" "+geolocation[lim_sup].date;
						$('#overlay').slideDown("slow");
						$('#overlay2').slideUp("slow");
						marker.setAnimation(null);
						e.setAnimation(google.maps.Animation.BOUNCE);
						marker=e;
					}
				});
			} else { //Todos los demas puntos intermedios
				//FILTRO
				if(sistem_type=="filter1" || sistem_type=="filter2" || sistem_type=="filter3" || travel_mode=="route" || sistem_type=="polygon") {
					if(sistem_type=="filter1") filter=700;
					else if(sistem_type=="filter2") filter=1200;
					else if(sistem_type=="filter3") filter=1800;
					if(apiGeolocation.getMetres(old_lat, old_lng, geolocation[i].lat, geolocation[i].lon)<filter) optimized=false;
					else optimized=true;
					old_lat=geolocation[i].lat;
					old_lng=geolocation[i].lon;
				}
				if(sistem_type=="all") filter=0;
				if(optimized==true) {
					map.addMarker({lat: geolocation[i].lat,
						lng: geolocation[i].lon,
						title: 'Location',
						click: function(e) { //Buscamos los datos del localizador indicado
							var lat=(Math.round(e.getPosition().lat()*10000)/10000), lng=(Math.round(e.getPosition().lng()*10000)/10000);;
							for(var j=(lim_inf+1); j<=(lim_sup-1); j++) {
								if((Math.round(geolocation[j].lat*10000)/10000)==lat && (Math.round(geolocation[j].lon*10000)/10000)==lng) {
									document.getElementById('id_title_gps').innerHTML=controller.getTraduction('lbl_title_point')+" "+(j-lim_inf);
									document.getElementById('id_lat_gps').innerHTML=controller.getTraduction('lbl_lat')+" "+geolocation[j].lat;
									document.getElementById('id_lng_gps').innerHTML=controller.getTraduction('lbl_lng')+" "+geolocation[j].lon;
									document.getElementById('id_alt_gps').innerHTML=controller.getTraduction('lbl_alt')+" "+geolocation[lim_sup].alt+"m";
									document.getElementById('id_acc_gps').innerHTML=controller.getTraduction('lbl_acc')+" "+geolocation[j].pre+"m";
									document.getElementById('id_spe_gps').innerHTML=controller.getTraduction('lbl_spe')+" "+(Math.round(geolocation[j].spe*3.6*10)/10)+"km/h";
									document.getElementById('id_dis_gps').innerHTML=controller.getTraduction('lbl_dist')+" "+(j-lim_inf+1)+": "+(Math.round(apiGeolocation.getMetres(geolocation[j].lat, geolocation[j].lon, geolocation[j+1].lat, geolocation[j+1].lon)*10)/10)+"m";
									document.getElementById('id_dat_gps').innerHTML=controller.getTraduction('lbl_date')+" "+geolocation[j].date;
									$('#overlay').slideDown("slow");
									$('#overlay2').slideUp("slow");
									break;
								}
							}
							marker.setAnimation(null);
							e.setAnimation(google.maps.Animation.BOUNCE);
							marker=e;
						}
					});
				}
			}
		}
	}
	//Modo Ruta
	if(travel_mode=="route") {
		if(sistem_type=="line") { //Modo linea recta con puntos de localizacion
			map.drawPolyline({
				path: path,
				strokeColor: '#131540',
				strokeOpacity: 0.6,
				strokeWeight: 5
			});
		}else { //Modo ruta sin puntos de localizacion
			var sum=Math.floor((lim_sup-lim_inf)/10)+1, lim;
			for(var i=lim_inf; i<lim_sup; i+=sum) {
				lim=i+sum;
				if(lim>lim_sup) lim=lim_sup;
				map.drawRoute({
					origin: [geolocation[i].lat, geolocation[i].lon],
					destination: [geolocation[lim].lat, geolocation[lim].lon],
					travelMode: travel_mode,
					strokeColor: '#131540',
					strokeOpacity: 0.6,
					strokeWeight: 5
				});
			}
		}
	}
	//Modo area
	if(travel_mode=="area") {
		if(sistem_type=="clusters") { //Mostramos un area de las localizaciones sin agrupamiento
			map.addMarker({lat: geolocation[Math.floor((lim_sup-lim_inf)/2)].lat,
				lng: geolocation[Math.floor((lim_sup-lim_inf)/2)].lon,
				title: 'Location',
				draggable: true,
	            animation: google.maps.Animation.DROP,
				icon: {url: '../../presentation/images/icono_clusterBlue.png'},
				click: function(e) { //Datos del area
					document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_most');
					document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+geolocation[Math.floor((lim_sup-lim_inf)/2)].lat;
					document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+geolocation[Math.floor((lim_sup-lim_inf)/2)].lon;
					var media=0, max=-1, dist=0;
					for(var i=lim_inf; i<lim_sup; i++) {
						dist=dist+apiGeolocation.getMetres(geolocation[i].lat, geolocation[i].lon, geolocation[i+1].lat, geolocation[i+1].lon);
						if(max<geolocation[i].spe) max=geolocation[i].spe;
						media=media+geolocation[i].spe;
					}
					media=Math.round((media/(lim_sup-lim_inf))*3.6*10)/10;
					max=Math.round(max*3.6*10)/10;
					dist=Math.round(dist/100)/10;
					document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
					document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
					document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
					document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+(lim_sup-lim_inf);
					$('#overlay2').slideDown("slow");
					$('#overlay').slideUp("slow");
					marker.setAnimation(null);
					e.setAnimation(google.maps.Animation.BOUNCE);
					marker=e;
				}});
		}
		polygon = map.drawPolygon({ //Pintamos el area
			paths: path, 
			strokeColor: '#BBD8E9',
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: '#BBD8E9',
			fillOpacity: 0.6
		});
	}
};

controller.paintGraphClusters=function(sistem_type, lim_inf, lim_sup) { //Agrupamiento de puntos en el mapa
	var map, n=1, clusters=2;
	//Iniciar mapa
	map = new GMaps({
		div: '#mimapa',
		lat: geolocation[lim_inf].lat,
		lng: geolocation[lim_inf].lon,
		zoom: 12,
		controltype: 'small',
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	//Geolocalizacion actual
	map.addControl({
		  position: 'top_right',
		  content: 'Geolocate',
		  style: {
		    margin: '5px',
		    padding: '1px 6px',
		    border: 'solid 1px #717B87',
		    background: '#fff'
		  },
		  events: {
		    click: function(e){
		    	navigator.geolocation.getCurrentPosition(success, fail);
		    	function success(pos) {
		    		map.addMarker({lat: pos.coords.latitude,
						lng: pos.coords.longitude,
						title: 'Location',
						draggable: true,
			            animation: google.maps.Animation.DROP,
						icon: {url:'http://maps.google.com/mapfiles/arrow.png'},
						click: function(e) {
							document.getElementById('id_title_gps').innerHTML=controller.getTraduction('lbl_title_geolocate');
							document.getElementById('id_lat_gps').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000)/10000);
							document.getElementById('id_lng_gps').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000)/10000);
							document.getElementById('id_dis_gps').innerHTML="";
							document.getElementById('id_alt_gps').innerHTML="";
							document.getElementById('id_acc_gps').innerHTML="";
							document.getElementById('id_spe_gps').innerHTML="";
							var date=new Date();
							document.getElementById('id_dat_gps').innerHTML=controller.getTraduction('lbl_date')+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
							$('#overlay').slideDown("slow");
							$('#overlay2').slideUp("slow");
							marker.setAnimation(null);
							e.setAnimation(google.maps.Animation.BOUNCE);
							marker=e;
						}});
		    	}
		    	function fail(error) {
		    		alert(controller.getTraduction('alert_no_gps'));
		    	}
		    }
		  }
		});
	map.setCenter(geolocation[lim_inf].lat, geolocation[lim_inf].lon);
	//Deteccion de grupos para dividirlos
	if((lim_sup-lim_inf)<=300) clusters=2;
	else if((lim_sup-lim_inf)<=700) clusters=3;
	else if((lim_sup-lim_inf)<=1000) clusters=4;
	else clusters=5;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<1; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	var index, arrayIndex=new Array(), matrizClusters=graphGeolocation.getMatrizClusters(), pathClusters=graphGeolocation.getPathClusters();
	arrayIndex.push(-1);
	index=graphGeolocation.getMostFrequent(arrayIndex);
	arrayIndex.push(index);
	map.addMarker({lat: matrizClusters[arrayIndex[1]][0],
		lng: matrizClusters[arrayIndex[1]][1],
		title: 'Location',
		draggable: true,
        animation: google.maps.Animation.DROP,
		icon: {url: '../../presentation/images/icono_clusterBlue.png'},
		click: function(e) { //Datos del grupo o cluster
			document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_most');
			document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000000)/10000000);
			document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000000)/10000000);
			var media=0, max=-1, dist=0;
			for(var i=0; i<(pathClusters[arrayIndex[1]].length-1); i++) {
				dist=dist+apiGeolocation.getMetres(pathClusters[arrayIndex[1]][i][0], pathClusters[arrayIndex[1]][i][1], pathClusters[arrayIndex[1]][i+1][0], pathClusters[arrayIndex[1]][i+1][1]);
				if(max<pathClusters[arrayIndex[1]][i][2]) max=pathClusters[arrayIndex[1]][i][2];
				media=media+pathClusters[arrayIndex[1]][i][2];
			}
			media=Math.round((media/pathClusters[arrayIndex[1]].length)*3.6*10)/10;
			max=Math.round(max*3.6*10)/10;
			dist=Math.round(dist/100)/10;
			document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
			document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
			document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
			document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+pathClusters[arrayIndex[1]].length;
			$('#overlay2').slideDown("slow");
			$('#overlay').slideUp("slow");
			marker.setAnimation(null);
			e.setAnimation(google.maps.Animation.BOUNCE);
			marker=e;
		}});
	polygon = map.drawPolygon({ //Pintamos area del cluster
		paths: pathClusters[arrayIndex[1]], 
		strokeColor: '#BBD8E9',
		strokeOpacity: 1,
		strokeWeight: 3,
		fillColor: '#BBD8E9',
		fillOpacity: 0.6
		});
	if(clusters>=3) { //Si hay mas de 3 grupos divididos o clusters
		index=graphGeolocation.getMostFrequent(arrayIndex);
		arrayIndex.push(index);
		map.addMarker({lat: matrizClusters[arrayIndex[2]][0],
			lng: matrizClusters[arrayIndex[2]][1],
			title: 'Location',
			draggable: true,
            animation: google.maps.Animation.DROP,
			icon: {url: '../../presentation/images/icono_clusterGreen.png'},
			click: function(e) {
				//alert(" FREQUENT POINT\nLatitud: "+e.getPosition().lat()+"\nLongitude: "+(Math.round(e.getPosition().lng()*10000000)/10000000));
				document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_freq');
				document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000000)/10000000);
				document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000000)/10000000);
				var media=0, max=-1, dist=0;
				for(var i=0; i<(pathClusters[arrayIndex[2]].length-1); i++) {
					dist=dist+apiGeolocation.getMetres(pathClusters[arrayIndex[2]][i][0], pathClusters[arrayIndex[2]][i][1], pathClusters[arrayIndex[2]][i+1][0], pathClusters[arrayIndex[2]][i+1][1]);
					if(max<pathClusters[arrayIndex[2]][i][2]) max=pathClusters[arrayIndex[2]][i][2];
					media=media+pathClusters[arrayIndex[2]][i][2];
				}
				media=Math.round((media/pathClusters[arrayIndex[2]].length)*3.6*10)/10;
				max=Math.round(max*3.6*10)/10;
				dist=Math.round(dist/100)/10;
				document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
				document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
				document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
				document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+pathClusters[arrayIndex[2]].length;
				$('#overlay2').slideDown("slow");
				$('#overlay').slideUp("slow");
				marker.setAnimation(null);
				e.setAnimation(google.maps.Animation.BOUNCE);
				marker=e;
			}});
		polygon = map.drawPolygon({
			paths: pathClusters[arrayIndex[2]], 
			strokeColor: '#96FF80',
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: '#96FF80',
			fillOpacity: 0.6
		});
		n=2;
	} 
	if(clusters>=4) {
		index=graphGeolocation.getMostFrequent(arrayIndex);
		arrayIndex.push(index);
		map.addMarker({lat: matrizClusters[arrayIndex[3]][0],
			lng: matrizClusters[arrayIndex[3]][1],
			title: 'Location',
			draggable: true,
            animation: google.maps.Animation.DROP,
			icon: {url: '../../presentation/images/icono_clusterYellow.png'},
			click: function(e) {
				//alert(" FREQUENT POINT\nLatitud: "+e.getPosition().lat()+"\nLongitude: "+(Math.round(e.getPosition().lng()*10000000)/10000000));
				document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_freq');
				document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000000)/10000000);
				document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000000)/10000000);
				var media=0, max=-1, dist=0;
				for(var i=0; i<(pathClusters[arrayIndex[3]].length-1); i++) {
					dist=dist+apiGeolocation.getMetres(pathClusters[arrayIndex[3]][i][0], pathClusters[arrayIndex[3]][i][1], pathClusters[arrayIndex[3]][i+1][0], pathClusters[arrayIndex[3]][i+1][1]);
					if(max<pathClusters[arrayIndex[3]][i][2]) max=pathClusters[arrayIndex[3]][i][2];
					media=media+pathClusters[arrayIndex[3]][i][2];
				}
				media=Math.round((media/pathClusters[arrayIndex[3]].length)*3.6*10)/10;
				max=Math.round(max*3.6*10)/10;
				dist=Math.round(dist/100)/10;
				document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
				document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
				document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
				document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+pathClusters[arrayIndex[3]].length;
				$('#overlay2').slideDown("slow");
				$('#overlay').slideUp("slow");
				marker.setAnimation(null);
				e.setAnimation(google.maps.Animation.BOUNCE);
				marker=e;
			}});
		polygon = map.drawPolygon({
			paths: pathClusters[arrayIndex[3]], 
			strokeColor: '#FFFF95',
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: '#FFFF95',
			fillOpacity: 0.6
		});
		n=3;
	} 
	if(clusters==5) {
		index=graphGeolocation.getMostFrequent(arrayIndex);
		arrayIndex.push(index);
		map.addMarker({lat: matrizClusters[arrayIndex[4]][0],
			lng: matrizClusters[arrayIndex[4]][1],
			title: 'Location',
			draggable: true,
            animation: google.maps.Animation.DROP,
			icon: {url: '../../presentation/images/icono_clusterPurple.png'},
			click: function(e) {
				//alert(" FREQUENT POINT\nLatitud: "+e.getPosition().lat()+"\nLongitude: "+(Math.round(e.getPosition().lng()*10000000)/10000000));
				document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_freq');
				document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000000)/10000000);
				document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000000)/10000000);
				var media=0, max=-1, dist=0;
				for(var i=0; i<(pathClusters[arrayIndex[4]].length-1); i++) {
					dist=dist+apiGeolocation.getMetres(pathClusters[arrayIndex[4]][i][0], pathClusters[arrayIndex[4]][i][1], pathClusters[arrayIndex[4]][i+1][0], pathClusters[arrayIndex[4]][i+1][1]);
					if(max<pathClusters[arrayIndex[4]][i][2]) max=pathClusters[arrayIndex[4]][i][2];
					media=media+pathClusters[arrayIndex[4]][i][2];
				}
				media=Math.round((media/pathClusters[arrayIndex[4]].length)*3.6*10)/10;
				max=Math.round(max*3.6*10)/10;
				dist=Math.round(dist/100)/10;
				document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
				document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
				document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
				document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+pathClusters[arrayIndex[4]].length;
				$('#overlay2').slideDown("slow");
				$('#overlay').slideUp("slow");
				marker.setAnimation(null);
				e.setAnimation(google.maps.Animation.BOUNCE);
				marker=e;
			}});
		polygon = map.drawPolygon({
			paths: pathClusters[arrayIndex[4]], 
			strokeColor: '#EB55FF',
			strokeOpacity: 1,
			strokeWeight: 3,
			fillColor: '#EB55FF',
			fillOpacity: 0.6
		});
		n=4;
	} 
	index=graphGeolocation.getMostFrequent(arrayIndex);
	arrayIndex.push(index);
	map.addMarker({lat: matrizClusters[arrayIndex[n+1]][0],
		lng: matrizClusters[arrayIndex[n+1]][1],
		title: 'Location',
		draggable: true,
        animation: google.maps.Animation.DROP,
		icon: {url: '../../presentation/images/icono_clusterRed.png'},
		click: function(e) {
			//alert(" LESS FREQUENT POINT\nLatitud: "+e.getPosition().lat()+"\nLongitude: "+(Math.round(e.getPosition().lng()*10000000)/10000000));
			document.getElementById('id_title_gps2').innerHTML=controller.getTraduction('lbl_title_less');
			document.getElementById('id_lat_gps2').innerHTML=controller.getTraduction('lbl_lat')+" "+(Math.round(e.getPosition().lat()*10000000)/10000000);
			document.getElementById('id_lng_gps2').innerHTML=controller.getTraduction('lbl_lng')+" "+(Math.round(e.getPosition().lng()*10000000)/10000000);
			var media=0, max=-1, dist=0;
			for(var i=0; i<(pathClusters[arrayIndex[n+1]].length-1); i++) {
				dist=dist+apiGeolocation.getMetres(pathClusters[arrayIndex[n+1]][i][0], pathClusters[arrayIndex[n+1]][i][1], pathClusters[arrayIndex[n+1]][i+1][0], pathClusters[arrayIndex[n+1]][i+1][1]);
				if(max<pathClusters[arrayIndex[n+1]][i][2]) max=pathClusters[arrayIndex[n+1]][i][2];
				media=media+pathClusters[arrayIndex[n+1]][i][2];
			}
			media=Math.round((media/pathClusters[arrayIndex[n+1]].length)*3.6*10)/10;
			max=Math.round(max*3.6*10)/10;
			dist=Math.round(dist/100)/10;
			document.getElementById('id_speMax_gps2').innerHTML=controller.getTraduction('lbl_max_spe')+" "+max+"km/h"; 
			document.getElementById('id_speMed_gps2').innerHTML=controller.getTraduction('lbl_mean_spe')+" "+media+"km/h";
			document.getElementById('id_dis_gps2').innerHTML=controller.getTraduction('lbl_max_dist')+" "+dist+"km";
			document.getElementById('id_mar_gps2').innerHTML=controller.getTraduction('lbl_max_point')+" "+pathClusters[arrayIndex[n+1]].length;
			$('#overlay2').slideDown("slow");
			$('#overlay').slideUp("slow");
			marker.setAnimation(null);
			e.setAnimation(google.maps.Animation.BOUNCE);
			marker=e;
		}});
	polygon = map.drawPolygon({
		paths: pathClusters[arrayIndex[n+1]], 
		strokeColor: '#F50000',
		strokeOpacity: 1,
		strokeWeight: 3,
		fillColor: '#F50000',
		fillOpacity: 0.5
	});
};

controller.paintGraphP=function(lim_inf, lim_sup) { //Graficas de actividad para la aplicaciones ejecutadas
	var appsMobile=graphAppMobile.getApps();
	if(document.getElementById('listModeAppTrac').selectedIndex==0 || document.getElementById('listModeAppTrac').selectedIndex==2) { //Tabla de apps
		var table = controller.getDocumentId('table_summaryApp');
		var rowCount = table.rows.length;
		for(var j=0; j<rowCount; j++) { 
			table.deleteRow(j);
			rowCount--;
			j--;
		}
		if(lim_sup!=-1) controller.setDocumentIdCreateRowTableTitle(table.insertRow(0), "App", controller.getTraduction('lbl_table_state'), controller.getTraduction('lbl_table_date'));
		rowCount = table.rows.length;
		for(var i=lim_inf; i<=lim_sup; i++) {
			if(document.getElementById('listModeAppTrac').selectedIndex==2 || graphAppMobile.isProcessUser(appsMobile, i, lim_inf, lim_sup)==true) {
				row = table.insertRow(rowCount);
				rowCount++;
				controller.setDocumentIdCreateRowTableNormal(row, appsMobile[i]);
			}
		}
	} else { //Grafica de apps ejecutadas
		var dataApp=new Array(), time=0, conection="None";
		for(var i=lim_inf; i<=lim_sup; i++) {
			if(appsMobile[i].name=="WiFi connection")
				conection="Wifi";
			else if(appsMobile[i].name=="Ethernet connection" || appsMobile[i].name=="Cell 2G connection" || appsMobile[i].name=="Cell 3G connection" || appsMobile[i].name=="Cell 4G connection")
				conection="Mobile";
			else if(appsMobile[i].name=="No network connection" || appsMobile[i].name=="Unknown connection")
				conection="None";
			if(appsMobile[i].state=="Opened" && appsMobile[i].name!="Vodafone" && appsMobile[i].name!="Monitoring Activities" && appsMobile[i].name!="Unknown connection" && appsMobile[i].name!="Ethernet connection" && appsMobile[i].name!="WiFi connection" && appsMobile[i].name!="Cell 2G connection" && appsMobile[i].name!="Cell 3G connection" && appsMobile[i].name!="Cell 4G connection" && appsMobile[i].name!="No network connection") {
				for(j=i+1; j<=lim_sup; j++) {
					if(appsMobile[i].name==appsMobile[j].name && appsMobile[j].state!="Opened") {
						time=graphAppMobile.getTimeOpenApp(appsMobile[i].date, appsMobile[j].date);
						if(conection=="None")
							dataApp.push({label: appsMobile[i].name, y: time, markerType: "cross", markerColor: "red" , markerSize: 10});
						else if(conection=="Mobile")
							dataApp.push({label: appsMobile[i].name, y: time, markerType: "triangle", markerColor: "green", markerSize: 10});
						else dataApp.push({label: appsMobile[i].name, y: time, markerSize: 10});
						break;
					}
				}
			}
		}
		var chart = new CanvasJS.Chart("graphApp",{
			title:{text: controller.getTraduction('lbl_title_track'), fontFamily: "Arial", fontColor: "white", fontSize: 16},
			theme: "theme2",
			axisX: {labelAngle: 90, interval: 1, labelFontSize: 9, labelFontColor: "white"},
			axisY:{valueFormatString: "#seg", labelFontSize: 10, labelFontColor: "white"},
			data: [{type: "spline",
				showInLegend: true,
			    color: "blue",
			    legendText: "WIFI",
			    dataPoints: dataApp }, 
			    {type: "spline", showInLegend: true, markerType: "cross", legendText: controller.getTraduction('lbl_nored'), dataPoints: []},
			    {type: "spline", showInLegend: true, markerType: "triangle", legendText: controller.getTraduction('lbl_sired'), dataPoints: []}]});
			chart.render();
	}
};

controller.paintGraphSummaryP=function(summaryApps) { //Grafica de resumen de aplicaciones ejecutadas
	var mode=document.getElementById('listModeAppSum').selectedIndex, chart1, chart2, dataAppFreq=new Array(), dataAppTime=new Array(), totalFreq=0, totalTime=0;
	var table = controller.getDocumentId('table_summaryApp');
	var rowCount = table.rows.length;
	for(var j=0; j<rowCount; j++) { 
		table.deleteRow(j);
		rowCount--;
		j--;
	}
	if(mode==1) { //Modo barras
		for(var i=0; i<summaryApps.length; i++) {
			dataAppFreq[i]={x: i, y: summaryApps[i].freq, label: summaryApps[i].name};
			dataAppTime[i]={x: i, y: summaryApps[i].time, label: summaryApps[i].name};
		}
		chart1 = new CanvasJS.Chart("graphApp",
			    	    {title:{text: controller.getTraduction('lbl_title_bar')},
						 axisX :{labelFontColor: "white",labelFontSize: 10},
			    	     legend: {verticalAlign: "bottom"},
			    	     data: [
			    	          {type: "bar", showInLegend: true, legendText: controller.getTraduction('lbl_time'), dataPoints: dataAppTime},
			    	          {type: "bar", axisYType: "secondary", showInLegend: true, legendText: controller.getTraduction('lbl_use'), dataPoints: dataAppFreq}
			    	      ]});
		chart1.render();
	} else if(mode==2) { //Modo pastel
		for(var i=0; i<summaryApps.length; i++) {
			totalFreq+=summaryApps[i].freq;
			totalTime+=summaryApps[i].time;
		}
		for(var i=0; i<summaryApps.length; i++) {
			dataAppFreq[i]={y: Math.round(summaryApps[i].freq*100/totalFreq)+1, indexLabel: Math.round(summaryApps[i].freq*100/totalFreq)+"%", name: summaryApps[i].name};
			dataAppTime[i]={y: Math.round(summaryApps[i].time*100/totalTime)+1, indexLabel: Math.round(summaryApps[i].time*100/totalTime)+"%", name: summaryApps[i].name};
		}
		chart1 = new CanvasJS.Chart("graphApp",
			{title:{text: controller.getTraduction('lbl_title_use')},
				legend: {verticalAlign: "bottom",horizontalAlign: "center"},
				toolTip:{enabled: false},
				theme: "theme1",
				animationEnabled:false,
				data: [{type: "pie",
						indexLabelFontFamily: "Arial",       
						indexLabelFontSize: 16,
						indexLabelFontWeight: "bold",
						startAngle:0,
						indexLabelFontColor: "white",       
						indexLabelLineColor: "darkgrey", 
						indexLabelPlacement: "inside", 
						showInLegend: false,
						dataPoints: dataAppFreq}]});
		chart1.render();
		chart2 = new CanvasJS.Chart("graphAppAux",
			{title:{text: controller.getTraduction('lbl_title_time')},
				legend: {verticalAlign: "bottom",horizontalAlign: "center"},
				toolTip:{enabled: true},
				theme: "theme1",
				animationEnabled:false,
				data: [{type: "pie",
					indexLabelFontFamily: "Arial",       
					indexLabelFontSize: 16,
					indexLabelFontWeight: "bold",
					startAngle:0,
					indexLabelFontColor: "white",       
					indexLabelLineColor: "darkgrey", 
					indexLabelPlacement: "inside", 
					showInLegend: true,
					dataPoints: dataAppTime}]});
		chart2.render();
	} else if(mode==3) { //Modo grafica-barras
		for(var i=0; i<summaryApps.length; i++) {
			totalFreq+=summaryApps[i].freq;
			totalTime+=summaryApps[i].time;
		}
		for(var i=0; i<summaryApps.length; i++) {
			dataAppFreq[i]={y: Math.round(summaryApps[i].freq*100/totalFreq)+3, label: Math.round(summaryApps[i].freq*100/totalFreq)+"%", indexLabel: summaryApps[i].name};
			dataAppTime[i]={y: Math.round(summaryApps[i].time*100/totalTime)+3, label: Math.round(summaryApps[i].time*100/totalTime)+"%", indexLabel: summaryApps[i].name};
		}
		chart1 = new CanvasJS.Chart("graphApp", {
            title: {text: controller.getTraduction('lbl_title_use'), fontFamily: "Arial", fontColor: "white", fontSize: 16},
            axisY: {tickThickness: 2, lineThickness: 0, labelFontSize: 12, labelFontColor: "white", valueFormatString: "#'%'", gridThickness: 1},
            axisX: {tickThickness: 0, lineThickness: 0, labelFontSize: 12, labelFontColor: "white"},
            data: [{indexLabelFontSize: 26,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}</strong></span><span style='\"'font-size: 20px; color:peru '\"'><strong>{y}</strong></span>",
                indexLabelPlacement: "outside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 90,
                indexLabelFontFamily: "Arial",
                color: "#4078FF",
                type: "bar",
                dataPoints: dataAppFreq }]});
        chart1.render();
        chart2 = new CanvasJS.Chart("graphAppAux", {
            title: {text: controller.getTraduction('lbl_title_time'), fontFamily: "Arial", fontColor: "white", fontSize: 16},
            axisY: {tickThickness: 2, lineThickness: 0, labelFontSize: 12, labelFontColor: "white", valueFormatString: "#'%'", gridThickness: 1},
            axisX: {tickThickness: 0, lineThickness: 0, labelFontSize: 12, labelFontColor: "white"},
            data: [{indexLabelFontSize: 14,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}</strong></span><span style='\"'font-size: 20px; color:peru '\"'><strong>{y}</strong></span>",
                indexLabelPlacement: "outside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 90,
                indexLabelFontFamily: "Arial",
                color: "#62C9C3",
                type: "bar",
                dataPoints: dataAppTime }]});
        chart2.render();
	} else { //Modo tabla
		controller.setDocumentIdCreateRowTableTitle(table.insertRow(0), "App", controller.getTraduction('lbl_table_use'), controller.getTraduction('lbl_table_time'));
		rowCount = table.rows.length;
		var time=0, seg, min, hour, timeTotal=0, freqTotal=0;
		for(var i=0; i<summaryApps.length; i++) {
			row = table.insertRow(rowCount);
			rowCount++;
			time=summaryApps[i].time;
			timeTotal+=time;
			freqTotal+=summaryApps[i].freq;
			if(time<60) {seg=time; min=0; hour=0;}
			else if(time<3600) {hour=0; min=Math.floor(time/60); seg=time-(Math.floor(time/60)*60);}
			else {hour=Math.floor(time/3600); min=Math.floor((time-(Math.floor(time/3600)*3600))/60); seg=(time-(Math.floor(time/3600)*3600))-(Math.floor((time-(Math.floor(time/3600)*3600))/60)*60);}
			controller.setDocumentIdCreateRowTableSummary(row, {name:summaryApps[i].name, freq:summaryApps[i].freq, time: hour+"h"+min+"m"+seg+"s"});
		}
		row = table.insertRow(rowCount++);
		if(timeTotal<60) {seg=timeTotal; min=0; hour=0;}
		else if(timeTotal<3600) {hour=0; min=Math.floor(timeTotal/60); seg=timeTotal-(Math.floor(timeTotal/60)*60);}
		else {hour=Math.floor(timeTotal/3600); min=Math.floor((timeTotal-(Math.floor(timeTotal/3600)*3600))/60); seg=(timeTotal-(Math.floor(timeTotal/3600)*3600))-(Math.floor((timeTotal-(Math.floor(timeTotal/3600)*3600))/60)*60);}
		var cell1 = row.insertCell(0);
	    var element1 = document.createElement("h5");
	    element1.innerHTML = "TOTAL";
	    element1.className='table_form_app';
	    element1.style.color='#00C20B';
	    cell1.appendChild(element1);
	    var cell2 = row.insertCell(1);
	    var element2 = document.createElement("h5");
	    element2.innerHTML = freqTotal;
	    element2.className='table_form_app';
	    element2.style.color='#00C20B';
	    cell2.appendChild(element2);
	    var cell3 = row.insertCell(2);
	    var element3 = document.createElement("h5");
	    element3.innerHTML = hour+"h"+min+"m"+seg+"s";
	    element3.className='table_form_app';
	    element3.style.color="#00C20B";
	    cell3.appendChild(element3);
	}
};
