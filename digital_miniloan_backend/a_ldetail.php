<?php
include('conn.php');
include('heade.php');

$sql="select count(case when status='pending' then 1 end) as pending_count,
        count(case when status='approved' then 1 end) as approved_count,
        count(case when status='repaid' then 1 end) as repaid_count from loan";

$res=mysqli_query($conn,$sql);
if(mysqli_num_rows($res)>0){
    $row=mysqli_fetch_assoc($res);
    $pending=$row['pending_count'];
    $approved=$row['approved_count'];
    $repaid=$row['repaid_count'];
}else{
    $pending=0;
    $approved=0;
    $repaid=0;
}

echo json_encode(array("pending"=>$pending,"approved"=>$approved,"repaid"=>$repaid));
?>