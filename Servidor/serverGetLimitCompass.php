<?php
$id=$_POST["idUser"];
//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
$consulta = "SELECT idCompass, date FROM compass WHERE idUserComp=".$id." and idCompass=(SELECT MAX(idCompass) FROM compass WHERE idUserComp=".$id.")";
$resultado = mysql_query($consulta);
while($fila=mysql_fetch_array($resultado)) {
	$row=array($fila[0], $fila[1]);
	print json_encode($row);
}
mysql_close($conexion);
?>