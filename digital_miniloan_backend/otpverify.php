<?php
include('heade.php');
include('conn.php');

$req= file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->user_id;
$email=$data->email;
$otp=$data->otp;

$sql="select otp,acct_no from bank where email='$email'";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    $row=mysqli_fetch_assoc($res);
    $fetched_otp=$row['otp'];
    $acct=$row['acct_no'];

    if($fetched_otp==$otp){
        $sql1="update bank set user_id=$uid where acct_no=$acct";
        $sql2="update authentication set acct_no=$acct where user_id=$uid";
        try{
            if(mysqli_query($conn,$sql1)&&mysqli_query($conn,$sql2)){
                echo json_encode(array("status"=>"success"));
            }
        }catch(Exception $e){
            echo json_encode(array("status"=>$e));
        }
    }
    else{
        echo json_encode(array("status"=>"failed"));
    }
}
?>