var accelerometerDB=new Object();

//CREAR TABLA

//Crear tabla acelerometro
function populateAccelerometerDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS ACCELDB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS ACCELDB (id unique, x, y, z, date)');
    tx.executeSql('SELECT * FROM ACCELDB WHERE id IN (SELECT MIN(ID) FROM ACCELDB) or id IN (SELECT MAX(ID) FROM ACCELDB)', [], queryAccelerometerSuccess, errorAccelerometerCB);
}

//Error al crear tabla
function errorAccelerometerCB(err) { 
    console.log("Error processing SQL in table ACCELDB: " + err.code);
    controller.setDocumentIdClass('lbl_info', '');
    controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Tabla creada correctamente
 function successAccelerometerCreateCB() { 
    //console.log("Success creating Database 1.0");
	controller.setDocumentIdClass('lbl_info', 'help');
	controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la base de datos
 accelerometerDB.createAccelerometerDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateAccelerometerDB, errorAccelerometerCB, successAccelerometerCreateCB);    
 };
 
//UPDATE DATA
 var contAccelerometerDB, contInitAccelerometerDB=0, accelerometerDateInit=0, accelerometerDateEnd=0;
 
 //Get primera fila en la tabla
 accelerometerDB.getContInitAccelerometerDB=function() {
	return contInitAccelerometerDB; 
 };
 
 //Get ultima fila en la tabla
 accelerometerDB.getContAccelerometerDB=function() {
	 return contAccelerometerDB;
 };
 
 //Get primera fecha de insercion
 accelerometerDB.getAccelerometerDateInit=function() {
	 return accelerometerDateInit;
 };
 
 //Get ultima fecha de insercion
 accelerometerDB.getAccelerometerDateEnd=function() {
	 return accelerometerDateEnd;
 };
 
 //Iniciar variables para insercion
 function queryAccelerometerSuccess(tx, results) {
	 contAccelerometerDB=1;
     if(results.rows.length==0) {
    	 contAccelerometerDB=1;
    	 var date_now=new Date();
    	 accelerometerDateInit=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     }
     else {
    	 contInitAccelerometerDB=results.rows.item(0).id;
    	 accelerometerDateInit=results.rows.item(0).date;
    	 contAccelerometerDB=results.rows.item(1).id+1;
    	 accelerometerDateEnd=results.rows.item(1).date;
     }
 }

 //Acceso a datos
 function queryAccelSuccess(tx, results) {
	 var item=results.rows;
     var len=item.length;
     var accelerometer=new Array(len);
     accelerometerDateInit=item.item(0).date;
	 accelerometerDateEnd=item.item(item.length-1).date;
     for (var i=0; i<len; i++) {
    	 //console.log(results.rows.item(i).id+" "+results.rows.item(i).x+","+results.rows.item(i).y+","+results.rows.item(i).z+","+results.rows.item(i).date);
         accelerometer[i]={id: item.item(i).id, x:item.item(i).x, y:item.item(i).y, z:item.item(i).z, date:item.item(i).date};
     }
     graphAccelerometer.paintImageAccel(accelerometer);
 }

 //Sentencia de acceso a datos
 function queryAccelDB(tx) {
     tx.executeSql('SELECT * FROM ACCELDB', [], queryAccelSuccess, errorAccelerometerCB);
 }
 
 //Get datos del acelerometro de la base de datos
 accelerometerDB.getDataAccel=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryAccelDB, errorAccelerometerCB);
 };
 
 //INSERT DATA
 
 //Insertar dato en la base de datos
 function insertAccelerometerDB(tx) {
	 var date_now=new Date();
	 var date=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+
	 ((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+
	 ((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+
	 date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     tx.executeSql("INSERT INTO ACCELDB (id, x, y, z, date) VALUES ("+contAccelerometerDB+","+x+","+y+","+z+",'"+date+"')");
     contAccelerometerDB=contAccelerometerDB+1;
     accelerometerDateEnd=date;
 }
 
 //Error al insertar
 function errorInsertAccelerometerCB(err) {
     console.log("Error insert processing SQL in table ACCELDB: " + err.code);
     apiAccelerometer.setAccelerationError(true);
  }
 
 //Exito al insertar
  function successInsertAccelerometerCB() {
	 //console.log("ACCELEROMETER Success insert Database 1.0");
  }
  
  var db = 0;
  var x, y, z, time;
  //Insertar coordenadas
  accelerometerDB.insertarAccelerometerDB=function(acceleration){
      x=roundNumber(acceleration.x);
      y=roundNumber(acceleration.y);
      z=roundNumber(acceleration.z);
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(insertAccelerometerDB, errorInsertAccelerometerCB, successInsertAccelerometerCB);    
  };
  
  //ACCESO A DATOS SINCRONIZAR MANUAL
  
  //Acceso a datos para sincronizar
  function queryAccelLimitSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var accelerometer=new Array(len);
      for (var i=0; i<len; i++) {
     	  accelerometer[i]={id: item.item(i).id, x:item.item(i).x, y:item.item(i).y, z:item.item(i).z, date:item.item(i).date};
      }
      accelerometerConnect.insertManualAccelerometer(accelerometer);
  }

  //Sentencia de acceso a datos
  function queryAccelLimitDB(tx) {
      tx.executeSql('SELECT * FROM ACCELDB WHERE id>='+viewSynchronize.getLimitAccel()+' and id<='+(viewSynchronize.getLimitAccel()+viewSynchronize.getPackageData()), [], queryAccelLimitSuccess, errorAccelerometerCB);
  }
  
  //Get datos del acelerometro de la base de datos
  accelerometerDB.getDataLimitAccel=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryAccelLimitDB, errorAccelerometerCB);
  };
  
 //ACCESO A DATOS SINCRONIZAR AUTOMATICO
  
  //Acceso a datos para sincronizar
  function queryAccelLimitAutoSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var accelerometer=new Array(len);
      for (var i=0; i<len; i++) {
     	  accelerometer[i]={id: item.item(i).id, x:item.item(i).x, y:item.item(i).y, z:item.item(i).z, date:item.item(i).date};
      }
      accelerometerConnect.insertAutoAccelerometer(accelerometer);
  }

  //Sentencia de acceso a datos
  function queryAccelLimitAutoDB(tx) {
      tx.executeSql('SELECT * FROM ACCELDB WHERE id>='+viewSynchronize.getLimitAccel()+' and id<='+(viewSynchronize.getLimitAccel()+viewSynchronize.getPackageDataAuto()), [], queryAccelLimitAutoSuccess, errorAccelerometerCB);
  }
  
  //Get datos del acelerometro de la base de datos
  accelerometerDB.getDataLimitAccelAuto=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryAccelLimitAutoDB, errorAccelerometerCB);
  };
  
