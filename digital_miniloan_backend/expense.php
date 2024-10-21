<?php
include('conn.php');
include('heade.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$uid=$data->user_id;

$sql="select * from transaction where borrower_id=$uid";
$res=mysqli_query($conn,$sql);

$lendings=array();
while($row=mysqli_fetch_assoc($res)){
    $lendings[]=$row;
}

$sql2="select * from transaction where investor_id=$uid";
$res2=mysqli_query($conn,$sql2);

$investments=array();
while($row2=mysqli_fetch_assoc($res2)){
    $investments[]=$row2;
}

$response=array("lendings"=>$lendings,"investments"=>$investments);

echo json_encode($response);
?>