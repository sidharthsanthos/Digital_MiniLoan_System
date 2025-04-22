<?php
include('heade.php');
include('conn.php');
include('send_mail.php');
include('loan_setting.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$user_id=$data->user_id;
$req_user_id=$data->r_uid;
$loan_id=$data->loan_id;
$amt=$data->amt;
$t_type="investment";
$status="approved";
$intrest=System_intrest_rate;

date_default_timezone_set('Asia/Kolkata');
$date=date('Y-m-d');
$time=date('H:i:s');
//fetching the due-date here itself
$datetime=new DateTime($date);
$datetime->modify('+10 days');
$due_date=$datetime->format("Y-m-d");

$sql="select balance,email,acct_no,name from bank where user_id=$user_id";
$sql4="select balance,email,acct_no,name from bank where user_id=$req_user_id";

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
$sender_name=$row['name'];

//receiver details for mailing
$balance2=$row2['balance'];
$receiver_acct_no=$row2['acct_no'];
$receiver_email=$row2['email'];
$receiver_name=$row2['name'];


//messages for notification table
$message="You sent Rs.$amt to $receiver_name";
$message1="You received Rs.$amt from $sender_name";


if($balance>$amt){
    $sql2="insert into transaction(loan_id,investor_id,borrower_id,amt,type) values($loan_id,$user_id,$req_user_id,$amt,'$t_type')";
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

                    
                    $sql7="insert into notifications(uid,message) values($user_id,'$message')";
                    $sql8="insert into notifications(uid,message) values($req_user_id,'$message1')";

                    $sql9="insert into investment(user_id,loan_id,amount,intest_rate,date) values($user_id,$loan_id,$amt,$intrest,'$date')";
                    
                    try{
                        if(mysqli_query($conn,$sql5) && mysqli_query($conn,$sql6) && mysqli_query($conn,$sql7) && mysqli_query($conn,$sql8) && mysqli_query($conn,$sql9)){
                            debit($sender_acct_no,$amt,$new_balance,$sender_email);
                            credit($receiver_acct_no,$amt,$new_balance2,$receiver_email);
                            echo json_encode(array("status"=>"success","balance"=>$new_balance));
                        }else{
                            echo "error";
                        }
                    }catch(Exception $e){
                        echo $e;
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