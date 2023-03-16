<?php

require_once "ModelBase.php";

class Cards extends ModelBase
{
    function __construct()
    {
         //Inicializamos el nombre de la tabla
         $this->table_name  = 'karta';
         $this->table_name2 = 'karta_urritasuna';
         
         $this->table_name3 = 'links';
         
        //Llamamos al constructor de la base ModelBase
        parent::__construct();
        
       
    }
}

?>