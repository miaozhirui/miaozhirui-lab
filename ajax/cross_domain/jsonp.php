<?php
$callback = $_GET['callback'];
$data = array('name'=>'miaozhirui', 'age'=>23, 'add'=>111);

echo "$callback(".json_encode($data).")";
// add(111)
