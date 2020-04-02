<?php

spl_autoload_register('autoLoader');

function autoLoader($className) {
    include_once "classes/$className.class.php";
}

?>