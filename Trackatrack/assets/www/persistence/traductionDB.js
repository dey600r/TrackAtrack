var traductionDB=new Object();

//CREATE TABLE

//Crear tabla de traduccion de la interfaz de forma dinamica
function populateTraductionDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS TRADDB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS TRADDB (id unique, idHtml, es, en)');
    tx.executeSql('SELECT * FROM TRADDB', [], queryTraductionSuccess, errorTraductionCB);
}

//Introducir la traducion en la BD
function queryTraductionSuccess(tx, results) {
    if(results.rows.length==0) {
    	var i=-1;
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_init','Hola','Hello')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_info','Esta app recogera datos personales en su tel&eacutefono','This app will collect personal data on your phone')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_info_error','ERROR en la base de datos, debes reiniciar la app','ERROR in database, you should restart app')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_data_init','Deber&iacuteas introducir tus datos personales','You should add your personal details')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_data','La app esta preparada','The app is ready')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error','ERROR en la base de datos, intentelo otra vez','ERROR in database, you should try it again')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_success','Los datos han sido introducidos','your data has been introduced')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_success_init','Introduzca sus datos personales','Enter your personal details')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_success_init1','Todos los campos son obligatorios','All fields are obligatory')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_connect','ERROR: Tiene que conectarse a internet','Error: You must be connected to the Internet')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_init','ERROR: No ha introducido','Error: You have not introduced')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_name','el nombre','your username')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_age','la edad','your age')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_profession','la ocupaci&oacuten','your occupation')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_user_error_server','el servidor','the server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_no_data','Primero tienes que seleccionar algunos datos','You have to select some data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_no_gps','ERROR: Por favor conecte el GPS o Internet','ERROR: Please connect your GPS or connect to the Internet')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_less_data','Debes seleccionar menos datos para esta funcionalidad','You should select less data for this operation')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_no_dev','Debes seleccionar al menos un sensor para recoger datos','You should select some device to collect data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_no_det','Tienes que introducir los datos personales antes','You have to introduce some personal details before')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_loading_map','Cargando mapa...','Loading map...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_loading_graph','Dibujando...','Drawing...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_geolocate','EST&AacuteS AQU&Iacute','YOU ARE HERE')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_lat','Latitud:','Latitude:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_lng','Longitud:','Loingitude:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_alt','Altitud:','Altitude:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_acc','Precisi&oacuten:','Accuracy:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_spe','Velocidad:','Speed:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_date','Fecha:','Date:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_dist','Distancia al punto','Distance to point')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_max_spe','Velocidad max:','Max speed:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_mean_spe','Velocidad media:','Average speed:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_max_dist','Distancia:','Distance:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_max_point','Num. puntos:','N. of points:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_init','INICIO','START POINT')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_end','FIN','END POINT')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_point','PUNTO','POINT')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_most','M&AacuteS FRECUENTE','THE MOST FREQUENT')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_less','MENOS FRECUENTE','THE LEAST FREQUENT')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_freq','PUNTOS FRECUENTES','FREQUENT POINTS')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_track','Actividad de apps abiertas','Activity of apps opened')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_bar','Tiempo y uso de apps abiertas','Time and use of the apps opened')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_use','Uso de apps abiertas','Use of the apps opened')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_title_time','Tiempo de uso de apps abiertas','Time spent with apps open')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_nored','Sin red','Without NET')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sired','Datos','Mobile data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_time','Tiempo en uso','Usage')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_use','Frecuencia','Frequency')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_table_use','Uso','Use')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_table_time','Tiempo','Time')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_table_state','Estado','State')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_table_date','Fecha','Date')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_exit','Esta seguro de que desea salir?','Are you sure you want to leave?')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_exit_btn','No,Si','No,Yes')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_battery','Nivel de carga muy bajo: ','Battery level critical: ')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_battery_stop','La app se ha parado ','This app has stopped ')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_stop','La app est&aacute parada','App is stopped')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_start','La app est&aacute recogiendo datos','App is collecting data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'btn_start','Empezar','Start')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'btn_stop','Parar','Stop')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_perf_low','La app recoger&aacute datos con menos frecuencia','The app will collect data less frequently')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_perf_medium','La app recoger&aacute datos con una frecuencia media','The app will collect data with an average frequency')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_perf_high','La app recoger&aacute datos con m&aacutes frecuencia','The app will collect data with more frequently')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_perf','Puedes configurar la frecuencia con que se recogen los datos','You can configure the frequency of data collection')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_viewUser','No hay usuario','There is no user')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_viewData','No hay datos','There is no data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_viewUser_data','Tabla resumen de detalles de usuario','Table summary of user details')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_viewData_data','Tabla resumen de todos los datos recogidos','Table summary of all data collected')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_no_accel','No hay datos del aceler&oacutemetro','There is no data of accelerometer')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_no_comp','No hay datos de la br&uacutejula','There is no data of compass')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_no_gps','No hay datos del GPS','There is no data of GPS')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_no_app','No hay datos de las apps ejecutadas','There is no data of executed apps')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_viewServer','Tabla resumen de los &uacuteltimos datos en el servidor','Table summary of the latest data on the server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_si_accel','Actividad f&iacutesica usando datos del aceler&oacutemetro','Phisical activity using data of accelerometer')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_si_comp','Movilidad usando datos de la br&uacutejula','Mobility using data of the compass')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_si_gps','Desplazamientos usando datos del GPS','Movements using data of GPS')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'info_si_app','Informaci&aacuten sobre las apps ejecutadas','Information about executed apps')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_loading','Cargando...','Loading...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_loading_data','Accediendo a los datos','Accesing to data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_sending_data','Enviando datos','Sending data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_help_dist','Distancia entre puntos','Distance between points')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_help_max','Tiempo del dato almacenado en cache','Time data has been stored in cache')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_help_time','Tiempo de error si no responde el GPS','Time error if there is no response of GPS')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_help_acc','Descartar localizaciones imprecisas','Discard inaccurate localisation')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_help_server','Este campo es indicado por el investigador. (http://dominio_servidor)','This field should be indicated by thesresearcher (http://server_domain)')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_address','No se puede determinar la direccion de este punto','Cannot determine address at this location')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listHour_min','Minutos','Minutes')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listHour_hour','horas','hours')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listDate_today','Hoy','Today')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listDate_day','dias','days')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listDate_days','dias','days ago')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'listDate_sinceday','Hace',' ')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'infoDate_all','Todos los datos','All data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_connect_error','No se ha conectado con el servidor. Puede haber introducido mal el servidor','No connection with server. Maybe You have introduced a wrong server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'error_connect','No se ha conectado con el servidor','No connection with server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'error_serverUser','El usuario no esta en el servidor','The user is not in the server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'error_sendData','ERROR: Algunos datos no se han enviado','ERROR: some data not sent')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'error_getData','ERROR: No se ha accedido a los datos en el servidor','ERROR: Data has not been found in the server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'alert_dataAmount','Si elige demasiados datos se enviaran lentamente','If you choice too much data the synchronisation will be slow')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete','Esta seguro que desea borrar el','Are you sure you want delete')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete2','de los datos de','of')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete3','l','')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete4',' la','')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete5',' las','')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_delete6','?','`s data?')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_warning','Cuidado...','Warning...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_synchronizeSetting','Configura el env&iacuteo de datos al servidor y el borrado de datos en el m&oacutevil','Configure sending data to the server and deleting data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_dataNoServer','No se han borrado los datos. Hay datos sin guardar en el servidor','It has not deleted the data. There is data that is not saved on the server')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_dataDelete','Se han borrado','It has been deleted')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_data','datos','data')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_accel','acelerometro','accelerometer')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_comp','brujula','compass')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_app','actividades','activities')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_act','Pr&oacutexima sincronizaci&oacuten:','Next update:')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_des','Sincronizaci&oacuten autom&aacutetica desactivada','Automatic synchronisation disabled')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc','Sincronizando...','Synchronising...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_user','Sincronizando usuario...','Synchronizing user...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_accel','Sincronizando aceler&oacutemetro...','Synchronising accelerometer...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_comp','Sincronizando br&uacutejula...','Synchronising compass...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_geo','Sincronizando GPS...','Synchronising GPS...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_app','Sincronizando actividades...','Synchronising activities...')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_fin','Sincronizado','Synchronised')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_synchronization','Sincronizacion','Synchronisation')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_on','Encendida','On')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_sinc_off','Apagada','Off')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_connect','Conexion','Connection')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_lastConnect','Ultima sincronizacion','Last update')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_lastDelete','Ultimo borrado','Last deleted')");
    	tx.executeSql("INSERT INTO TRADDB (id, idHtml, es, en) VALUES ("+(i++)+",'lbl_noct','Nocturno','Night')");
    }
    traductionDB.getDataTraduction();
}

