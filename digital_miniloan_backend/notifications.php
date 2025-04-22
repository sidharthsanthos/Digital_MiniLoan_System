<?php
include 'heade.php';
include 'conn.php';

$request=file_get_contents("php://input");
$data=json_decode($request);

$user_id=$data->uid;

$sql="select * from notifications where uid=$user_id";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    $nots=array();
    while($row=mysqli_fetch_assoc($res)){
        $nots[]=$row;
    }
    echo json_encode($nots);
}else{
    echo json_encode(array("status"=>"failed"));
}

?>