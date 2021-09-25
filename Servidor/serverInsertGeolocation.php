<?php
$geo=json_decode($_POST["json"]);

//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
foreach ($geo as $obj) {
	$idUser=$obj->idUser;
	$idGeo=$obj->idGeo;
	$latitude =$obj->latitude;
	$longitude =$obj->longitude;
	$altitude =$obj->altitude;
	$accuracy =$obj->accuracy;
	$speed =$obj->speed;
	$date=$obj->date;
	$consulta = "INSERT INTO geolocation (idGeolocation, idUserGeo, latitude, longitude, altitude, accuracy, speed, date) VALUE (".$idGeo.",".$idUser.",".$latitude.",".$longitude.",".$altitude.",".$accuracy.",".$speed.",'".$date."');";
	$resultado = mysql_query($consulta);
}
mysql_close($conexion);
print json_encode("ok");
?>