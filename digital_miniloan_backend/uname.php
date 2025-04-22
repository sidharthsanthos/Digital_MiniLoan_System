<?php
include('heade.php');
include('conn.php');

$req= file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;

$sql="select username from authentication where user_id=$uid";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    $row=mysqli_fetch_assoc($res);
    $name=$row['username'];
    echo json_encode(array("status"=>"success","uname"=>$name));
}
else{
    echo "failed";
}
?>