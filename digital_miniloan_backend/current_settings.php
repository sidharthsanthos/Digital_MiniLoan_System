<?php
include('heade.php');
include('loan_setting.php');

$intrest=System_intrest_rate;
$credit=minimum_credit_score;

echo json_encode(["irate"=>$intrest,"credit"=>$credit]);