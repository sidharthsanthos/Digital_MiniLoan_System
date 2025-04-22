<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;

$sql="select * from transaction t,loan l where t.loan_id=l.req_id and (t.borrower_id=$uid or t.investor_id=$uid)";
$res=mysqli_query($conn,$sql);

$tlist=array();

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        $bid=$row['borrower_id'];
        $iid=$row['investor_id'];
        if($uid===$bid){
            $sql2="select username from authentication where user_id=$iid";
            $res2=mysqli_query($conn,$sql2);
            $row2=mysqli_fetch_assoc($res2);
            $combined=array_merge($row,$row2);
            $tlist[]=$combined;
        }
        else if($uid===$iid){
            $sql3="select username from authentication where user_id=$bid";
            $res3=mysqli_query($conn,$sql3);
            $row3=mysqli_fetch_assoc($res3);
            $combined2=array_merge($row,$row3);
            $tlist[]=$combined2;
        }
    }
    echo json_encode($tlist);
}else{
    echo "zero";
}
?>