<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;
$details=array();

$sql="select * from authentication where user_id=$uid";
$res=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($res);
$acctno=$row['acct_no'];


if(mysqli_num_rows($res)>0){
    if($acctno==""){
        $details=$row;
        echo json_encode($details);
    }else{
        $sql2="select * from bank where acct_no=$acctno";
        $res2=mysqli_query($conn,$sql2);
        if(mysqli_num_rows($res2)){
            $row2=mysqli_fetch_assoc($res2);
            $combinedRow=array_merge($row,$row2);
            $details=$combinedRow;
            echo json_encode($details);
        }
    }
    
}else{
    echo "zero";
}
?>