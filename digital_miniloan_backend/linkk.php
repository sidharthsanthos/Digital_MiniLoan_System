<?php
include('heade.php');
include('conn.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$uid=$data->uid;

$sql="select acct_no from authentication where user_id=$uid";
$res=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($res);
$acct=$row['acct_no'];

if($acct==""){
    echo "failed";
}else{
    echo "success";
}
?>