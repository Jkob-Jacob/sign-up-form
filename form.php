<?php

include "includes\autoloader.inc.php";


$url = "https://webhook.site/de7c12a7-e006-467e-afbe-ca9b0a275e5c";

 
if($_SERVER["REQUEST_METHOD"] === "POST") {
        (new Postman(new FormDataProcessor(),$url))->post();
}

header('Location: index.html');
?>