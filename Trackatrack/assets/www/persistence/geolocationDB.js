//CREATE TABLE
var geolocationDB=new Object();

//Crear tabla para GPS
function populateGeolocationDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS GEODB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS GEODB (id unique, lat, lon, alt, pre, spe, date)');
    tx.executeSql('SELECT * FROM GEODB WHERE id IN (SELECT MIN(ID) FROM GEODB) or id IN (SELECT MAX(ID) FROM GEODB)', [], queryGeolocationSuccess, errorGeolocationCB);
}

//Error al crear tabla
function errorGeolocationCB(err) { 
    console.log("Error processing SQL in table GEODB: " + err.code);
   	controller.setDocumentIdClass('lbl_info', '');
    controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Exito al crear tabla
 function successGeolocationCreateCB() { 
    //console.log("Success creating Database 1.0");
	controller.setDocumentIdClass('lbl_info', 'help');
	controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la base de datos
 geolocationDB.createGeolocationDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateGeolocationDB, errorGeolocationCB, successGeolocationCreateCB);    
 };
 
//UPDATE DATA
 var contGeolocationDB=1, contInitGeolocationDB=0, geolocationDateInit=0, geolocationDateEnd=0;
 
 geolocationDB.getContInitGeolocationDB=function() {
	 return contInitGeolocationDB;
 };
 
 //Get ultima fila
 geolocationDB.getContGeolocationDB=function() {
	 return contGeolocationDB;
 };
 
 //Get primera fecha de inserccion
 geolocationDB.getGeolocationDateInit=function() {
	return geolocationDateInit;
 };
 
 //Get ultima fecha de inserccion
 geolocationDB.getGeolocationDateEnd=function() {
	 return geolocationDateEnd;
 };
 
 //Iniciar variables de inserccion
 function queryGeolocationSuccess(tx, results) {
	 contGeolocationDB=1;
     if(results.rows.length==0) {
    	 contGeolocationDB=1;
    	 var date_now=new Date();
    	 geolocationDateInit=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     }else {
    	 contInitGeolocationDB=results.rows.item(0).id;
    	 geolocationDateInit=results.rows.item(0).date;
    	 if(results.rows.length==1) {
    		 contGeolocationDB=2;
    		 geolocationDateEnd=results.rows.item(0).date;
    	 } else {
    		 contGeolocationDB=results.rows.item(1).id+1;
        	 geolocationDateEnd=results.rows.item(1).date;
    	 }
     }
 }

//Accedemos a los datos para representarlos en las gráficas
 function queryGeoSuccess(tx, results) { 
	 var item=results.rows;
     var len=item.length;
     var geolocation=new Array(len);
     geolocationDateInit=item.item(0).date;
	 geolocationDateEnd=item.item(item.length-1).date;
     for (var i=0; i<len; i++) 
          geolocation[i]={id: item.item(i).id, lat:item.item(i).lat, lon:item.item(i).lon, alt:item.item(i).alt, pre:item.item(i).pre, spe:item.item(i).spe, date:item.item(i).date};
     graphGeolocation.paintImageGeo(geolocation);
 }
 
 //Sentencia SQL
 function queryGeoDB(tx) {
     tx.executeSql('SELECT * FROM GEODB', [], queryGeoSuccess, errorGeolocationCB);
 }
 
 //Acceso a la base de datos para acceder a los datos
 geolocationDB.getDataGeo=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryGeoDB, errorGeolocationCB);
 };
 
 //INSERT DATA
 
 //Insertar datos del GPS
 function insertGeolocationDB(tx) {
     var date_now = new Date();
     var date=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     tx.executeSql("INSERT INTO GEODB (id, lat, lon, alt, pre, spe, date) VALUES ("+contGeolocationDB+","+latitude+","+longitude+","+altitude+","+(Math.round(accuracy*10)/10)+","+(Math.round(speed*10)/10)+",'"+date+"')");
     contGeolocationDB=contGeolocationDB+1;
     geolocationDateEnd=date;
 }
 
 //Error al insertar
 function errorInsertGeolocationCB(err) {
     console.log("Error insert processing SQL in table GEODB: " + err.code);
     apiGeolocation.setGeolocationError(true);
  }
 
 //Exito al insertar
  function successInsertGeolocationCB() {
     //console.log("GPS Success insert Database 1.0");
  }
  
  var db = 0;
  var latitude, altitude, longitude, accuracy, speed;
  //Introducir datos del GPS
  geolocationDB.insertarGeolocationDB=function(geolocation){
      latitude=geolocation.coords.latitude;
      altitude=geolocation.coords.altitude;
      longitude=geolocation.coords.longitude;
      accuracy=geolocation.coords.accuracy;
      speed=geolocation.coords.speed;
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(insertGeolocationDB, errorInsertGeolocationCB, successInsertGeolocationCB);    
  };
  
  //ACCESO A DATOS SINCRONIZAR MANUAL
  
  //Acceso a datos para sincronizar
  function queryGeoLimitSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var geolocation=new Array(len);
      for (var i=0; i<len; i++) {
    	  geolocation[i]={id: item.item(i).id, lat:item.item(i).lat, lon:item.item(i).lon, alt:item.item(i).alt, pre:item.item(i).pre, spe:item.item(i).spe, date:item.item(i).date};
      }
      geolocationConnect.insertManualGeolocation(geolocation);
  }

  //Sentencia de acceso a datos
  function queryGeoLimitDB(tx) {
      tx.executeSql('SELECT * FROM GEODB WHERE id>='+viewSynchronize.getLimitGeo()+' and id<='+(viewSynchronize.getLimitGeo()+viewSynchronize.getPackageData()), [], queryGeoLimitSuccess, errorGeolocationCB);
  }
  
  //Get datos del acelerometro de la base de datos
  geolocationDB.getDataLimitGeo=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryGeoLimitDB, errorGeolocationCB);
  };
  
