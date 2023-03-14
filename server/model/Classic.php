<?php

require_once "ModelBase.php";

class Classic extends ModelBase
{
    function __construct()
    {
        //Llamamos al constructor de la base ModelBase
        parent::__construct();
        
        //Inicializamos el nombre de la tabla
        $this->table_name = 'satelliteinvaders';
    }
}

?>