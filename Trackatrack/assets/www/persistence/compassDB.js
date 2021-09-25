//CREAR TABLA
var compassDB=new Object();

//Crear tabla para la brujula
function populateCompassDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS GYROSDB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS GYROSDB (id unique, degrees, date)');
    tx.executeSql('SELECT * FROM GYROSDB WHERE id IN (SELECT MIN(ID) FROM GYROSDB) or id IN (SELECT MAX(ID) FROM GYROSDB)', [], queryCompassSuccess, errorCompassCB);
}

//Error al crear tabla 
function errorCompassCB(err) {
    console.log("Error processing SQL in table GYROSDB: " + err.code);
    controller.setDocumentIdClass('lbl_info', '');
    controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Exito al crear tabla
 function successCreateCompassCB() {
    //console.log("Success creating Database 1.0");
	controller.setDocumentIdClass('lbl_info', 'help');
	controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la base de datos
 compassDB.createCompassDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateCompassDB, errorCompassCB, successCreateCompassCB);    
 };
 
//MOSTRAR DATOS
 var contCompassDB, contInitCompassDB=0, compassDateInit=0, compassDateEnd=0;
 
 //Get primera fila
 compassDB.getContInitCompassDB=function() {
	 return contInitCompassDB;
 };
 
 //Get ultima fila
 compassDB.getContCompassDB=function() {
	 return contCompassDB;
 };
 
 //Get primera fecha de insercion
 compassDB.getCompassDateInit=function() {
	 return compassDateInit;
 };
 
 //Get ultima fila de insercion
 compassDB.getCompassDateEnd=function() {
	 return compassDateEnd;
 };
 
 //Iniciar variables de insercion
 function queryCompassSuccess(tx, results) {
	 contCompassDB=1;
     if(results.rows.length==0) {
    	 contCompassDB=1;
    	 var date_now=new Date();
    	 compassDateInit=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     } else { 
    	 contInitCompassDB=results.rows.item(0).id;
    	 compassDateInit=results.rows.item(0).date;
    	 contCompassDB=results.rows.item(1).id+1;
    	 compassDateEnd=results.rows.item(1).date;
     }
 }
 
 //Seleccionar datos en la tabla de la brujula
 function queryCompSuccess(tx, results) {
	 var item=results.rows;
     var len=item.length;
     var compass=new Array(len);
     compassDateInit=item.item(0).date;
	 compassDateEnd=item.item(item.length-1).date;
     for (var i=0; i<len; i++)
         compass[i]={id: item.item(i).id, degrees:item.item(i).degrees, date:item.item(i).date};
     graphCompass.paintImageComp(compass);
 }

 //Sentencia SQL
 function queryCompDB(tx) {
     tx.executeSql('SELECT * FROM GYROSDB', [], queryCompSuccess, errorCompassCB);
 }
 
 //Acceso a la base de datos
 compassDB.getDataComp=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryCompDB, errorCompassCB); 
 };
 
 //INSERTAR DATOS

 //Insertar datos en la tabla
 function insertCompassDB(tx) {
     var date_now = new Date();
     var date=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     tx.executeSql("INSERT INTO GYROSDB (id, degrees, date) VALUES ("+contCompassDB+","+grados+",'"+date+"')");
     contCompassDB=contCompassDB+1;
     compassDateEnd=date;
 }
 
 //Error al insertar
 function errorInsertCompassCB(err) {
     console.log("Error insert processing SQL in table GYROSDB: " + err.code);
     apiCompass.setCompassError(true);
  }
 
 //Exito al insertar
  function successInsertCompassCB() {
     //console.log("COMPASS Success insert Database 1.0");
  }
  
  var db = 0;
  var grados;
  //Acceso a la base de datos para insertar
  compassDB.insertarCompassDB=function(h){
      grados=(Math.round(h.magneticHeading*10)/10);
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(insertCompassDB, errorInsertCompassCB, successInsertCompassCB);    
  };
  
  //ACCESO A DATOS SINCRONIZAR MANUAL
  
  //Acceso a datos para sincronizar
  function queryCompLimitSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var compass=new Array(len);
      for (var i=0; i<len; i++) {
     	 //console.log(results.rows.item(i).id+","+results.rows.item(i).x+","+results.rows.item(i).y+","+results.rows.item(i).z+","+results.rows.item(i).date);
    	  compass[i]={id: item.item(i).id, degrees:item.item(i).degrees, date:item.item(i).date};
      }
      compassConnect.insertManualCompass(compass);
  }

  //Sentencia de acceso a datos
  function queryCompLimitDB(tx) {
      tx.executeSql('SELECT * FROM GYROSDB WHERE id>='+viewSynchronize.getLimitComp()+' and id<='+(viewSynchronize.getLimitComp()+viewSynchronize.getPackageData()), [], queryCompLimitSuccess, errorCompassCB);
  }
  
  //Get datos del acelerometro de la base de datos
  compassDB.getDataLimitComp=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryCompLimitDB, errorCompassCB);
  };
  
