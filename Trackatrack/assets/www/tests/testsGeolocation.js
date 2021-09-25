/*TESTS FUNCIONAMIENTO CLUSTERING GEOLOCATION*/

module( "TESTS GEOLOCATION" );

//Test: Verifica el funcionamiento del método getHourToday
QUnit.test( "Test Clustering", function( assert ) {
	var array = new Array(), matrizClusters, pathClusters, clusters;
	array.push({id: 1, lat: 38.9762119, lon: -39.427306, alt: "", acc: "", spe: "", date: "03/01/2014-03:15"}); //Introducimos datos del acelerometro a mano
	array.push({id: 2, lat: 38.9753419, lon: -40.432116, alt: "", acc: "", spe: "", date: "03/01/2014-03:45"});
	array.push({id: 3, lat: 38.4362119, lon: -39.424243, alt: "", acc: "", spe: "", date: "03/01/2014-05:15"});
	array.push({id: 4, lat: 38.4326119, lon: -39.443214, alt: "", acc: "", spe: "", date: "03/01/2014-05:17"});
	array.push({id: 5, lat: 38.9421312, lon: -39.425321, alt: "", acc: "", spe: "", date: "03/01/2014-05:20"});
	array.push({id: 6, lat: 38.5323122, lon: -39.994231, alt: "", acc: "", spe: "", date: "03/01/2014-07:15"});
	array.push({id: 7, lat: 38.9721219, lon: -39.432121, alt: "", acc: "", spe: "", date: "03/01/2014-08:15"});
	array.push({id: 8, lat: 39.0062119, lon: -38.992131, alt: "", acc: "", spe: "", date: "03/01/2014-09:15"});
	array.push({id: 9, lat: 38.3212429, lon: -39.431121, alt: "", acc: "", spe: "", date: "04/01/2014-10:20"});
	array.push({id: 10, lat: 38.5523449, lon: -39.422111, alt: "", acc: "", spe: "", date: "04/01/2014-01:15"});
	array.push({id: 11, lat: 38.2262119, lon: -39.453424, alt: "", acc: "", spe: "", date: "04/01/2014-07:15"});
	array.push({id: 12, lat: 38.2162119, lon: -39.442123, alt: "", acc: "", spe: "", date: "10/01/2014-11:20"});
	array.push({id: 13, lat: 38.3433219, lon: -39.424212, alt: "", acc: "", spe: "", date: "11/01/2014-01:15"});
	array.push({id: 14, lat: 39.0762119, lon: -39.643543, alt: "", acc: "", spe: "", date: "11/01/2014-07:15"});
	array.push({id: 15, lat: 39.1762119, lon: -39.453223, alt: "", acc: "", spe: "", date: "12/01/2014-11:20"});
	array.push({id: 16, lat: 39.1762119, lon: -39.421432, alt: "", acc: "", spe: "", date: "12/01/2014-12:20"});
	array.push({id: 17, lat: 38.2362119, lon: -39.424352, alt: "", acc: "", spe: "", date: "12/01/2014-14:20"});
	array.push({id: 18, lat: 38.3212119, lon: -39.514324, alt: "", acc: "", spe: "", date: "12/01/2014-16:20"});
	array.push({id: 19, lat: 38.9763211, lon: -40.241211, alt: "", acc: "", spe: "", date: "12/01/2014-18:20"});
	array.push({id: 20, lat: 38.9762313, lon: -39.222112, alt: "", acc: "", spe: "", date: "12/01/2014-18:22"});
	array.push({id: 21, lat: 38.9762122, lon: -39.443253, alt: "", acc: "", spe: "", date: "15/01/2014-01:15"});
	array.push({id: 22, lat: 38.5324243, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-05:15"});
	array.push({id: 23, lat: 38.6123412, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-05:20"});
	array.push({id: 24, lat: 38.9762119, lon: -39.432121, alt: "", acc: "", spe: "", date: "02/02/2014-05:15"});
	array.push({id: 25, lat: 38.5312141, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-07:15"});
	array.push({id: 26, lat: 38.9231321, lon: -39.999843, alt: "", acc: "", spe: "", date: "02/02/2014-11:20"});
	array.push({id: 26, lat: 38.6214321, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-12:20"});
	array.push({id: 27, lat: 38.2312313, lon: -39.112235, alt: "", acc: "", spe: "", date: "02/02/2014-14:20"});
	array.push({id: 28, lat: 38.6754353, lon: -39.538211, alt: "", acc: "", spe: "", date: "02/02/2014-16:20"});
	array.push({id: 29, lat: 39.2362119, lon: -39.598371, alt: "", acc: "", spe: "", date: "02/02/2014-18:20"});
	array.push({id: 30, lat: 38.9431219, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-18:22"});
	array.push({id: 31, lat: 38.3424242, lon: -40.427306, alt: "", acc: "", spe: "", date: "03/02/2014-11:20"});
	array.push({id: 32, lat: 38.6546554, lon: -39.432121, alt: "", acc: "", spe: "", date: "03/02/2014-12:20"});
	array.push({id: 33, lat: 38.6436434, lon: -39.643653, alt: "", acc: "", spe: "", date: "03/02/2014-14:20"});
	array.push({id: 34, lat: 38.7646545, lon: -39.981347, alt: "", acc: "", spe: "", date: "03/02/2014-16:20"});
	array.push({id: 35, lat: 38.7676555, lon: -39.443211, alt: "", acc: "", spe: "", date: "03/02/2014-18:20"});
	array.push({id: 36, lat: 38.9333333, lon: -39.513211, alt: "", acc: "", spe: "", date: "04/02/2014-18:22"});
	array.push({id: 37, lat: 38.6546544, lon: -39.589433, alt: "", acc: "", spe: "", date: "05/02/2014-03:15"});
	array.push({id: 38, lat: 38.5423423, lon: -39.098371, alt: "", acc: "", spe: "", date: "06/02/2014-03:45"});
	array.push({id: 39, lat: 39.0001112, lon: -39.000211, alt: "", acc: "", spe: "", date: "06/02/2014-05:15"});
	array.push({id: 40, lat: 38.4535345, lon: -39.438918, alt: "", acc: "", spe: "", date: "06/02/2014-05:17"});
	array.push({id: 41, lat: 37.9762119, lon: -39.398711, alt: "", acc: "", spe: "", date: "06/02/2014-05:20"});
	array.push({id: 42, lat: 38.3424232, lon: -39.490328, alt: "", acc: "", spe: "", date: "07/02/2014-07:15"});
	array.push({id: 43, lat: 38.5434343, lon: -39.111224, alt: "", acc: "", spe: "", date: "08/02/2014-08:15"});
	array.push({id: 44, lat: 38.5434332, lon: -39.423121, alt: "", acc: "", spe: "", date: "09/02/2014-09:15"});
	array.push({id: 45, lat: 38.9342322, lon: -39.427306, alt: "", acc: "", spe: "", date: "09/02/2014-10:20"});
	array.push({id: 46, lat: 38.9762119, lon: -38.997306, alt: "", acc: "", spe: "", date: "09/02/2014-01:15"});
	array.push({id: 47, lat: 38.9762119, lon: -39.000306, alt: "", acc: "", spe: "", date: "10/02/2014-07:15"});
	array.push({id: 48, lat: 38.9764322, lon: -39.431206, alt: "", acc: "", spe: "", date: "10/02/2014-11:20"});
	array.push({id: 49, lat: 38.9743222, lon: -39.427306, alt: "", acc: "", spe: "", date: "11/02/2014-01:15"});
	array.push({id: 50, lat: 38.9635432, lon: -39.427306, alt: "", acc: "", spe: "", date: "11/02/2014-07:15"});
	array.push({id: 51, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "12/02/2014-11:20"});
	array.push({id: 52, lat: 38.9342322, lon: -39.427306, alt: "", acc: "", spe: "", date: "13/02/2014-10:20"});
	array.push({id: 53, lat: 38.9762119, lon: -38.997306, alt: "", acc: "", spe: "", date: "14/02/2014-01:15"});
	array.push({id: 54, lat: 38.9762119, lon: -39.000306, alt: "", acc: "", spe: "", date: "14/02/2014-07:15"});
	array.push({id: 55, lat: 38.9764322, lon: -39.431206, alt: "", acc: "", spe: "", date: "15/02/2014-11:20"});
	array.push({id: 56, lat: 38.9743222, lon: -39.427306, alt: "", acc: "", spe: "", date: "15/02/2014-01:15"});
	array.push({id: 57, lat: 38.9635432, lon: -39.427306, alt: "", acc: "", spe: "", date: "16/02/2014-07:15"});
	array.push({id: 58, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "17/02/2014-11:20"});
	array.push({id: 59, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "18/02/2014-11:20"});
	graphGeolocation.setGeolocation(array);
	graphGeolocation.setLim_inf(0);
	graphGeolocation.setLim_sup(array.length-1);
	clusters=2;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<4; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	matrizClusters=graphGeolocation.getMatrizClusters(), pathClusters=graphGeolocation.getPathClusters();
	ok(matrizClusters.length=="2", "Numero de clusters 2 con "+array.length);
	ok(pathClusters.length=="2", "Numero de paths 2 dividido en "+pathClusters[0].length+" y "+pathClusters[1].length);
	clusters=3;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<4; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	matrizClusters=graphGeolocation.getMatrizClusters(), pathClusters=graphGeolocation.getPathClusters();
	ok(matrizClusters.length=="3", "Numero de clusters 3 con "+array.length);
	ok(pathClusters.length=="3", "Numero de paths 3 dividido en "+pathClusters[0].length+", "+pathClusters[1].length+" y "+pathClusters[2].length);
	clusters=4;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<4; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	matrizClusters=graphGeolocation.getMatrizClusters(), pathClusters=graphGeolocation.getPathClusters();
	ok(matrizClusters.length=="4", "Numero de clusters 4 con "+array.length);
	ok(pathClusters.length=="4", "Numero de paths 4 dividido en "+pathClusters[0].length+", "+pathClusters[1].length+", "+pathClusters[2].length+" y "+pathClusters[3].length);
	clusters=5;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<4; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	matrizClusters=graphGeolocation.getMatrizClusters(), pathClusters=graphGeolocation.getPathClusters();
	ok(matrizClusters.length=="5", "Numero de clusters 5 con "+array.length);
	ok(pathClusters.length=="5", "Numero de paths 5 dividido en "+pathClusters[0].length+", "+pathClusters[1].length+", "+pathClusters[2].length+", "+pathClusters[3].length+" y "+pathClusters[4].length);
});

//Test: Verifica el funcionamiento del método getMostFrequent
QUnit.test( "Test GetMostFrecuent", function( assert ) {
	var array = new Array(), clusters, arrayIndex=new Array(), index;
	array.push({id: 1, lat: 38.9762119, lon: -39.427306, alt: "", acc: "", spe: "", date: "03/01/2014-03:15"}); //Introducimos datos del acelerometro a mano
	array.push({id: 2, lat: 38.9753419, lon: -40.432116, alt: "", acc: "", spe: "", date: "03/01/2014-03:45"});
	array.push({id: 3, lat: 38.4362119, lon: -39.424243, alt: "", acc: "", spe: "", date: "03/01/2014-05:15"});
	array.push({id: 4, lat: 38.4326119, lon: -39.443214, alt: "", acc: "", spe: "", date: "03/01/2014-05:17"});
	array.push({id: 5, lat: 38.9421312, lon: -39.425321, alt: "", acc: "", spe: "", date: "03/01/2014-05:20"});
	array.push({id: 6, lat: 38.5323122, lon: -39.994231, alt: "", acc: "", spe: "", date: "03/01/2014-07:15"});
	array.push({id: 7, lat: 38.9721219, lon: -39.432121, alt: "", acc: "", spe: "", date: "03/01/2014-08:15"});
	array.push({id: 8, lat: 39.0062119, lon: -38.992131, alt: "", acc: "", spe: "", date: "03/01/2014-09:15"});
	array.push({id: 9, lat: 38.3212429, lon: -39.431121, alt: "", acc: "", spe: "", date: "04/01/2014-10:20"});
	array.push({id: 10, lat: 38.5523449, lon: -39.422111, alt: "", acc: "", spe: "", date: "04/01/2014-01:15"});
	array.push({id: 11, lat: 38.2262119, lon: -39.453424, alt: "", acc: "", spe: "", date: "04/01/2014-07:15"});
	array.push({id: 12, lat: 38.2162119, lon: -39.442123, alt: "", acc: "", spe: "", date: "10/01/2014-11:20"});
	array.push({id: 13, lat: 38.3433219, lon: -39.424212, alt: "", acc: "", spe: "", date: "11/01/2014-01:15"});
	array.push({id: 14, lat: 39.0762119, lon: -39.643543, alt: "", acc: "", spe: "", date: "11/01/2014-07:15"});
	array.push({id: 15, lat: 39.1762119, lon: -39.453223, alt: "", acc: "", spe: "", date: "12/01/2014-11:20"});
	array.push({id: 16, lat: 39.1762119, lon: -39.421432, alt: "", acc: "", spe: "", date: "12/01/2014-12:20"});
	array.push({id: 17, lat: 38.2362119, lon: -39.424352, alt: "", acc: "", spe: "", date: "12/01/2014-14:20"});
	array.push({id: 18, lat: 38.3212119, lon: -39.514324, alt: "", acc: "", spe: "", date: "12/01/2014-16:20"});
	array.push({id: 19, lat: 38.9763211, lon: -40.241211, alt: "", acc: "", spe: "", date: "12/01/2014-18:20"});
	array.push({id: 20, lat: 38.9762313, lon: -39.222112, alt: "", acc: "", spe: "", date: "12/01/2014-18:22"});
	array.push({id: 21, lat: 38.9762122, lon: -39.443253, alt: "", acc: "", spe: "", date: "15/01/2014-01:15"});
	array.push({id: 22, lat: 38.5324243, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-05:15"});
	array.push({id: 23, lat: 38.6123412, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-05:20"});
	array.push({id: 24, lat: 38.9762119, lon: -39.432121, alt: "", acc: "", spe: "", date: "02/02/2014-05:15"});
	array.push({id: 25, lat: 38.5312141, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-07:15"});
	array.push({id: 26, lat: 38.9231321, lon: -39.999843, alt: "", acc: "", spe: "", date: "02/02/2014-11:20"});
	array.push({id: 26, lat: 38.6214321, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-12:20"});
	array.push({id: 27, lat: 38.2312313, lon: -39.112235, alt: "", acc: "", spe: "", date: "02/02/2014-14:20"});
	array.push({id: 28, lat: 38.6754353, lon: -39.538211, alt: "", acc: "", spe: "", date: "02/02/2014-16:20"});
	array.push({id: 29, lat: 39.2362119, lon: -39.598371, alt: "", acc: "", spe: "", date: "02/02/2014-18:20"});
	array.push({id: 30, lat: 38.9431219, lon: -39.427306, alt: "", acc: "", spe: "", date: "02/02/2014-18:22"});
	array.push({id: 31, lat: 38.3424242, lon: -40.427306, alt: "", acc: "", spe: "", date: "03/02/2014-11:20"});
	array.push({id: 32, lat: 38.6546554, lon: -39.432121, alt: "", acc: "", spe: "", date: "03/02/2014-12:20"});
	array.push({id: 33, lat: 38.6436434, lon: -39.643653, alt: "", acc: "", spe: "", date: "03/02/2014-14:20"});
	array.push({id: 34, lat: 38.7646545, lon: -39.981347, alt: "", acc: "", spe: "", date: "03/02/2014-16:20"});
	array.push({id: 35, lat: 38.7676555, lon: -39.443211, alt: "", acc: "", spe: "", date: "03/02/2014-18:20"});
	array.push({id: 36, lat: 38.9333333, lon: -39.513211, alt: "", acc: "", spe: "", date: "04/02/2014-18:22"});
	array.push({id: 37, lat: 38.6546544, lon: -39.589433, alt: "", acc: "", spe: "", date: "05/02/2014-03:15"});
	array.push({id: 38, lat: 38.5423423, lon: -39.098371, alt: "", acc: "", spe: "", date: "06/02/2014-03:45"});
	array.push({id: 39, lat: 39.0001112, lon: -39.000211, alt: "", acc: "", spe: "", date: "06/02/2014-05:15"});
	array.push({id: 40, lat: 38.4535345, lon: -39.438918, alt: "", acc: "", spe: "", date: "06/02/2014-05:17"});
	array.push({id: 41, lat: 37.9762119, lon: -39.398711, alt: "", acc: "", spe: "", date: "06/02/2014-05:20"});
	array.push({id: 42, lat: 38.3424232, lon: -39.490328, alt: "", acc: "", spe: "", date: "07/02/2014-07:15"});
	array.push({id: 43, lat: 38.5434343, lon: -39.111224, alt: "", acc: "", spe: "", date: "08/02/2014-08:15"});
	array.push({id: 44, lat: 38.5434332, lon: -39.423121, alt: "", acc: "", spe: "", date: "09/02/2014-09:15"});
	array.push({id: 45, lat: 38.9342322, lon: -39.427306, alt: "", acc: "", spe: "", date: "09/02/2014-10:20"});
	array.push({id: 46, lat: 38.9762119, lon: -38.997306, alt: "", acc: "", spe: "", date: "09/02/2014-01:15"});
	array.push({id: 47, lat: 38.9762119, lon: -39.000306, alt: "", acc: "", spe: "", date: "10/02/2014-07:15"});
	array.push({id: 48, lat: 38.9764322, lon: -39.431206, alt: "", acc: "", spe: "", date: "10/02/2014-11:20"});
	array.push({id: 49, lat: 38.9743222, lon: -39.427306, alt: "", acc: "", spe: "", date: "11/02/2014-01:15"});
	array.push({id: 50, lat: 38.9635432, lon: -39.427306, alt: "", acc: "", spe: "", date: "11/02/2014-07:15"});
	array.push({id: 51, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "12/02/2014-11:20"});
	array.push({id: 52, lat: 38.9342322, lon: -39.427306, alt: "", acc: "", spe: "", date: "13/02/2014-10:20"});
	array.push({id: 53, lat: 38.9762119, lon: -38.997306, alt: "", acc: "", spe: "", date: "14/02/2014-01:15"});
	array.push({id: 54, lat: 38.9762119, lon: -39.000306, alt: "", acc: "", spe: "", date: "14/02/2014-07:15"});
	array.push({id: 55, lat: 38.9764322, lon: -39.431206, alt: "", acc: "", spe: "", date: "15/02/2014-11:20"});
	array.push({id: 56, lat: 38.9743222, lon: -39.427306, alt: "", acc: "", spe: "", date: "15/02/2014-01:15"});
	array.push({id: 57, lat: 38.9635432, lon: -39.427306, alt: "", acc: "", spe: "", date: "16/02/2014-07:15"});
	array.push({id: 58, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "17/02/2014-11:20"});
	array.push({id: 59, lat: 38.9711111, lon: -39.422316, alt: "", acc: "", spe: "", date: "18/02/2014-11:20"});
	graphGeolocation.setGeolocation(array);
	graphGeolocation.setLim_inf(0);
	graphGeolocation.setLim_sup(array.length-1);
	clusters=5;
	graphGeolocation.initMClusters(clusters);
	for(var i=0; i<4; i++) { //Uso del algoritmo K-means
		graphGeolocation.calcularMDistancias(clusters);
		graphGeolocation.calcularMPertenencias(clusters);
		graphGeolocation.calcularMCentroides(clusters);
	}
	arrayIndex.push(-1);
	expect(15);
	for(var i=0; i<clusters; i++) { //Comprobamos que clusters tiene mas agrupacion de puntos
		index=graphGeolocation.getMostFrequent(arrayIndex);
		for(var j=0; j<arrayIndex.length; j++) {
				notEqual(index, arrayIndex[j], "No deberia haber dos indices iguales "+index+"!="+arrayIndex[j]);
		}
		arrayIndex.push(index);
	}
});

//Test: Verifica el funcionamiento del método getMetres
QUnit.test( "Test GetMetres", function( assert ) {
	var lat1, lat2, lng1, lng2, distance;
	lat1=38.9762777; lng1=-39.426309; lat2=38.976303; lng2=-39.427321;
	distance=apiGeolocation.getMetres(lat1, lng1, lat2, lng2);
	ok(distance=="87.62423404226054", "Distancia entre punto 1 ("+lat1+", "+lng1+") y el punto 2 ("+lat2+", "+lng2+") es "+distance+" metros");
	lat1=38.9762777; lng1=-39.426309; lat2=38.9762777; lng2=-39.426309;
	distance=apiGeolocation.getMetres(lat1, lng1, lat2, lng2);
	ok(distance=="0", "Distancia entre punto 1 ("+lat1+", "+lng1+") y el punto 2 ("+lat2+", "+lng2+") es "+distance+" metros");
	lat1=38.9762117; lng1=-39,55322; lat2=39,976303; lng2=-39427321;
	distance=apiGeolocation.getMetres(lat1, lng1, lat2, lng2);
	ok(distance=="6826064.364340752", "Distancia entre punto 1 ("+lat1+", "+lng1+") y el punto 2 ("+lat2+", "+lng2+") es "+distance+" metros");
});
