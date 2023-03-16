<?php
require_once (__DIR__."/../controller/Controller.php");

$result = $cards->getAll();

//devolvemos el resultado de la BD como JSON
echo json_encode($result);



?>