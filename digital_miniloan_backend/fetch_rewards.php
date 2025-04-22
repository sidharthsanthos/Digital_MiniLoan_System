<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;

$sql="select * from rewards where user_id=$uid";
$res=mysqli_query($conn,$sql);

$rdetail=array();

if(mysqli_num_rows($res)>0){
    $row=mysqli_fetch_assoc($res);
    $rdetail=$row;
    echo json_encode($rdetail);
}
else{
    echo "zero";
}
?>