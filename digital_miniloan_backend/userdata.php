<?php
include('heade.php');
include('conn.php');

$request=file_get_contents("php://input");
$data=json_decode($request);

$sql="select * from authentication where user_type='user'";
$res=mysqli_query($conn,$sql);

$users=array();

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        $users[]=$row;
    }
    echo json_encode($users);
}else{
    echo "zero";
}
?>