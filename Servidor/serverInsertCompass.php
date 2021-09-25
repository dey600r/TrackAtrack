<?php
$comp=json_decode($_POST["json"]);

//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
foreach ($comp as $obj) {
	$idUser=$obj->idUser;
	$idComp=$obj->idComp;
	$degrees =$obj->degrees;
	$date=$obj->date;
	$consulta = "INSERT INTO compass (idCompass, idUserComp, degrees, date) VALUE (".$idComp.",".$idUser.",".$degrees.",'".$date."');";
	$resultado = mysql_query($consulta);
}
mysql_close($conexion);
print json_encode("ok");
?>