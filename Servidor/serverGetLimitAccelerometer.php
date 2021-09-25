<?php
$id=$_POST["idUser"];
//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
$consulta = "SELECT idAccelerometer, date FROM accelerometer WHERE idUser=".$id." and idAccelerometer=(SELECT MAX(idAccelerometer) FROM accelerometer WHERE idUser=".$id.")";
$resultado = mysql_query($consulta);
while($fila=mysql_fetch_array($resultado)) {
	$row=array($fila[0], $fila[1]);
	print json_encode($row);
}
mysql_close($conexion);
?>