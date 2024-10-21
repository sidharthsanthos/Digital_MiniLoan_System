<?php
include('heade.php');
include('conn.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$action=$data->action;
$uid=$data->uid;


function checkBal($uid){
    include('conn.php');
    $sql="select balance from bank where user_id=$uid";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    $balance=$row['balance'];
    return $balance;
}

if($action){
    $bal=checkBal($uid);
    if($bal==null){
        echo json_encode(array("balance"=>"not fetched"));    
    }else{
    echo json_encode(array("balance"=>$bal));
    }
}