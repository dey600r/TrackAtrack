/*TESTS FUNCIONAMIENTO GRAFICAS Y ELECCION DE FECHAS*/

module( "TESTS GRAPHS" );

//Test: Verifica el funcionamiento del método getHourToday
QUnit.test( "Test GetHourToday", function( assert ) {
	var date=new Date(2014, 0, 3, 2, 6, 14, 1);
	var array = new Array();
	var hourToday;
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:15"}); //Introducimos datos del accelerometro a mano
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:45"});
	hourToday=graphFunction.getHourToday(date, array); //Debe devolver la primera hora del dia
	ok(hourToday=="03", "Hora en la que se recogio el primer dato en el dia "+date.toString()+": "+hourToday+" horas");
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:17"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-08:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-09:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-10:20"});
	date=new Date(2014, 0, 4, 2, 6, 14, 1);
	hourToday=graphFunction.getHourToday(date, array);
	ok(hourToday=="10", "Hora en la que se recogio el primer dato en el dia "+date.toString()+": "+hourToday+" horas");
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "10/01/2014-11:20"});
	date=new Date(2014, 0, 10, 2, 6, 14, 1);
	hourToday=graphFunction.getHourToday(date, array);
	ok(hourToday=="11", "Hora en la que se recogio el primer dato en el dia "+date.toString()+": "+hourToday+" horas");
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-11:20"});
	date=new Date(2014, 0, 13, 2, 6, 14, 1);
	hourToday=graphFunction.getHourToday(date, array);
	ok(hourToday=="2", "Hora en la que se recogio el primer dato en el dia "+date.toString()+": "+hourToday+" horas");
});

//Test: Verifica el funcionamiento del método findHour
QUnit.test( "Test FindHour", function( assert ) {
	var date=new Date(2014, 0, 12, 19, 6, 14, 1);
	var array = new Array();
	var hourToday;
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:15"}); //Introducimos datos del acelerometro a mano
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:45"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:17"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-08:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-09:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-10:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "10/01/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-12:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-14:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-16:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-18:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-18:22"});
	hourToday=Number(graphFunction.getHourToday(date, array));
	lim_for=Number(date.getHours()-hourToday);
	expect(12); 
	for(var i=0; i<=lim_for; i++) { //Debe detectarnos el numero de horas que llevamos recogiendo datos en el dia actual
		if(graphFunction.findHour(i, hourToday, date, array)) {
			ok(1=="1", "Hoy "+date.toString()+" hace "+(lim_for-i)+" horas disponemos de datos"); //Esperamos 5 horas
		}
	}
	date=new Date(2014, 1, 2, 21, 6, 14, 1);
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "15/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-05:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-05:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-05:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-12:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-14:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-16:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-18:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "02/02/2014-18:22"});
	hourToday=Number(graphFunction.getHourToday(date, array));
	lim_for=Number(date.getHours()-hourToday);
	for(var i=0; i<=lim_for; i++) {
		if(graphFunction.findHour(i, hourToday, date, array)) {
			ok(1=="1", "Hoy "+date.toString()+" hace "+(lim_for-i)+" horas disponemos de datos"); //Esperamos 7 horas
		}
	}
	date=new Date(2014, 1, 4, 21, 6, 14, 1);
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-12:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-14:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-16:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-18:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/02/2014-18:22"});
	hourToday=Number(graphFunction.getHourToday(date, array));
	lim_for=Number(date.getHours()-hourToday);
	for(var i=0; i<=lim_for; i++) {
		if(graphFunction.findHour(i, hourToday, date, array)) {
			ok(1=="1", "Hoy "+date.toString()+" hace "+(lim_for-i)+" horas disponemos de datos"); //Esperamos 0 horas
		}
	}
});

