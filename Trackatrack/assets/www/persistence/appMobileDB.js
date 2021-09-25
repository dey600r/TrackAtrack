var appMobileDB=new Object();

//CREATE TABLE

//Crear tabla para actividad movil
function populateAppDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS APPSUMMARYDB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS APPSUMMARYDB (id unique, name, state, date)');
    tx.executeSql('SELECT * FROM APPSUMMARYDB WHERE id IN (SELECT MIN(ID) FROM APPSUMMARYDB) or id IN (SELECT MAX(ID) FROM APPSUMMARYDB)', [], queryAppSuccess, errorAppCB);
}

//Error al crear tabla
function errorAppCB(err) {
    console.log("Error processing SQL in table APPSUMMARYDB: " + err.code);
    controller.setDocumentIdClass('lbl_info', '');
    controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Exito al crear tabla
 function successAppCreateCB() {
    //console.log("Success creating Database 1.0");
	controller.setDocumentIdClass('lbl_info', 'help');
	controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la base de datos
 appMobileDB.createAppDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateAppDB, errorAppCB, successAppCreateCB);    
 };
 
//UPDATE DATA
 var contAppDB=0, contInitAppDB=0, appDateInit=0, appDateEnd=0;
 
 //Get ultima fila
 appMobileDB.getContAppDB=function() {
	 return contAppDB;
 };
 
 //Get primera fila
 appMobileDB.getContInitAppDB=function() {
	 return contInitAppDB;
 };
 
 //Get primera fecha de insercion
 appMobileDB.getAppDateInit=function() {
	 return appDateInit;
 };
 
 //Get ultima fecha de insercion
 appMobileDB.getAppDateEnd=function() {
	 return appDateEnd;
 };
 
 //Iniciar datos para insercion
 function queryAppSuccess(tx, results) {
	 contAppDB=1;
     if(results.rows.length==0) {
    	 contAppDB=1;
    	 var date_now=new Date();
    	 appDateInit=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
     } else {
    	 contInitAppDB=results.rows.item(0).id;
    	 appDateInit=results.rows.item(0).date;
    	 if(results.rows.length==1) {
    		contAppDB=contInitAppDB;
    	 	appDateEnd=appDateInit;
    	 }else {
    		 contAppDB=results.rows.item(1).id+1;
     	 	appDateEnd=results.rows.item(1).date;
    	 }
     }
 }

//Accedemos a los datos para representarlos en las gráficas
 function queryAppMobileSuccess(tx, results) {
	 var item=results.rows;
     var len=item.length;
     var appMobile=new Array(len);
     appDateInit=item.item(0).date;
	 appDateEnd=item.item(item.length-1).date;
     for (var i=0; i<len; i++) {
    	appMobile[i]={id: item.item(i).id, name:item.item(i).name, state:item.item(i).state, date:item.item(i).date};
     }
     graphAppMobile.paintImageApp(appMobile);
 }

 //Exito al acceder
 function queryAppMobileDB(tx) {
     tx.executeSql('SELECT * FROM APPSUMMARYDB', [], queryAppMobileSuccess, errorAppCB);
 }
 
 //Get datos de la base de datos
 appMobileDB.getDataApp=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryAppMobileDB, errorAppCB);
 };
 
 //INSERT DATA
 
 //Insertar datos en la tabla
 function insertAppDB(tx) {
	 var date_now=new Date();
	 var date=((date_now.getDate()<10)?"0":"")+date_now.getDate()+"/"+((date_now.getMonth()<9)?"0":"")+(date_now.getMonth()+1)+"/"+date_now.getFullYear()+"-"+((date_now.getHours()<10)?"0":"")+date_now.getHours()+":"+((date_now.getMinutes()<10)?"0":"")+date_now.getMinutes()+":"+((date_now.getSeconds()<10)?"0":"")+date_now.getSeconds();
	 for(var i=0; i<appsDB.length; i++) {
		 tx.executeSql("INSERT INTO APPSUMMARYDB (id, name, state, date) VALUES ("+contAppDB+",'"+appsDB[i].name+"','"+appsDB[i].state+"','"+date+"')");
		 contAppDB=contAppDB+1;
	 }
     appDateEnd=date;
 }
 
 //Error al insertar
 function errorInsertAppCB(err) {
     console.log("Error insert processing SQL in table APPSUMMARYDB: " + err.code);
     apiAppMobile.setAppError(true);
  }
 
 //Exito al insertar
  function successInsertAppCB() {
	 //console.log("APPSMOBILE Success insert Database 1.0");
  }
  
  var db = 0;
  var appsDB=new Array();
  //Insertar app
  appMobileDB.insertarAppDB=function(appsMobile){
      appsDB=appsMobile;
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(insertAppDB, errorInsertAppCB, successInsertAppCB);    
  };
  
  //ACCESO A DATOS SINCRONIZAR MANUAL
  
