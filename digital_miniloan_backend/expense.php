<?php
include('conn.php');
include('heade.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$uid=$data->user_id;

$sql="select * from transaction t,authentication a  where a.user_id=t.borrower_id and borrower_id=$uid";
$res=mysqli_query($conn,$sql);

$lendings=array();
while($row=mysqli_fetch_assoc($res)){
    $inv_id=$row['investor_id'];
    $sql1="select username from authentication where user_id=$inv_id";
    $res3=mysqli_query($conn,$sql1);
    $row3=mysqli_fetch_assoc($res3);
    $lendings[]=array_merge($row,$row3);
}

$sql2="select * from transaction t,authentication a where t.investor_id=a.user_id and investor_id=$uid";
$res2=mysqli_query($conn,$sql2);

$investments=array();
while($row2=mysqli_fetch_assoc($res2)){
    $bor_id=$row2['borrower_id'];
    $sql4="select username from authentication where user_id=$bor_id";
    $res4=mysqli_query($conn,$sql4);
    $row4=mysqli_fetch_assoc($res4);
    $investments[]=array_merge($row2,$row4);
}

$response=array("lendings"=>$lendings,"investments"=>$investments);

echo json_encode($response);
?>