//Test: Verifica el funcionamiento del método findDays
QUnit.test( "Test FindDays", function( assert ) {
	var date=new Date(2014, 0, 29, 19, 6, 14, 1);
	var array = new Array();
	var minDay, maxDay;
	var ten_days=true, seven_days=true;
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-02:12"}); //Introducimos datos a mano
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-03:19"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-07:45"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:45"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:17"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-08:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-09:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-10:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "10/01/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-12:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-14:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-16:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-18:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "19/01/2014-18:22"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "22/01/2014-18:22"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "25/01/2014-18:22"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "28/01/2014-18:22"});
	minDay=Number(array[0].date.split("/")[0]);
	maxDay=Number(array[array.length-1].date.split("/")[0]);
	lim_for=(maxDay-minDay); 
	expect(8);
	for(var i=0; i<=lim_for; i++) { //Detectamos el numero de dias que llevamos recogiendo datos
		if(graphFunction.findDay(i, minDay, array)) { //Esperamos 5 dias
			if((date.getDate()-maxDay+(lim_for-i))<=7) { 
				ok(1=="1", "Hoy "+date.toString()+" hace "+((date.getDate()-maxDay)+lim_for-i)+" dias disponemos de datos");
			}
			else if((date.getDate()-maxDay+(lim_for-i))>7 && (date.getDate()-maxDay+(lim_for-i))<=10 && seven_days){ 
        		seven_days=false;
        		ok(1=="1", "Hoy "+date.toString()+" entre 7-10 dias disponemos de datos");
			}
			else if((date.getDate()-maxDay+(lim_for-i))>10 && ten_days) { //Datos de mas de 10 dias
				ok(1=="1", "Hoy "+date.toString()+" hace mas de 10 dias disponemos de datos");
        		ten_days=false;
			}
		}
	}  
	date=new Date(2014, 1, 27, 19, 6, 14, 1);
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "10/02/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-01:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-07:15"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-11:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-12:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-14:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-16:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-18:20"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "19/02/2014-18:22"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:21"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:21"});
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:22"});
	ten_days=true, seven_days=true;
	var dif_day, day_prev, day_post, month, month_prev, month_post;
	lim_for=array.length-1;
	for(var i=0; i<lim_for; i++) { //Esperamos 3 dias mas
		day_prev=Number(array[i].date.split("-")[0].split("/")[0]);//Simulamos la interfaz del programa
		day_post=Number(array[i+1].date.split("-")[0].split("/")[0]);
		month_prev=Number(array[i].date.split("-")[0].split("/")[1]);
		month_post=Number(array[i+1].date.split("-")[0].split("/")[1]);
		if(day_prev!=day_post || i==array.length-2) { 
			if((date.getMonth()+1)==month_prev) {
				dif_day=date.getDate()-day_prev;
				if(dif_day<=7) 
					ok(1=="1", "Hoy "+date.toString()+" hace "+dif_day+" dias disponemos de datos");
				else if(dif_day<=10 && seven_days) {
					ok(1=="1", "Hoy "+date.toString()+" entre 7-10 dias disponemos de datos");
					seven_days=false;
				}
				else if(dif_day>10 && ten_days && (date.getDate()-day_post)<=10) {
					ok(1=="1", "Hoy "+date.toString()+" hace mas de 10 dias disponemos de datos");
					ten_days=false;
				}
			}
			else { //Si estan en algun mes pasado
				if(month_prev==2) month=28;
				else if(month_prev==4 || month_prev==6 || month_prev==9 || month_prev==11)
					month=30;
				else month=31;
				dif_day=date.getDate()+(month-day_prev);
				if(dif_day<=7) 
					ok(1=="1", "Hoy "+date.toString()+" hace "+dif_day+" dias disponemos de datos");
				else if(dif_day<=10 && seven_days) {
					ok(1=="1", "Hoy "+date.toString()+" entre 7-10 dias disponemos de datos");
					seven_days=false;
				}
				else if(dif_day>10 && ten_days && (((date.getMonth()+1)!=month_post) && (date.getDate()+(month-day_post))<=10) || ((date.getMonth()+1)==month_post) && (date.getDate()-day_post<=10)) {
					ok(1=="1", "Hoy "+date.toString()+" hace mas de 10 dias disponemos de datos");
					ten_days=false;
				}
			}
		}
	}
});