//Acceso a datos para sincronizar
  function queryAppLimitSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var appMobile=new Array(len);
      for (var i=0; i<len; i++) {
    	  appMobile[i]={id: item.item(i).id, name:item.item(i).name, state:item.item(i).state, date:item.item(i).date};
      }
      appMobileConnect.insertManualAppMobile(appMobile);
  }

  //Sentencia de acceso a datos
  function queryAppLimitDB(tx) {
      tx.executeSql('SELECT * FROM APPSUMMARYDB WHERE id>='+viewSynchronize.getLimitApp()+' and id<='+(viewSynchronize.getLimitApp()+viewSynchronize.getPackageData()), [], queryAppLimitSuccess, errorAppCB);
  }
  
  //Get datos del acelerometro de la base de datos
  appMobileDB.getDataLimitApp=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryAppLimitDB, errorAppCB);
  };
  
 //ACCESO A DATOS SINCRONIZAR AUTOMATICO
  
//Acceso a datos para sincronizar
  function queryAppLimitAutoSuccess(tx, results) {
 	 var item=results.rows;
      var len=item.length;
      var appMobile=new Array(len);
      for (var i=0; i<len; i++) {
    	  appMobile[i]={id: item.item(i).id, name:item.item(i).name, state:item.item(i).state, date:item.item(i).date};
      }
      appMobileConnect.insertAutoAppMobile(appMobile);
  }

  //Sentencia de acceso a datos
  function queryAppLimitAutoDB(tx) {
      tx.executeSql('SELECT * FROM APPSUMMARYDB WHERE id>='+viewSynchronize.getLimitApp()+' and id<='+(viewSynchronize.getLimitApp()+viewSynchronize.getPackageDataAuto()), [], queryAppLimitAutoSuccess, errorAppCB);
  }
  
  //Get datos del acelerometro de la base de datos
  appMobileDB.getDataLimitAppAuto=function() {
	  if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(queryAppLimitAutoDB, errorAppCB);
  };
  
//BORRAR DATOS MANUAL
  
//Acceso a datos para sincronizar
  function queryAppDeleteSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-manual");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitApp()>deleteData) {
		contInitAppDB=deleteData;
		tx.executeSql('DELETE FROM APPSUMMARYDB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM APPSUMMARYDB WHERE id IN (SELECT MIN(ID) FROM APPSUMMARYDB)', [], queryAppDeleteActualizarSuccess, errorDeleteAppMobileCB);
		alert(controller.getTraduction("lbl_dataDelete")+" "+(deleteData-init)+" "+controller.getTraduction("lbl_data"));
	  } else if(viewSynchronize.getLimitAccel()==null) 
		  alert(controller.getTraduction("error_connect"));
	  else alert(controller.getTraduction("lbl_dataNoServer"));
  }
  
//Borrar datos de la tabla app mobile
  function deleteAppMobileDB(tx) {
	  tx.executeSql('SELECT id, date FROM APPSUMMARYDB WHERE id IN (SELECT MIN(ID) FROM APPSUMMARYDB) or id IN (SELECT MAX(ID) FROM APPSUMMARYDB)', [], queryAppDeleteSuccess, errorDeleteAppMobileCB);
  }
  
//Error al borrar datos
  function errorDeleteAppMobileCB(err) {
      console.log("Error delete processing SQL in table APPSUMMARYDB: " + err.code);
  }

  //Acceso a la base de datos
  appMobileDB.deleteAppMobileDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteAppMobileDB, errorDeleteAppMobileCB);    
  };
  
//BORRAR DATOS AUTOMATICO
  
//Acceso a datos para sincronizar
  function queryAppDeleteAutoSuccess(tx, results) {
	  var perc=controller.getDocumentIdSelectedValue("delete-auto");
	  var init=Number(results.rows.item(0).id);
	  var fin=Number(results.rows.item(1).id)-2;
	  var deleteData=Math.floor((((fin-init)*perc)/100)+init);
	  if(viewSynchronize.getLimitApp()>deleteData) {
		contInitAppDB=deleteData;
		tx.executeSql('DELETE FROM APPSUMMARYDB WHERE id<'+deleteData);
		tx.executeSql('SELECT id, date FROM APPSUMMARYDB WHERE id IN (SELECT MIN(ID) FROM APPSUMMARYDB)', [], queryAppDeleteActualizarSuccess, errorDeleteAppMobileCB);
	  } 
  }
  
  function queryAppDeleteActualizarSuccess(tx, results) {
	  appDateInit=results.rows.item(0).date;
  }
  
//Borrar datos de la tabla app mobile
  function deleteAppMobileAutoDB(tx) {
	  tx.executeSql('SELECT id, date FROM APPSUMMARYDB WHERE id IN (SELECT MIN(ID) FROM APPSUMMARYDB) or id IN (SELECT MAX(ID) FROM APPSUMMARYDB)', [], queryAppDeleteAutoSuccess, errorDeleteAppMobileCB);
  }

  //Acceso a la base de datos
  appMobileDB.deleteAutoAppMobileDB=function(){
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(deleteAppMobileAutoDB, errorDeleteAppMobileCB);    
  };