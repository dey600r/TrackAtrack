var apiUser=new Object();

//Guardar usuario en BD
apiUser.saveData=function() {
	var name=controller.getDocumentIdValue('username');
    var age=controller.getDocumentIdValue('userage');
    var profession=controller.getDocumentIdValue('userprofession');
    var server=controller.getDocumentIdValue('userserver'), aux;
    aux=server; //Controlar el dominio del servidor sin "http://"
    if(aux.charAt(0)=='h' && aux.charAt(1)=='t' && aux.charAt(2)=='t' && aux.charAt(3)=='p' && aux.charAt(4)==':' && aux.charAt(5)=='/' && aux.charAt(6)=='/') {
    	server="";
    	for (var i=7;i<aux.length;i++) { 
    		server+=aux.charAt(i);
    	}
    } 
    var networkState = navigator.connection.type; //Detectar conexiones a internet
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    if(name!=='' && age!=='' && profession!=='' && server!='') { //Insertamos en la base de datos si todo es correcto
    	controller.setDocumentIdColor('lbl_name', "#00C20B");
		controller.setDocumentIdColor('lbl_age', "#00C20B");
		controller.setDocumentIdColor('lbl_profession', "#00C20B");
		controller.setDocumentIdColor('lbl_server', "#00C20B");
    	if(states[networkState]=='Unknown connection' || states[networkState]=='No network connection') {
    		controller.setDocumentIdClass('lbl_user_error', '');
        	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getTraduction('lbl_user_error_connect'));
    	} else { 
    		userDB.insertarUserDB(name, age, profession, server);
   			controller.setDocumentIdInnerHTML('lbl_init', controller.getTraduction('lbl_init')+" "+name);
   			controller.setDocumentIdValue('username', ''); //Interfaz todo correcto
    		controller.setDocumentIdValue('userage', '');
    		controller.setDocumentIdValue('userprofession', '');
    		controller.setDocumentIdValue('userserver', '');
    	}
    }
    else { //Errores de control de introducción de datos
    	controller.setDocumentIdInnerHTML('lbl_user_success', controller.getTraduction('lbl_user_success_init'));
    	controller.setDocumentIdClass('lbl_user_error', '');
    	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getTraduction('lbl_user_error_init'));
        if(name=='') {
        	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getDocumentIdInnerHTML('lbl_user_error')+" "+controller.getTraduction('lbl_user_error_name'));
        	controller.setDocumentIdColor('lbl_name', "#f62c0b");
        }
        else controller.setDocumentIdColor('lbl_name', "#00C20B");
        if(age=='') {
        	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getDocumentIdInnerHTML('lbl_user_error')+" "+controller.getTraduction('lbl_user_error_age'));
        	controller.setDocumentIdColor('lbl_age', "#f62c0b");
        }
        else controller.setDocumentIdColor('lbl_age', "#00C20B");
        if(profession=='') {
        	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getDocumentIdInnerHTML('lbl_user_error')+" "+controller.getTraduction('lbl_user_error_profession'));
        	controller.setDocumentIdColor('lbl_profession', "#f62c0b");
        }
        else controller.setDocumentIdColor('lbl_profession', "#00C20B");
        if(server=='') {
        	controller.setDocumentIdInnerHTML('lbl_user_error', controller.getDocumentIdInnerHTML('lbl_user_error')+" "+controller.getTraduction('lbl_user_error_server'));
        	controller.setDocumentIdColor('lbl_server', "#f62c0b");
        }
        else controller.setDocumentIdColor('lbl_server', "#00C20B");
    }
};