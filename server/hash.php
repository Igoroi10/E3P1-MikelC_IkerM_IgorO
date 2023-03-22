<?php
echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT). "<br>";
echo password_hash("qwerty123", PASSWORD_DEFAULT). "<br>";
echo password_hash("poiuylk", PASSWORD_DEFAULT). "<br>";
echo password_hash("zxcvbnas", PASSWORD_DEFAULT). "<br>";
echo password_hash("asdfghjkl", PASSWORD_DEFAULT). "<br>";
echo password_hash("pqowieur", PASSWORD_DEFAULT). "<br>";
echo password_hash("laksjdhfg", PASSWORD_DEFAULT). "<br>";
echo password_hash("mznxbcv", PASSWORD_DEFAULT). "<br>";
echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT)."<br>";
"<br>";

$hash = password_hash("rasmuslerdorf", PASSWORD_DEFAULT);
if (password_verify('rasmuslerdorf', $hash)) {
    echo '¡La contraseña es válida!';
} else {
    echo 'La contraseña no es válida.';
}
?>