//GEOLOCALIZACION
var watchID = null, geolocationError=false, newDataGeolocation=false, old_geo_lat=0, old_geo_lng=0, dif, suma=0, apiGeolocation=new Object();

//Get sensor GPS
apiGeolocation.getGeolocationWatch=function() {
	return watchID;
};

//Get nuevos datos en el GPS
apiGeolocation.getNewDataGeolocation=function() {
	return newDataGeolocation;
};

//Set nuevos datos en el GPS
apiGeolocation.setNewDataGeolocation=function(value) {
	newDataGeolocation=value;
};

//Get error en el GPS
apiGeolocation.getGeolocationError=function() {
	return geolocationError;
};

//Set error en el GPS
apiGeolocation.setGeolocationError=function(error) {
	geolocationError=error;
};

//Funcion para detectar los metros entre dos coordenadas de latitud longitud
apiGeolocation.getMetres=function(lat1, lon1, lat2, lon2){ 
    var R = 6378.137; 
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000;
};

//Guardar datos GPS
var wsuccess = function(geo) {
	if(apiGeolocation.getMetres(old_geo_lat, old_geo_lng, geo.coords.latitude, geo.coords.longitude)>dif) {
		geolocationDB.insertarGeolocationDB(geo);
		old_geo_lat=geo.coords.latitude;
		old_geo_lng=geo.coords.longitude;
	} 
};

//Error GPS
var wfail = function(error) {
    geolocationError=true;
    //alert("Geolocation ERROR, restart app");
};

//Detectar GPS
function clearWatch() {
    if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
}

//Parar GPS
apiGeolocation.stopGeo=function() {
	if (watchID !== null) {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
        newDataGeolocation=true;
    }
};

//Activar GPS
apiGeolocation.takeGeo = function() {
    if(controller.getDocumentIdChecked('checkbox-gps')) { //Si el usuario ha activado el GPS
    	if (watchID == null) {
            var options;
            newDataGeolocation=true;
            geolocationError=false;
            if(controller.getDocumentIdChecked('perf-low')==true) {options = {maximumAge: 5000, enableHighAccuracy: true }; dif=450;}
            else if(controller.getDocumentIdChecked('perf-medium')==true) { options = {maximumAge: 6000, enableHighAccuracy: true }; dif=300;}
            else if(controller.getDocumentIdChecked('perf-high')==true) { options = {maximumAge: 8000, enableHighAccuracy: true }; dif=100;}
            else if(controller.getDocumentIdChecked('perf-manual')==true) {
            	var option=controller.getDocumentIdSelectedValue('perf-manual-gps');
            	if(option=="walking") { options = {maximumAge: 5500, enableHighAccuracy: true }; dif=200;} 
            	else if(option=="bicycling") { options = {maximumAge: 6500, enableHighAccuracy: true }; dif=500; }
            	else if(option=="driving") { options = {maximumAge: 10000, enableHighAccuracy: true }; dif=1000; }
            	else if(option=="advanced") {
            		var optionTim=controller.getDocumentIdSelectedValue('perf-manual-geoTim');
                	dif=controller.getDocumentIdSelectedValue('perf-manual-geoDis');
                	if(optionTim==0) options = {maximumAge: (Number(controller.getDocumentIdSelectedValue('perf-manual-geoMax'))*1000), enableHighAccuracy: controller.getDocumentIdChecked('checkbox-gpsPerfAcc') };
                	else options = {maximumAge: (Number(controller.getDocumentIdSelectedValue('perf-manual-geoMax'))*1000), timeout: (Number(optionTim)*1000), enableHighAccuracy: controller.getDocumentIdChecked('checkbox-gpsPerfAcc') };
            	}
            	else options = { maximumAge: 4000, enableHighAccuracy: true };
            }
            else options = { maximumAge: 4000, timeout: 4000, enableHighAccuracy: true };
            watchID = navigator.geolocation.watchPosition(wsuccess, wfail, options);
        }
    }
};