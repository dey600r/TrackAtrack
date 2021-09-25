<?php
$id=$_POST["idUser"];
//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
$consulta = "SELECT idActivities, date FROM activities WHERE idUserApp=".$id." and idActivities=(SELECT MAX(idActivities) FROM activities WHERE idUserApp=".$id.")";
$resultado = mysql_query($consulta);
while($fila=mysql_fetch_array($resultado)) {
	$row=array($fila[0], $fila[1]);
	print json_encode($row);
}
mysql_close($conexion);
?>