//BORRAR DATOS MANUAL
  
//Acceso a datos para sincronizar
  function queryAccelDeleteSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-manual");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitAccel()>deleteData) {
		contInitAccelerometerDB=deleteData;
		tx.executeSql('DELETE FROM ACCELDB WHERE id<'+deleteData);
		tx.executeSql('SELECT date FROM ACCELDB WHERE id IN (SELECT MIN(ID) FROM ACCELDB)', [], queryAccelDeleteActualizarSuccess, errorDeleteAccelerometerCB);
		alert(controller.getTraduction("lbl_dataDelete")+" "+(deleteData-init)+" "+controller.getTraduction("lbl_data"));
	  } else if(viewSynchronize.getLimitAccel()==null) 
		  alert(controller.getTraduction("error_connect"));
	  else alert(controller.getTraduction("lbl_dataNoServer"));
  }
  
//Borrar datos de la tabla acelerometro
  function deleteAccelerometerDB(tx) {
	  tx.executeSql('SELECT id, date FROM ACCELDB WHERE id IN (SELECT MIN(ID) FROM ACCELDB) or id IN (SELECT MAX(ID) FROM ACCELDB)', [], queryAccelDeleteSuccess, errorDeleteAccelerometerCB);
  }
  
//Error al borrar datos
  function errorDeleteAccelerometerCB(err) {
      console.log("Error delete processing SQL in table ACCELDB: " + err.code);
  }

  //Acceso a la base de datos
  accelerometerDB.deleteAccelerometerDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteAccelerometerDB, errorDeleteAccelerometerCB);    
  };
  
//BORRAR DATOS AUTOMATICO
  
//Acceso a datos para sincronizar
  function queryAccelDeleteAutoSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-auto");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitAccel()>deleteData) {
		contInitAccelerometerDB=deleteData;
		tx.executeSql('DELETE FROM ACCELDB WHERE id<'+deleteData);
		tx.executeSql('SELECT date FROM ACCELDB WHERE id IN (SELECT MIN(ID) FROM ACCELDB)', [], queryAccelDeleteActualizarSuccess, errorDeleteAccelerometerCB);
	  } 
  }
  
  function queryAccelDeleteActualizarSuccess(tx, results) {
 	 	accelerometerDateInit=results.rows.item(0).date;
  }
  
//Borrar datos de la tabla acelerometro
  function deleteAccelerometerAutoDB(tx) {
	  tx.executeSql('SELECT id, date FROM ACCELDB WHERE id IN (SELECT MIN(ID) FROM ACCELDB) or id IN (SELECT MAX(ID) FROM ACCELDB)', [], queryAccelDeleteAutoSuccess, errorDeleteAccelerometerCB);
  }

  //Acceso a la base de datos
  accelerometerDB.deleteAutoAccelerometerDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteAccelerometerAutoDB, errorDeleteAccelerometerCB);    
  };