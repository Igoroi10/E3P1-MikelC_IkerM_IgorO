<?php

require_once "ModelBase.php";

class User extends ModelBase
{
    function __construct()
    {
         //Inicializamos el nombre de la tabla
         $this->table_name  = 'users';
         
        //Llamamos al constructor de la base ModelBase
        parent::__construct();
        
       
    }
}

?>