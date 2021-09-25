<?php
$accel=json_decode($_POST["json"]);

//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);

foreach ($accel as $obj) {
	$idUser=$obj->idUser;
	$idAccel=$obj->idAccel;
	$x =$obj->x;
	$y=$obj->y;
	$z=$obj->z;
	$date=$obj->date;
	$consulta = "INSERT INTO accelerometer (idAccelerometer, idUser, x, y, z, date) VALUE (".$idAccel.",".$idUser.",'".$x."','".$y."','".$z."','".$date."');";
	$resultado = mysql_query($consulta);
}
mysql_close($conexion);
print json_encode("ok");
?>