//ACCESO A DATOS SINCRONIZAR AUTOMATICO
  
  //Acceso a datos para sincronizar
  function queryCompLimitAutoSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var compass=new Array(len);
      for (var i=0; i<len; i++) {
     	 //console.log(results.rows.item(i).id+","+results.rows.item(i).x+","+results.rows.item(i).y+","+results.rows.item(i).z+","+results.rows.item(i).date);
    	  compass[i]={id: item.item(i).id, degrees:item.item(i).degrees, date:item.item(i).date};
      }
      compassConnect.insertAutoCompass(compass);
  }

  //Sentencia de acceso a datos
  function queryCompLimitAutoDB(tx) {
      tx.executeSql('SELECT * FROM GYROSDB WHERE id>='+viewSynchronize.getLimitComp()+' and id<='+(viewSynchronize.getLimitComp()+viewSynchronize.getPackageDataAuto()), [], queryCompLimitAutoSuccess, errorCompassCB);
  }
  
  //Get datos del acelerometro de la base de datos
  compassDB.getDataLimitCompAuto=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryCompLimitAutoDB, errorCompassCB);
  };
  
  //BORRAR DATOS MANUAL
  
//Acceso a datos para sincronizar
  function queryCompDeleteSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-manual");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitComp()>deleteData) {
		contInitCompassDB=deleteData;
		tx.executeSql('DELETE FROM GYROSDB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM GYROSDB WHERE id IN (SELECT MIN(ID) FROM GYROSDB)', [], queryCompDeleteActualizarSuccess, errorDeleteCompassCB);
		alert(controller.getTraduction("lbl_dataDelete")+" "+(deleteData-init)+" "+controller.getTraduction("lbl_data"));
	  } else if(viewSynchronize.getLimitComp()==null) 
		  alert(controller.getTraduction("error_connect"));
	  else alert(controller.getTraduction("lbl_dataNoServer"));
  }
  
//Borrar datos de la tabla acelerometro
  function deleteCompassDB(tx) {
	  tx.executeSql('SELECT id, date FROM GYROSDB WHERE id IN (SELECT MIN(ID) FROM GYROSDB) or id IN (SELECT MAX(ID) FROM GYROSDB)', [], queryCompDeleteSuccess, errorDeleteCompassCB);
  }
  
//Error al borrar datos
  function errorDeleteCompassCB(err) {
      console.log("Error delete processing SQL in table GYROSDB: " + err.code);
  }

  //Acceso a la base de datos
  compassDB.deleteCompassDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteCompassDB, errorDeleteCompassCB);    
  };
  
//BORRAR DATOS AUTOMATICO
  
//Acceso a datos para sincronizar
  function queryCompDeleteAutoSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-auto");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitComp()>deleteData) {
		contInitCompassDB=deleteData;
		tx.executeSql('DELETE FROM GYROSDB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM GYROSDB WHERE id IN (SELECT MIN(ID) FROM GYROSDB)', [], queryCompDeleteActualizarSuccess, errorDeleteCompassCB);
	  }
  }
  
  function queryCompDeleteActualizarSuccess(tx, results) {
	  compassDateInit=results.rows.item(0).date;
  }
  
//Borrar datos de la tabla acelerometro
  function deleteCompassAutoDB(tx) {
	  tx.executeSql('SELECT id, date FROM GYROSDB WHERE id IN (SELECT MIN(ID) FROM GYROSDB) or id IN (SELECT MAX(ID) FROM GYROSDB)', [], queryCompDeleteAutoSuccess, errorDeleteCompassCB);
  }

  //Acceso a la base de datos
  compassDB.deleteAutoCompassDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteCompassAutoDB, errorDeleteCompassCB);    
  };