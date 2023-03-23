<?php

    require_once(__DIR__."../functions.php");
    require_once (__DIR__."/../controller/Controller.php");

    //Verificamos que se hayan enviado las variables 'name' y 'last_name' a trabés del formulario
    if(isset($_POST['name']) && isset($_POST['lastName']))
    {
        $name           = sanitizeString($_POST['name']);
        $last_name      = sanitizeString($_POST['lastName']);

        $userSend['name']       = "";
        $userSend['lastName']   = "";
        $userSend['error']      = "";

        if ($name == "" ||$last_name == "")
        {
            //Error. No se ha insertado todos los campos
            $userSend['error'] = "Not all the fields were entered";
        }
        
        else
        {
            //Buscamos el elemento de la tabla USERS
            $resultArray = $user->getAllBy2Columns("name", $name, "last_name", $last_name);

            if($resultArray == null)
            {
                //Usuario no encontrado en la base de datos
                $yserSend['error'] = "Invalid loggin attempt";
            }
            else
            {
                //Si el usuario esta en la base de datos lo guardamos
                $userSend['name']           =$name;
                $userSend['lastName']       =$last_name;
            }


        }

        //Devolvemos el usuario 
        echo json_encode($userSend);
    }

    else
    {
        die("Forbidden");
    }


?>