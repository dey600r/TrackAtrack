/*TESTS FUNCIONAMIENTO AUXILIARES DE APPS EJECUTADAS*/

module( "TESTS APPS EXECUTED" );

function setUp() {
	var array=new Array();
	array.push({id:1, name: "WiFi connection", state: "Opened", date:"18/02/2014-16:22:04"});
	array.push({id:2, name: "Whatsup", state: "Opened", date:"18/02/2014-16:22:16"});
	array.push({id:3, name: "Ajustes", state: "Opened", date:"18/02/2014-16:24:20"});
	array.push({id:4, name: "Whatsup", state: "Closed", date:"18/02/2014-16:24:20"});
	array.push({id:5, name: "Ajustes", state: "Closed", date:"18/02/2014-16:24:24"});
	array.push({id:6, name: "Whatsup", state: "Opened", date:"18/02/2014-19:30:14"});
	array.push({id:7, name: "Cell 3G connection", state: "Opened", date:"18/02/2014-19:30:58"});
	array.push({id:8, name: "Whatsup", state: "Background", date:"18/02/2014-19:31:04"});
	array.push({id:9, name: "Vodafone", state: "Opened", date:"18/02/2014-19:31:04"});
	array.push({id:10, name: "Hangout", state: "Opened", date:"18/02/2014-20:22:04"});
	array.push({id:11, name: "Hangout", state: "ScreenOff", date:"18/02/2014-20:22:32"});
	array.push({id:12, name: "Hangout", state: "Opened", date:"18/02/2014-20:25:50"});
	array.push({id:13, name: "Hangout", state: "Background", date:"18/02/2014-20:26:34"});
	array.push({id:14, name: "Reloj", state: "Opened", date:"18/02/2014-21:10:08"});
	array.push({id:15, name: "Whatsup", state: "Opened", date:"18/02/2014-22:01:04"});
	array.push({id:16, name: "Whatsup", state: "Background", date:"18/02/2014-22:02:32"});
	array.push({id:17, name: "Vodafone", state: "Opened", date:"18/02/2014-22:03:00"});
	array.push({id:18, name: "Gmail", state: "Opened", date:"18/02/2014-23:04:04"});
	array.push({id:19, name: "No network connection", state: "Opened", date:"18/02/2014-23:04:36"});
	array.push({id:20, name: "Gmail", state: "Background", date:"18/02/2014-23:04:58"});
	return array;
}

//Test: Verifica el funcionamiento del método isProcessUser
QUnit.test( "Test IsProcessUser", function( assert ) {
	var array=new Array(), processUser;
	array=setUp();
	processUser=graphAppMobile.isProcessUser(array, 1, 0, array.length-1);
	ok(processUser==true, array[1].name+" es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 4, 0, array.length-1);
	ok(processUser==true, array[4].name+" es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 8, 0, array.length-1);
	ok(processUser==false, array[8].name+" no es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 9, 0, array.length-1);
	ok(processUser==true, array[9].name+" es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 13, 0, array.length-1);
	ok(processUser==false, array[13].name+" no es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 18, 0, array.length-1);
	ok(processUser==true, array[18].name+" es un proceso de usuario");
	processUser=graphAppMobile.isProcessUser(array, 19, 0, array.length-1);
	ok(processUser==true, array[19].name+" es un proceso de usuario");
});

//Test: Verifica el funcionamiento del método getSummaryApps
QUnit.test( "Test getSummaryApps", function( assert ) {
	var array=new Array(), summary=new Array();
	array=setUp();
	graphAppMobile.setApps(array);
	graphAppMobile.setLim_inf(0);
	graphAppMobile.setLim_sup(array.length-1);
	summary=graphAppMobile.getSummaryApps();
	ok(summary.length=="5", "Numero de aplicaciones de usuario correctas: "+summary.length);
	ok(summary[0].name=="Whatsup", summary[0].name+" ha sido utilizado por el usuario");
	ok(summary[0].freq=="3", summary[0].name+" se ha ejecutado "+summary[0].freq+" veces");
	ok(summary[0].time=="262", summary[0].name+" se ha utilizado durante "+summary[0].time+" segundos");
	ok(summary[1].name=="Ajustes", summary[1].name+" ha sido utilizado por el usuario");
	ok(summary[1].freq=="1", summary[1].name+" se ha ejecutado "+summary[1].freq+" veces");
	ok(summary[1].time=="4", summary[1].name+" se ha utilizado durante "+summary[1].time+" segundos");
	ok(summary[2].name=="Hangout", summary[2].name+" ha sido utilizado por el usuario");
	ok(summary[2].freq=="2", summary[2].name+" se ha ejecutado "+summary[2].freq+" veces");
	ok(summary[2].time=="72", summary[2].name+" se ha utilizado durante "+summary[2].time+" segundos");
	ok(summary[3].name=="Reloj", summary[3].name+" ha sido utilizado por el usuario");
	ok(summary[3].freq=="1", summary[3].name+" se ha ejecutado "+summary[3].freq+" veces");
	ok(summary[3].time=="1", summary[3].name+" se ha utilizado durante "+summary[3].time+" segundos");
	ok(summary[4].name=="Gmail", summary[4].name+" ha sido utilizado por el usuario");
	ok(summary[4].freq=="1", summary[4].name+" se ha ejecutado "+summary[4].freq+" veces");
	ok(summary[4].time=="54", summary[4].name+" se ha utilizado durante "+summary[4].time+" segundos");
});

//Test: Verifica el funcionamiento del método isAppIn
QUnit.test( "Test IsAppIn", function( assert ) {
	var array=new Array(), summary=new Array();
	array=setUp();
	graphAppMobile.setApps(array);
	graphAppMobile.setLim_inf(0);
	graphAppMobile.setLim_sup(array.length-1);
	expect(9);
	for(var i=0; i<array.length; i++) { //Recorremos las apps
    	if(graphAppMobile.isAppIn(summary, array[i].name)!=true) { 
    		summary.push({name: array[i].name, freq: 1, time: 1});
    		ok(1=="1", "Aplicacion ejecutadas: "+array[i].name);
    	}
	}
});

//Test: Verifica el funcionamiento del método getTimeOpenApp
QUnit.test( "Test GetTimeOpenApp", function( assert ) {
	var time=graphAppMobile.getTimeOpenApp("02/01/2014-13:12:02", "02/01/2014-13:12:10");
	ok(time=="8", "La aplicacion ha estado abierta durante "+time+" segundos");
	time=graphAppMobile.getTimeOpenApp("02/01/2014-13:59:02", "02/01/2014-14:00:10");
	ok(time=="68", "La aplicacion ha estado abierta durante "+time+" segundos");
	time=graphAppMobile.getTimeOpenApp("02/01/2014-23:59:30", "03/01/2014-00:02:32");
	ok(time=="182", "La aplicacion ha estado abierta durante "+time+" segundos");
	time=graphAppMobile.getTimeOpenApp("02/01/2014-23:58:30", "03/01/2014-00:02:30");
	ok(time=="240", "La aplicacion ha estado abierta durante "+time+" segundos");
	time=graphAppMobile.getTimeOpenApp("02/01/2014-13:50:02", "02/01/2014-14:30:10");
	ok(time=="2408", "La aplicacion ha estado abierta durante "+time+" segundos");
	time=graphAppMobile.getTimeOpenApp("02/01/2014-13:51:58", "02/01/2014-19:33:12");
	ok(time=="20474", "La aplicacion ha estado abierta durante "+time+" segundos");
});