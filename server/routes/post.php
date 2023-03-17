<?php

require_once (__DIR__."/../controller/Controller.php");

//TEST OIST ROUTE QUITAR OISTERIORMENTE
// $_POST['izena']    = 'JSF';
// $_POST['score']     = '290';

if(isset($_POST['izena']) && isset($_POST['score']))
{
    $newClassic['izena']   = $_POST['izena'];
    $newClassic['score']    = $_POST['score'];

    //Añadimos el nuevo objeto a la BD
    $returnValue = $classic->addNew($newClassic);

    if($returnValue == FALSE)
    {
        echo "Error en la introduccion de nuevo elemento en la BD";
    }
    else
    {
        //Devolvemos el resultado añadido de la BD como JSON
        echo json_encode($newClassic);
    }
}
else
{
    die("Forbidden");
}
?>