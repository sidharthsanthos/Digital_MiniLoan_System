<?php
include('heade.php');
include('conn.php');
include('send_mail.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$loan_id=$data->loan_id;
$amt=$data->amount;
$borrower=$data->uid;
$investor=$data->inv_id;
$repay=$data->repay;
$t_type="repayment";

$sql="insert into transaction(loan_id,investor_id,borrower_id,amt,type) values($loan_id,$investor,$borrower,$amt,'$t_type')";
try{
if(mysqli_query($conn,$sql)){
    $new_amt=$amt-$repay;
    $sql1="select repaid_amount from loan where req_id=$loan_id";
    $res=mysqli_query($conn,$sql1);
    $row=mysqli_fetch_assoc($res);
    $repaid=$row['repaid_amount'];

    $new_repaid=$repaid+$repay;

    //if new_amt is 0 

    if($new_amt===0){
        $sql2="update loan set total_amount=$new_amt,repaid_amount=$new_repaid,Status='repaid' where req_id=$loan_id";
    }else{
        $sql2="update loan set total_amount=$new_amt,repaid_amount=$new_repaid where req_id=$loan_id";
    }
    
    if(mysqli_query($conn,$sql2)){
        $sql3="select * from bank where user_id=$borrower";
        $sql4="select * from bank where user_id=$investor";

        $res1=mysqli_query($conn,$sql3);
        $row1=mysqli_fetch_assoc($res1);

        $res2=mysqli_query($conn,$sql4);
        $row2=mysqli_fetch_assoc($res2);

        $balance1=$row1['balance'];
        $acct_no1=$row1['acct_no'];
        $semail1=$row1['email'];

        $balance2=$row2['balance'];
        $acct_no2=$row2['acct_no'];
        $semail2=$row2['email'];

        $new_balance1=$balance1-$repay;
        $new_balance2=$balance2+$repay;

        $sql5="update bank set balance=$new_balance1 where user_id=$borrower";
        $sql6="update bank set balance=$new_balance2 where user_id=$investor";
        //add a feature to update loan status to repaid

        if(mysqli_query($conn,$sql5) && mysqli_query($conn,$sql6)){
            debit($acct_no1,$repay,$new_balance1,$semail1);
            credit($acct_no2,$repay,$new_balance2,$semail2);
            echo json_encode(array("status"=>"success"));
        }
        
    }else{
        echo json_encode(array("status"=>"failed"));
    }
}}
catch(Exception $e){
    echo $e;
}
?>