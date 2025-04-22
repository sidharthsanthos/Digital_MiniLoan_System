<?php
include('heade.php');
include('conn.php');

$req=file_get_contents('php://input');
$data=json_decode($req);

$username=$data->username;
$phone=$data->phone_number;
$uid=$data->uid;

if($username!==""&&$phone!==""){
    $sql="select * from authentication where username='$username'";
    $res=mysqli_query($conn,$sql);

    if(mysqli_num_rows($res)>0){
        echo "already exists";
    }else{
        $sql1="update authentication set username='$username',phone_number=$phone where user_id=$uid";

        try{
            if(mysqli_query($conn,$sql1)){
                echo "success";
            }else{
                echo "failed";
            }
        }catch(Exception $e){
            echo $e;
        }
    }
}else if($username===""&&$phone!==""){
   
    $sql2="update authentication set phone_number=$phone where user_id=$uid";

    try{
        if(mysqli_query($conn,$sql2)){
            echo "success";
        }else{
            echo "failed";
        }
    }catch(Exception $e){
        echo $e;
    }
}else if($username!==""&&$phone===""){
    $sql="select * from authentication where username='$username'";
    $res=mysqli_query($conn,$sql);

    if(mysqli_num_rows($res)>0){
        echo "already exists";
    }else{
        $sql3="update authentication set username='$username' where user_id=$uid";

        try{
            if(mysqli_query($conn,$sql3)){
                echo "success";
            }else{
                echo "failed";
            }
        }catch(Exception $e){
            echo $e;
        }
    }
}


?>