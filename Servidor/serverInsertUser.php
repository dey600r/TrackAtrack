<?php
$id=$_POST["id"];
$name =$_POST["name"];
$age=$_POST["age"];
$occupation=$_POST["occupation"];
$device=$_POST["device"];
$plataform=$_POST["plataform"];
$version=$_POST["version"];

//$conexion = mysql_connect("localhost","root","");
$conexion=mysql_connect("mysql.hostinger.es", "u879899490_david", "yeeGdY6LMS");
//mysql_select_db("monitoringactivitiesdb", $conexion);
mysql_select_db("u879899490_track", $conexion);
$consulta = "INSERT INTO users (idUser, name, age, occupation, device, plataform, version) VALUE (".$id.",'".$name."','".$age."','".$occupation."','".$device."','".$plataform."','".$version."');";
$resultado = mysql_query($consulta);
mysql_close($conexion);
?> 