//ACCESO A DATOS SINCRONIZAR AUTOMATICO
  
  //Acceso a datos para sincronizar
  function queryGeoLimitAutoSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var geolocation=new Array(len);
      for (var i=0; i<len; i++) {
    	  geolocation[i]={id: item.item(i).id, lat:item.item(i).lat, lon:item.item(i).lon, alt:item.item(i).alt, pre:item.item(i).pre, spe:item.item(i).spe, date:item.item(i).date};
      }
      geolocationConnect.insertAutoGeolocation(geolocation);
  }

  //Sentencia de acceso a datos
  function queryGeoLimitAutoDB(tx) {
      tx.executeSql('SELECT * FROM GEODB WHERE id>='+viewSynchronize.getLimitGeo()+' and id<='+(viewSynchronize.getLimitGeo()+viewSynchronize.getPackageDataAuto()), [], queryGeoLimitAutoSuccess, errorGeolocationCB);
  }
  
  //Get datos del acelerometro de la base de datos
  geolocationDB.getDataLimitGeoAuto=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryGeoLimitAutoDB, errorGeolocationCB);
  };
  
  //BORRAR DATOS MANUAL
  
//Acceso a datos para sincronizar
  function queryGeoDeleteSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-manual");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitGeo()>deleteData) {
		contInitGeolocationDB=deleteData;
		tx.executeSql('DELETE FROM GEODB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM GEODB WHERE id IN (SELECT MIN(ID) FROM GEODB)', [], queryGeoDeleteActualizarSuccess, errorDeleteGeolocationCB);
		alert(controller.getTraduction("lbl_dataDelete")+" "+(deleteData-init)+" "+controller.getTraduction("lbl_data"));
	  } else if(viewSynchronize.getLimitGeo()==null) 
		  alert(controller.getTraduction("error_connect"));
	  else alert(controller.getTraduction("lbl_dataNoServer"));
  }
  
//Borrar datos de la tabla geolocalizacion
  function deleteGeolocationDB(tx) {
	  tx.executeSql('SELECT id, date FROM GEODB WHERE id IN (SELECT MIN(ID) FROM GEODB) or id IN (SELECT MAX(ID) FROM GEODB)', [], queryGeoDeleteSuccess, errorDeleteGeolocationCB);
  }
  
//Error al borrar datos
  function errorDeleteGeolocationCB(err) {
      console.log("Error delete processing SQL in table GEODB: " + err.code);
  }

  //Acceso a la base de datos
  geolocationDB.deleteGeolocationDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteGeolocationDB, errorDeleteGeolocationCB);    
  };
  
  //BORRAR DATOS AUTOMATICO
  
//Acceso a datos para sincronizar
  function queryGeoDeleteAutoSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-auto");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitGeo()>deleteData) {
		contInitGeolocationDB=deleteData;
		tx.executeSql('DELETE FROM GEODB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM GEODB WHERE id IN (SELECT MIN(ID) FROM GEODB)', [], queryGeoDeleteActualizarSuccess, errorDeleteGeolocationCB);
	  } 
  }
  
  function queryGeoDeleteActualizarSuccess(tx, results) {
	  geolocationDateInit=results.rows.item(0).date;
  }
  
//Borrar datos de la tabla geolocalizacion
  function deleteGeolocationAutoDB(tx) {
	  tx.executeSql('SELECT id, date FROM GEODB WHERE id IN (SELECT MIN(ID) FROM GEODB) or id IN (SELECT MAX(ID) FROM GEODB)', [], queryGeoDeleteAutoSuccess, errorDeleteGeolocationCB);
  }

  //Acceso a la base de datos
  geolocationDB.deleteAutoGeolocationDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteGeolocationAutoDB, errorDeleteGeolocationCB);    
  };