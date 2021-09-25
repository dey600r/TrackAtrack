//BRUJULA
var compassWatch = null, newDataCompass=false, compassError=false, apiCompass=new Object();

//Get sensor brujula
apiCompass.getCompassWatch=function() {
	return compassWatch;
};

//Get nuevos datos de la brujula
apiCompass.getNewDataCompass=function() {
	return newDataCompass;
};

//Set nuevos datos de la brujula
apiCompass.setNewDataCompass=function(value) {
	newDataCompass=value;
};

//Get error brujula
apiCompass.getCompassError=function() {
	return compassError;
};

//Set error brujula
apiCompass.setCompassError=function(error) {
	compassError=error;
};

//Guardar datos de la brujula
function updateHeading(h) { 
    compassDB.insertarCompassDB(h);
}

//Error en la brujula
function compassError(error) { 
    //alert('Compass ERROR, restart app');
    compassError=true;
}

//Parar brujula
apiCompass.stopComp=function() {
	if (compassWatch !== null) {
        navigator.compass.clearWatch(compassWatch);
        compassWatch = null;
        newDataCompass=true;
    }
};

//Activar brujula
apiCompass.takeCompass=function() {
    if(controller.getDocumentIdChecked('checkbox-compass')) { //Si el usuario lo tiene activado
        if (compassWatch == null) { 
        	newDataCompass=true;
            compassError=false;
            var options; //Detectamos configuracion de la brujula
            if(controller.getDocumentIdChecked('perf-low')) options = { frequency: 2000 };
            else if(controller.getDocumentIdChecked('perf-medium')) options = { frequency: 1500 };
            else if(controller.getDocumentIdChecked('perf-high')) options = { frequency: 1000 };
            else if(controller.getDocumentIdChecked('perf-manual')) 
            	options = { frequency: (Number(controller.getDocumentIdSelectedValue('perf-manual-comp'))*1000) };
            else options = { frequency: 2000 };
              compassWatch = navigator.compass.watchHeading(updateHeading, 
            		  function(error) {
            	  			//alert('Compass ERROR, restart app');
            	  			compassError=true;
              			}, options);
        }
    }
};