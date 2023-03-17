<?php

/* ModelBase.php Será nuestra clase padre gestora de modelos, de la cual heredarán todos los modelos.

Definira los Siguientes atribuos:

$table_name: Nombre de la tabla asociada al modelo 
$conexion: OBjeto de la clase conexion. Se usara para interactuar con la BD */

require_once (__DIR__."/../db/Conexion.php");

class ModelBase extends Conexion 
{
    protected $conexion;
    protected $table_name;

    function __construct()
    {
        $this->conexion = parent::getInstance();
    }


    // OBtiene todos los elementos de la tabla
    function getAll()
    {
        $query = $this->selectDB($this->table_name);
        
        // echo "Table name: " . $this->table_name;
        $result = $this->conexion->query($query);
        
        // Creamos el array asociativo para devolver los datos
        $array = $this->createArray($result);
   

        $result->close();
        return $array;
    }


    // Obtiene todos los elementos de la tabla,l filtrados por un valor de una columna
    function getLinks()
    {
        $query = $this->selectDB2();
        $result = $this->conexion->query($query);

        // Creamos el array asociativo para devolverlos datos
        $array= $this->createArray($result);

        $result->close();
        
        return $array;
    }


    // Función que añade un elemento nuevo a la tabla 
    function addNew($array) 
    {
        $query = $this->insertDB($this->table_name, $array);
        // echo $query; - Solucion del Error

        $result = $this->conexion->query($query);
        // echo $query;
        return $result;
    }



    protected function createArray($data)
    {

        // Creamos el array asociativo para devolver los datos
        while($row = $data->fetch_array(MYSQLI_ASSOC))
        {
            // Añadimos la siguiente fila
            $array[] = $row;
        }

        return $array;
    }
    


    // Devuelve Un Query de la forma "SELECT * FROM table WHERE authors = 'Jane Austen' "
    // parametros:
    // $tale: NOmbre de la tabla (FROM)
    // $fcolumns: Columnas a extraer {SELECT}. Si no se pasa este parametro se entiende que se extraen todas (*)
    // $conditions: condicion de búsqueda (WHERE). Si no se pasa este parametro se entiende que no hay Condicion de busqueda
    
    protected function selectDB($table, $columns = "*", $name = "", $value = "")
    {
        // echo "entra";
        
        $query = "SELECT $columns FROM $table";
        if( $name != "" && $value != "")
            $query .= " WHERE $name = '$value'";

            // echo $query;
            return $query;
    }

    protected function selectDB2()
    {
        //echo("entra en select 2");
        
        $query = "SELECT URL FROM LINKS";

            // echo $query;
            return $query;
    }

    // Devuelve un Query de la forma "INSERT INTO table (author, title, category) VALUES ('JRR tolkien', 'Lord of the rings', 'Fiction')"
    // PArametros:
    // $table: Nombre d ela tabla 
    // $array: Array asociativo con los pares (name, value) correspondientes l nombre de la columna y valor

    protected function insertDB($table, $array)
    {

        foreach ($array as $name => $value)
        {
            $insert_name[] = $name;
            $insert_value[] = $value;
        }

        $query = "INSERT INTO $table(";

        $num_elem = count($insert_name);
        FOR($i = 0; $i < $num_elem; ++$i)
        {
            $query .= "$insert_name[$i]";
            if($i != $num_elem - 1)
                $query .= ", ";
            else
                $query .= ") ";

        }

        $query .= "VALUES(";
        for ($i = 0; $i < $num_elem; ++$i)
        {
            
            $query .= "'$insert_value[$i]'";
            if($i != $num_elem -1)
                $query .= ", ";
            
            else
                $query .= ") "; 
        }

        return $query;
    }

}

?>