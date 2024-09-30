<?php
include('heade.php');
include('conn.php');

$req= file_get_contents("php://input");
$data= json_decode($req);

$uname=$data->uname;
$pass=$data->pass;
$phno=$data->phno;
$utype="user";

$sql1="select * from authentication where username='$uname'";
$res=mysqli_query($conn,$sql1);

if(mysqli_num_rows($res)>0){
    echo "username already exists";
}else{    
    $sql="insert into authentication(username,password,phone_number,user_type) values('$uname','$pass',$phno,'$utype')";

    try{
        if(mysqli_query($conn,$sql)){
            echo "success";
        }
        else{
            echo "failed";
        }
    }
    catch(Exception $e){
        echo $e;
    }    
}
?>