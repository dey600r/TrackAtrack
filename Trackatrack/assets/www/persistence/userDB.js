 //CREATE TABLE
var userDB=new Object();

//Crear tabla para datos del usuario
function populateUserDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS USERDB');
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERDB (id unique, name, age, occupation, name_mobile, platform, version, server)');
}

//Error al crear tabla
function errorUserCB(err) {
    console.log("Error processing SQL in table USERDB: " + err.code);
    controller.setDocumentIdClass('lbl_info', '');
    controller.setDocumentIdClass('lbl_info', controller.getTraduction('lbl_info_error'));
 }

//Exito al crear tabla
 function successUserCreateCB() {
    //console.log("Success creating Database 1.0");
	controller.setDocumentIdClass('lbl_info', 'help');
	controller.setDocumentIdInnerHTML('lbl_info', controller.getTraduction('lbl_info'));
 }
 
 var db = 0;
 //Acceso a la base de datos
 userDB.createUserDB=function(){
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(populateUserDB, errorUserCB, successUserCreateCB);    
 };
 
//UPDATE DATA
 var contUserDB=0, user;
 
 //Get usuario
 userDB.getUser=function() {
	 return user;
 };
 
 //Set usuario
 userDB.setUser=function(usuario) {
	 user=usuario;
 };
 
 //Get ultima fila
 userDB.getContUserDB=function() {
	 return contUserDB;
 };
 
 //Iniciar variables de acceso
 function queryUserSuccess(tx, results) {
	 var item=results.rows;
     contUserDB=item.length;
     if(contUserDB==0) {
    	controller.setDocumentIdInnerHTML('lbl_init', controller.getTraduction('lbl_init'));
    	controller.setDocumentIdInnerHTML('info_data', controller.getTraduction('lbl_data_init'));
     }
     else {
    	controller.setDocumentIdInnerHTML('lbl_init', controller.getTraduction('lbl_init')+" "+results.rows.item(0).name);
    	user={id: item.item(0).id, name:item.item(0).name, age:item.item(0).age, prof:item.item(0).occupation, mobile:item.item(0).name_mobile, plat:item.item(0).platform, version:item.item(0).version, serv:item.item(0).server};
     }
 }

 //Sentencia SQL
 function queryUserDB(tx) {
     tx.executeSql('SELECT * FROM USERDB', [], queryUserSuccess, errorUserCB);
 }

 //Acceso a la BD para acceder a datos
 userDB.initUserDB=function() {
     if (!db) {
         db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
     }
     db.transaction(queryUserDB, errorUserCB); 
 };
 
 //INSERT DATA
 
 //Insertar datos del usuario
 function insertUserDB(tx) {
	 var id;
     if(contUserDB==0) { //Insertar datos de un nuevo usuario
    	 id=Math.floor(Math.random()*100000+1);
         tx.executeSql("INSERT INTO USERDB (id, name, age, occupation, name_mobile, platform, version, server) VALUES ("+id+",'"+name+"',"+age+",'"+occupation+"','"+device.name+"','"+device.platform+"','"+device.version+"','"+server+"')");
         user={id: id, name:name, age:age, prof:occupation, mobile:device.name, plat:device.platform, version:device.version, serv: server};
         userConnect.insertUser();
     }
     else { //Cambiar datos del usuario actual
    	 id=user.id;
    	 tx.executeSql("UPDATE USERDB SET name='"+name+"',age="+age+",occupation='"+occupation+"',server='"+server+"' WHERE id="+id);
    	 user={id: id, name:name, age:age, prof:occupation, mobile:device.name, plat:device.platform, version:device.version, serv: server};
         userConnect.setUser();
     }
     controller.setDocumentIdInnerHTML('info_data', controller.getTraduction('info_data'));
     contUserDB=1;
 }
 
 //Error al insertar
 function errorInsertUserCB(err) {
	 controller.setDocumentIdClass('lbl_user_error', '');
	 controller.setDocumentIdInnerHTML('lbl_user_error', controller.getTraduction('lbl_user_error'));
     console.log("Error insert processing SQL in table USERDB: " + err.code);
  }
 
 //Exito al insertar
  function successInsertUserCB() {
	 controller.setDocumentIdInnerHTML('lbl_user_success', controller.getTraduction('lbl_user_success'));
	 controller.setDocumentIdInnerHTML('lbl_user_error', name+" - "+age+" - "+occupation+" - http://"+server);
	 controller.setDocumentIdClass('lbl_user_error', 'help');
     //console.log("Success insert Database 1.0");
  }
  
  var db = 0;
  var name, age, occupation, server;
  //Acceso a la BD para introducir datos de usuario
  userDB.insertarUserDB=function(n, a, o, s){
      name=n;
      age=a;
      occupation=o;
      server=s;
      if (!db) {
          db = window.openDatabase("DBSpy", "1.0", "DataBase spy", 500000);
      }
      db.transaction(insertUserDB, errorInsertUserCB, successInsertUserCB);
  };