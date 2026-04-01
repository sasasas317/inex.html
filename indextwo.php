<?php
include_once "Route.php";

$uri = explode('?', $_SERVER['REQUEST_URI']);
$route = $uri[0];

Route::getRoute($route);
?>