//Test: Verifica el funcionamiento del método paintGraph
QUnit.test( "Test PaintGraph", function( assert ) {
	var array=new Array(), lim_inf, lim_sup;
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-02:12:01"}); //Introducimos datos del acelerometro a mano
	array.push({id: 2, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-03:19:03"});
	array.push({id: 3, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-07:45:10"});
	array.push({id: 4, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:15:15"});
	array.push({id: 5, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:45:12"});
	array.push({id: 6, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:15:01"});
	array.push({id: 7, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:17:19"});
	array.push({id: 8, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:20:02"});
	array.push({id: 9, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-07:15:29"});
	array.push({id: 10, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-08:15:17"});
	array.push({id: 11, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-09:15:15"});
	array.push({id: 12, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-10:20:12"});
	array.push({id: 13, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-01:15:14"});
	array.push({id: 14, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-07:15:12"});
	array.push({id: 15, x: 1.4, y: 4.2, z: 0.1, date: "10/01/2014-11:20:12"});
	array.push({id: 16, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-01:15:11"});
	array.push({id: 17, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-07:15:39"});
	array.push({id: 18, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-11:20:57"});
	array.push({id: 19, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-12:20:12"});
	array.push({id: 20, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-14:20:11"});
	array.push({id: 21, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-16:20:41"});
	array.push({id: 22, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-18:20:55"});
	array.push({id: 23, x: 1.4, y: 4.2, z: 0.1, date: "19/01/2014-18:22:01"});
	array.push({id: 24, x: 1.4, y: 4.2, z: 0.1, date: "22/01/2014-18:22:11"});
	array.push({id: 25, x: 1.4, y: 4.2, z: 0.1, date: "25/01/2014-18:22:33"});
	array.push({id: 26, x: 1.4, y: 4.2, z: 0.1, date: "28/01/2014-18:22:51"});
	array.push({id: 27, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-01:15:22"});
	array.push({id: 28, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-07:15:11"});
	array.push({id: 29, x: 1.4, y: 4.2, z: 0.1, date: "10/02/2014-11:20:11"});
	array.push({id: 30, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-01:15:12"});
	array.push({id: 31, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-07:15:11"});
	array.push({id: 32, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-11:20:01"});
	array.push({id: 33, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-12:20:12"});
	array.push({id: 34, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-14:20:22"});
	array.push({id: 35, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-16:20:51"});
	array.push({id: 36, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-18:20:12"});
	array.push({id: 37, x: 1.4, y: 4.2, z: 0.1, date: "19/02/2014-18:22:21"});
	array.push({id: 38, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:31:21"});
	array.push({id: 39, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:32:22"});
	array.push({id: 40, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:51:11"});
	array.push({id: 40, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-19:22:13"});
	//El usuario solo elige una fecha inicial
	controller.setDocumentIdValue('dateFromAccel', "2014-01-12"); //Simulamos interfaz y eleccion del usuario
	controller.setDocumentIdValue('dateToAccel', "");
	controller.setDocumentIdValue('hourFromAccel', "");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel"); //Esperamos que el metodo nos de unos limites que este entre las fechas seleccionadas
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="17", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup==array.length-1, "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario solo elige una fecha inicial y final
	controller.setDocumentIdValue('dateFromAccel', "2014-01-13");
	controller.setDocumentIdValue('dateToAccel', "2014-02-01");
	controller.setDocumentIdValue('hourFromAccel', "");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="22", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup=="25", "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario solo elige una fecha inicial con horas y minutos
	controller.setDocumentIdValue('dateFromAccel', "2014-01-10");
	controller.setDocumentIdValue('dateToAccel', "");
	controller.setDocumentIdValue('hourFromAccel', "11");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "00");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="14", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup==array.length-1, "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario elige fecha inicial con horas y minutos y fecha final
	controller.setDocumentIdValue('dateFromAccel', "2014-01-08");
	controller.setDocumentIdValue('dateToAccel', "2014-01-30");
	controller.setDocumentIdValue('hourFromAccel', "11");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "00");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="14", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup=="25", "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario elige fecha inicial completa y fecha final completa
	controller.setDocumentIdValue('dateFromAccel', "2014-01-10");
	controller.setDocumentIdValue('dateToAccel', "2014-02-16");
	controller.setDocumentIdValue('hourFromAccel', "11");
	controller.setDocumentIdValue('hourToAccel', "22");
	controller.setDocumentIdValue('minFromAccel', "00");
	controller.setDocumentIdValue('minToAccel', "30");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="14", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup=="35", "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario solo elige una fecha final
	controller.setDocumentIdValue('dateFromAccel', "");
	controller.setDocumentIdValue('dateToAccel', "2014-01-22");
	controller.setDocumentIdValue('hourFromAccel', "");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup=="23", "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario solo elige una fecha final con horas y minutos
	controller.setDocumentIdValue('dateFromAccel', "");
	controller.setDocumentIdValue('dateToAccel', "2014-01-12");
	controller.setDocumentIdValue('hourFromAccel', "");
	controller.setDocumentIdValue('hourToAccel', "10");
	controller.setDocumentIdValue('minFromAccel', "");
	controller.setDocumentIdValue('minToAccel', "30");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup=="16", "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
	//El usuario no elige nada
	controller.setDocumentIdValue('dateFromAccel', "");
	controller.setDocumentIdValue('dateToAccel', "");
	controller.setDocumentIdValue('hourFromAccel', "");
	controller.setDocumentIdValue('hourToAccel', "");
	controller.setDocumentIdValue('minFromAccel', "");
	controller.setDocumentIdValue('minToAccel', "");
	graphFunction.paintGraph(array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha seleccionado desde la fecha: "+array[lim_inf].date+" con limite: "+lim_inf);
	ok(lim_sup==array.length-1, "El usuario ha seleccionado hasta la fecha: "+array[lim_sup].date+" con limite: "+lim_sup);
});

//Test: Verifica el funcionamiento del método paintGraphForDay
QUnit.test( "Test PaintGraphForDay", function( assert ) {
	var array=new Array(), lim_inf, lim_sup, date=new Date(), month, year;
	day=(date.getDate()<10?"0":"")+date.getDate();
	month=((date.getMonth()+1)<10?"0":"")+(date.getMonth()+1);
	year=date.getFullYear();
	for(var a=20; a<=28; a++) { //Introducimos datos desde principio de mes hasta hoy
		for(var i=0; i<=23; i++) {
			for(var j=0; j<60; j+=10) {
				array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: (a<10?"0":"")+a+"/"+(month-1)+"/"+year+"-"+(i<10?"0":"")+i+":"+(j<10?"0":"")+j+":01"});
			}
		}
	}
	for(var a=1; a<=date.getDate(); a++) { //Introducimos datos desde principio de mes hasta hoy
		for(var i=0; i<=date.getHours(); i++) {
			for(var j=0; j<date.getMinutes(); j++) {
				array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: (a<10?"0":"")+a+"/"+month+"/"+year+"-"+(i<10?"0":"")+i+":"+(j<10?"0":"")+j+":01"});
			}
		}
	}
	controller.setDocumentIdCreateOption('listDateAccel', "+10 days" , 11); //Simulamos interfaz de usuario
	controller.setDocumentIdCreateOption('listDateAccel', "7-10 days" , 10);
	controller.setDocumentIdCreateOption('listDateAccel', "2 days" , 2);
	controller.setDocumentIdCreateOption('listDateAccel', "1 days" , 1);
	controller.setDocumentIdCreateOption('listDateAccel', "today" , 0);
	controller.setDocumentIdCreateOption('listHourAccel', "2 hours" , 2);
	controller.setDocumentIdCreateOption('listHourAccel', "1 hours" , 1);
	controller.setDocumentIdCreateOption('listHourAccel', "minutes" , 0);
	//El usuario elige datos de hace unos minutos
	controller.setDocumentIdSelectedValue('listHourAccel', 3); 
	graphFunction.paintGraphForDay(0, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[1].split(":")[0]==date.getHours(), "El usuario ha elegido hace unos minutos desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[1].split(":")[0]==date.getHours(), "El usuario ha elegido hace unos minutos desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige datos de hace una hora OJO: La hora utulizada es la actual, deben ser más de la 00:59
	controller.setDocumentIdSelectedValue('listHourAccel', 2);
	graphFunction.paintGraphForDay(0, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[1].split(":")[0]==date.getHours()-1, "El usuario ha elegido hace una hora desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[1].split(":")[0]==date.getHours()-1, "El usuario ha elegido hace una hora desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige datos de hace 2 horas
	controller.setDocumentIdSelectedValue('listHourAccel', 1);
	graphFunction.paintGraphForDay(0, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[1].split(":")[0]==date.getHours()-2, "El usuario ha elegido hace dos horas desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[1].split(":")[0]==date.getHours()-2, "El usuario ha elegido hace dos horas desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige todos los datos
	controller.setDocumentIdSelectedValue('listHourAccel', 0);
	graphFunction.paintGraphForDay(0, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha elegido todas las horas desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(lim_sup==array.length-1, "El usuario todas las horas ha elegido desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige los datos de hoy
	controller.setDocumentIdSelectedValue('listDateAccel', 5);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[0].split("/")[0]==date.getDate(), "El usuario ha elegido hoy desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[0].split("/")[0]==date.getDate(), "El usuario ha elegido hoy desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige los datos de hace un dia
	controller.setDocumentIdSelectedValue('listDateAccel', 4);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[0].split("/")[0]==date.getDate()-1, "El usuario ha elegido hace un dia desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[0].split("/")[0]==date.getDate()-1, "El usuario ha elegido hace un dia desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige datos de hace 2 dias
	controller.setDocumentIdSelectedValue('listDateAccel', 3);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[0].split("/")[0]==date.getDate()-2, "El usuario ha elegido hace un dia desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[0].split("/")[0]==date.getDate()-2, "El usuario ha elegido hace un dia desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige datos de entre 7 y 10 dias (OJO: debemos estar a partir del dia 8 del mes)
	controller.setDocumentIdSelectedValue('listDateAccel', 2);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(array[lim_inf].date.split("-")[0].split("/")[0]==((date.getDate()-10)>0)?(date.getDate()-10):(date.getDate()-10+28), "El usuario ha elegido entre 7 dias desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[0].split("/")[0]==((date.getDate()-8)>0)?(date.getDate()-8):(date.getDate()-8+28), "El usuario ha elegido hasta 10 dias desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige datos de hace mas de 10 dias (OJO: debemos estar a partir del dia 10 del mes)
	controller.setDocumentIdSelectedValue('listDateAccel', 1);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha elegido mas de 10 dias desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(array[lim_sup].date.split("-")[0].split("/")[0]==((date.getDate()-11)>0)?(date.getDate()-11):(date.getDate()-11+28), "El usuario ha elegido mas de 10 dias desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
	//El usuario elige todos los dias
	controller.setDocumentIdSelectedValue('listDateAccel', 0);
	graphFunction.paintGraphForDay(1, array, "Accel");
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha elegido todos los dias desde la fecha "+array[lim_inf].date+" con limite "+lim_inf);
	ok(lim_sup==array.length-1, "El usuario todos los dias ha elegido desde la fecha "+array[lim_sup].date+" con limite "+lim_sup);
});

//Test: Verifica el metodo touchZoomRepaint
QUnit.test( "Test TouchZoomRepaint", function( assert ) {
	var array=new Array(), lim_inf, lim_sup;
	array.push({id: 1, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-02:12:01"}); //Introducimos datos a mano del acelerometro
	array.push({id: 2, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-03:19:03"});
	array.push({id: 3, x: 1.4, y: 4.2, z: 0.1, date: "01/01/2014-07:45:10"});
	array.push({id: 4, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:15:15"});
	array.push({id: 5, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-03:45:12"});
	array.push({id: 6, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:15:01"});
	array.push({id: 7, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:17:19"});
	array.push({id: 8, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-05:20:02"});
	array.push({id: 9, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-07:15:29"});
	array.push({id: 10, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-08:15:17"});
	array.push({id: 11, x: 1.4, y: 4.2, z: 0.1, date: "03/01/2014-09:15:15"});
	array.push({id: 12, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-10:20:12"});
	array.push({id: 13, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-01:15:14"});
	array.push({id: 14, x: 1.4, y: 4.2, z: 0.1, date: "04/01/2014-07:15:12"});
	array.push({id: 15, x: 1.4, y: 4.2, z: 0.1, date: "10/01/2014-11:20:12"});
	array.push({id: 16, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-01:15:11"});
	array.push({id: 17, x: 1.4, y: 4.2, z: 0.1, date: "11/01/2014-07:15:39"});
	array.push({id: 18, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-11:20:57"});
	array.push({id: 19, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-12:20:12"});
	array.push({id: 20, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-14:20:11"});
	array.push({id: 21, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-16:20:41"});
	array.push({id: 22, x: 1.4, y: 4.2, z: 0.1, date: "12/01/2014-18:20:55"});
	array.push({id: 23, x: 1.4, y: 4.2, z: 0.1, date: "19/01/2014-18:22:01"});
	array.push({id: 24, x: 1.4, y: 4.2, z: 0.1, date: "22/01/2014-18:22:11"});
	array.push({id: 25, x: 1.4, y: 4.2, z: 0.1, date: "25/01/2014-18:22:33"});
	array.push({id: 26, x: 1.4, y: 4.2, z: 0.1, date: "28/01/2014-18:22:51"});
	array.push({id: 27, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-01:15:22"});
	array.push({id: 28, x: 1.4, y: 4.2, z: 0.1, date: "04/02/2014-07:15:11"});
	array.push({id: 29, x: 1.4, y: 4.2, z: 0.1, date: "10/02/2014-11:20:11"});
	array.push({id: 30, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-01:15:12"});
	array.push({id: 31, x: 1.4, y: 4.2, z: 0.1, date: "11/02/2014-07:15:11"});
	array.push({id: 32, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-11:20:01"});
	array.push({id: 33, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-12:20:12"});
	array.push({id: 34, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-14:20:22"});
	array.push({id: 35, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-16:20:51"});
	array.push({id: 36, x: 1.4, y: 4.2, z: 0.1, date: "12/02/2014-18:20:12"});
	array.push({id: 37, x: 1.4, y: 4.2, z: 0.1, date: "19/02/2014-18:22:21"});
	array.push({id: 38, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:31:21"});
	array.push({id: 39, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:32:22"});
	array.push({id: 40, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-18:51:11"});
	array.push({id: 40, x: 1.4, y: 4.2, z: 0.1, date: "22/02/2014-19:22:13"});
	//El usuario desplaza la grafica a la derecha
	graphFunction.touchZoomRepaint(2, array, 10, 30); 
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="20", "El usuario ha desplazado el limite inferior de la grafica desde la fecha: "+array[10].date+" hasta la fecha: "+array[lim_inf].date);
	ok(lim_sup==array.length-1, "El usuario ha desplazado el limite superior de la grafica desde la fecha: "+array[30].date+" hasta la fecha: "+array[lim_sup].date);
	//El usuario no puede desplazar la grafica a la derecha
	graphFunction.touchZoomRepaint(2, array, 0, 40);
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario no ha desplazado el limite inferior de la grafica desde la fecha: "+array[0].date+" hasta la fecha: "+array[lim_inf].date);
	ok(lim_sup==array.length-1, "El usuario no ha desplazado el limite superior de la grafica desde la fecha: "+array[40].date+" hasta la fecha: "+array[lim_sup].date);
	//El usuario desplaza la grafica a la izquierda
	graphFunction.touchZoomRepaint(1, array, 10, 30);
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario ha desplazado el limite inferior de la grafica desde la fecha: "+array[10].date+" hasta la fecha: "+array[lim_inf].date);
	ok(lim_sup=="20", "El usuario ha desplazado el limite superior de la grafica desde la fecha: "+array[30].date+" hasta la fecha: "+array[lim_sup].date);
	//El usuario no puede desplazar la grafica a la izquierda
	graphFunction.touchZoomRepaint(1, array, 0, 40);
	lim_inf=graphFunction.getLimInf();
	lim_sup=graphFunction.getLimSup();
	ok(lim_inf=="0", "El usuario no ha desplazado el limite inferior de la grafica desde la fecha: "+array[0].date+" hasta la fecha: "+array[lim_inf].date);
	ok(lim_sup==array.length-1, "El usuario no ha desplazado el limite superior de la grafica desde la fecha: "+array[40].date+" hasta la fecha: "+array[lim_sup].date);
});