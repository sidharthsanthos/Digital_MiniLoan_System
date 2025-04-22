<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;
$npass=$data->npass;

$sql="update authentication set password='$npass' where user_id=$uid";
try{
    if(mysqli_query($conn,$sql)){
        echo "success";
    }else{
        echo "failed";
    }
}catch(Exception $e){
    echo $e;
}
?>