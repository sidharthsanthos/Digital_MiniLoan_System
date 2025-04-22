<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$user_id=$data->uid;
$loan_id=$data->lid;
$loan_date=$data->ldate;

if($loan_date==""){
    $sql="select * from loan where req_id=$loan_id and user_id=$user_id";
    $res=mysqli_query($conn,$sql);

    if(mysqli_num_rows($res)>0){
        $row=mysqli_fetch_assoc($res);
        $inv_id=$row['investor_id'];
        $amt=$row['Amount'];
        $total=$row['total_amount'];
        $intrest=$row['intrest_rate'];
        $date=$row['date'];
        $status=$row['Status'];

        $sql1="select username from authentication where user_id=$inv_id";
        $res1=mysqli_query($conn,$sql1);
        $row1=mysqli_fetch_assoc($res1);
        $inv_name=$row1['username'];
        echo json_encode(array("mstatus"=>"success","inv_id"=>$inv_id,"inv"=>$inv_name,"amt"=>$amt,"total"=>$total,"intrest"=>$intrest,"date"=>$date,"status"=>$status));
    }else{
        echo json_encode(array("mstatus"=>"failed"));
    }
}else if($loan_id==""){
    try{
    $sql="select * from loan where date='$loan_date' and user_id=$user_id";
    $res=mysqli_query($conn,$sql);

    if(mysqli_num_rows($res)>0){
        $row=mysqli_fetch_assoc($res);
        $lid=$row['req_id'];
        $inv_id=$row['investor_id'];
        $amt=$row['Amount'];
        $total=$row['total_amount'];
        $intrest=$row['intrest_rate'];
        $date=$row['approved_date'];
        $status=$row['Status'];

        if($inv_id!=null&&$date!=null){
            $sql1="select username from authentication where user_id=$inv_id";
            $res1=mysqli_query($conn,$sql1);
            $row1=mysqli_fetch_assoc($res1);
            $inv_name=$row1['username'];
        }else{
            $inv_name=null;
            echo $inv_name;
            $date=null;
        }
        echo json_encode(array("mstatus"=>"success","loan_id"=>$lid,"inv_id"=>$inv_id,"inv"=>$inv_name,"amt"=>$amt,"total"=>$total,"intrest"=>$intrest,"date"=>$date,"status"=>$status));
    }else{
        echo json_encode(array("mstatus"=>"failed"));
    }
}catch(Exception $e){
    echo $e;
}
}
?>