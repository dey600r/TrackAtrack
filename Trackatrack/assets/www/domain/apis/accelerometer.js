//ACELEROMETRO
var accelerationWatch = null, newDataAccelerometer=false, accelerationError=false, apiAccelerometer=new Object();

//Get sensor acelerometro 
apiAccelerometer.getAccelerationWatch=function() {
	return accelerationWatch;
};

//Get nuevos datos en el acelerometro
apiAccelerometer.getNewDataAccelerometer=function() {
	return newDataAccelerometer;
};

//Set nuevos datos en el acelerometro
apiAccelerometer.setNewDataAccelerometer=function(value) {
	newDataAccelerometer=value;
};

//Get error acelerometro
apiAccelerometer.getAccelerationError=function() {
	return accelerationError;
};

//Set error acelerometro
apiAccelerometer.setAccelerationError=function(error) {
	accelerationError=error;
};

//Funcion para redondear los datos
function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

//Guardar coordenadas
function updateAcceleration(acceleration) {
	accelerometerDB.insertarAccelerometerDB(acceleration);
}

//Error en el acelerometro
function accelerationError(error) {
	//alert("Accelerometer ERROR, restart app"); 
	accelerationError=true;
}

//Parar acelerometro
apiAccelerometer.stopAccel=function() {
	if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        accelerationWatch = null;
        newDataAccelerometer=true;
    }
};

//Activar acelerometro
apiAccelerometer.takeAccel=function() {
    if(controller.getDocumentIdChecked('checkbox-accelerometer')) { //Si el usuario lo ha activado
        if (accelerationWatch == null) {
        	newDataAccelerometer=true;
            accelerationError=false;
            var options = {}; //Detectamos la configuracion del usuario
            if(controller.getDocumentIdChecked('perf-low')) options.frequency= 1200;
            else if(controller.getDocumentIdChecked('perf-medium')) options.frequency= 900;
            else if(controller.getDocumentIdChecked('perf-high')) options.frequency= 600;
            else if(controller.getDocumentIdChecked('perf-manual')) 
            	options.frequency= (Number(controller.getDocumentIdSelectedValue('perf-manual-accel'))*1000);
            else options.frequency= 2000;
            accelerationWatch = navigator.accelerometer.watchAcceleration(updateAcceleration, 
            		function(error) { 
            			accelerationError=true;}
            	, options);
        }
    }
};
