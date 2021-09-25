var userConnect=new Object();

//Enviar el usuario al servidor
userConnect.insertUser=function() { 
	var user= {id: userDB.getUser().id, name: userDB.getUser().name,
			age: userDB.getUser().age, occupation: userDB.getUser().prof, device: userDB.getUser().mobile, 
			plataform: userDB.getUser().plat, version: userDB.getUser().version};
	var servidor='http://'+userDB.getUser().serv+'/serverInsertUser.php';
	$.ajax({ 
		url: servidor,
		type:'POST', 
		data: user, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){},  
		timeout:10000
	});
}; 

//Actualizar con nuevos datos del usuario en el servidor
userConnect.setUser=function() { 
	var user= {id: userDB.getUser().id, name: userDB.getUser().name, age: userDB.getUser().age, occupation: userDB.getUser().prof, device: userDB.getUser().mobile, plataform: userDB.getUser().plat, version: userDB.getUser().version};
	var servidor='http://'+userDB.getUser().serv+'/serverSetUser.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverSetUser.php', 
		url: servidor,
		type:'POST', 
		data: user, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ 
		alert(controller.getTraduction('alert_connect_error'));}, 
		timeout:10000
	});
};

//Preguntar al servidor si el usuario con id existe en su BD
userConnect.getUser=function() {
	var id={idUser: userDB.getUser().id};
	var servidor='http://'+userDB.getUser().serv+'/serverGetUser.php';
	$.ajax({ 
		//url:'http://192.168.0.199/xampp/David/serverGetUser.php', 
		url: servidor,
		type:'POST', 
		data: id, 
		dataType:'json', 
		error:function(jqXHR,text_status,strError){ 
			viewSynchronize.showErrorGetLimit();
			console.log("ERROR "+strError+" "+text_status);},
		timeout:10000, 
		success:function(data){
			if(data==null) {
				data=new Array();
				data[0]=0;
				data[1]=0;
			}
			viewSynchronize.initDataServerUser(data);	
		}
	});
};