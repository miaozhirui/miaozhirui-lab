<?php
$callback = $_GET['callback'];
$array = array("name"=>"miaozhirui", "age"=>100);
echo $callback. '('. json_encode($array) .')';
