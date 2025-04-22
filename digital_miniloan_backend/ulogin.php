<?php
include('conn.php');
include('heade.php');

$req= file_get_contents("php://input");
$data=json_decode($req);

$uname=$data->uname;
$pass=$data->pass;

$sql="select * from authentication where username='$uname'";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    $row=mysqli_fetch_assoc($res);
    $retrieved_user=$row['username'];
    $retrieved_pass=$row['password'];
    $id=$row['user_id'];
    $ut=$row['user_type'];

    if($retrieved_user==$uname && $retrieved_pass==$pass){
        echo json_encode(array("status"=>"success","user_id"=>$id,"user_type"=>$ut));
    }
    else{
        echo "failed";
    }
}
else{
    echo "records doesnt exist";
}
?>