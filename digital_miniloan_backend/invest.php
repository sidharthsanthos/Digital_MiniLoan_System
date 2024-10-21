<?php
include('heade.php');
include('conn.php');
include('send_mail.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$user_id=$data->user_id;
$req_user_id=$data->r_uid;
$loan_id=$data->loan_id;
$amt=$data->amt;
$t_type="investment";
$status="approved";

date_default_timezone_set('Asia/Kolkata');
$date=date('Y-m-d');
$time=date('H:i:s');
//fetching the due-date here itself
$datetime=new DateTime($date);
$datetime->modify('+10 days');
$due_date=$datetime->format("Y-m-d");

$sql="select balance,email,acct_no from bank where user_id=$user_id";
$sql4="select balance,email,acct_no from bank where user_id=$req_user_id";

//below code for retrieving the balance of investing user
$res=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($res);

//below code for retrieving the balance of requesting user 
$res2=mysqli_query($conn,$sql4);
$row2=mysqli_fetch_assoc($res2);

//sender details for mailing
$balance=$row['balance'];
$sender_acct_no=$row['acct_no'];
$sender_email=$row['email'];

//receiver details for mailing
$balance2=$row2['balance'];
$receiver_acct_no=$row2['acct_no'];
$receiver_email=$row2['email'];

if($balance>$amt){
    $sql2="insert into transaction(loan_id,investor_id,borrower_id,amount,type) values($loan_id,$user_id,$req_user_id,$amt,'$t_type')";
    try{
        if(mysqli_query($conn,$sql2)){
            // echo json_encode(array("status"=>"success"));
            $sql3="update loan set investor_id=$user_id,total_amount=$amt,status='$status',approved_date='$date',due_date='$due_date' where req_id=$loan_id";
            try{
                if(mysqli_query($conn,$sql3)){
                    $new_balance=$balance-$amt;
                    $new_balance2=$balance2+$amt;

                    $sql5="update bank set balance=$new_balance where user_id=$user_id";
                    $sql6="update bank set balance=$new_balance2 where user_id=$req_user_id";

                    if(mysqli_query($conn,$sql5) && mysqli_query($conn,$sql6)){
                        debit($sender_acct_no,$amt,$new_balance,$sender_email);
                        credit($receiver_acct_no,$amt,$new_balance2,$receiver_email);
                        echo json_encode(array("status"=>"success","balance"=>$new_balance));
                    }
                }else{
                    echo json_encode(array("status"=>"updation failed"));   
                }
            }
            catch(Exception $e){
                echo json_encode(array("status"=>$e));
            }
        }else{
            echo json_encode(array("status"=>"transaction failed"));
        }
    }
    catch(Exception $e){
        echo json_encode(array("status"=>$e));
    }
}else{
    echo json_encode(array("status"=>"insufficient"));
}

?>