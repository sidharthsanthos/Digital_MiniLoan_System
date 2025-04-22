<?php
include('heade.php');
include('conn.php');

$sql="select * from investment i,loan l where i.loan_id=l.req_id";
$res=mysqli_query($conn,$sql);

$ilist=array();

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        $bor_id=$row['user_id'];
        if(!empty($bor_id)){
            $sql1="select username,phone_number from authentication where user_id=$bor_id";
            $res1=mysqli_query($conn,$sql1);

            $sql2="select email from bank where user_id=$bor_id";
            $res2=mysqli_query($conn,$sql2);

            if(mysqli_num_rows($res1)>0 && mysqli_num_rows($res2)>0){
                $row1=mysqli_fetch_assoc($res1);
                $row2=mysqli_fetch_assoc($res2);

                $combinedRow=array_merge($row,$row1,$row2);
                $ilist[]=$combinedRow;
            }
        }
    }
    echo json_encode($ilist);
}else{
    echo "zero";
}
?>