//Error al crear tabla
function errorTraductionCB(err) { 
    console.log("Error processing SQL in TRADDB: " + err.code);
    //controller.setDocumentIdClass('lbl_info', '');
    //controller.setDocumentIdClass('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Exito al crear la tabla
 function successTraductionCreateCB() { 
    //console.log("Success creating Database 1.0");
	//controller.setDocumentIdClass('lbl_info', 'help');
	//controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la BD para crear la tabla
 traductionDB.createTraductionDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateTraductionDB, errorTraductionCB, successTraductionCreateCB);    
 };
 
//Accedemos a los datos para traducir la app
 function queryTradSuccess(tx, results) { 
	 var item=results.rows;
     var len=item.length;
     var traduction=new Array(len);
     for (var i=0; i<len; i++) {
    	 //console.log(results.rows.item(i).idHtml+","+results.rows.item(i).es+","+results.rows.item(i).en);
         traduction[i]={idHtml:item.item(i).idHtml, es:item.item(i).es, en:item.item(i).en};
     }
     controller.setTraduction(traduction); //Guardamos la traduccion
     controller.initSystem(); //Iniciamos datos 
 }

 //Sentencia SQL
 function queryTradDB(tx) {
     tx.executeSql('SELECT * FROM TRADDB', [], queryTradSuccess, errorTraductionCB);
 }
 
 //Acceso a BD para acceder a los datos
 traductionDB.getDataTraduction=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryTradDB, errorTraductionCB);
 };