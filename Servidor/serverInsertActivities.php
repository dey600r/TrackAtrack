<?php
$apps=json_decode($_POST["json"]);
//$data=array($idUser, $idComp, $degrees, $date);

//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
foreach ($apps as $obj) {
	$idUser=$obj->idUser;
	$idApp=$obj->idApp;
	$name =$obj->name;
	$state=$obj->state;
	$date=$obj->date;
	$consulta = "INSERT INTO activities (idActivities, idUserApp, name, state, date) VALUE (".$idApp.",".$idUser.",'".$name."','".$state."','".$date."');";
	$resultado = mysql_query($consulta);
}
mysql_close($conexion);
//$consulta = "SELECT * FROM users;";
//$resultado = mysql_query($consulta);
//while($fila=mysql_fetch_array($resultado)) {
//	print json_encode($fila);
//}
//print json_encode($data)
print json_encode("ok");
?>