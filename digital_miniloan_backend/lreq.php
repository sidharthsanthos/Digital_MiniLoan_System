<?php
include 'heade.php';
include 'conn.php';

$req= file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;
$amt=$data->amount;
$status="pending";

$sql="insert into loan(user_id,amount,status) values($uid,$amt,'$status')";