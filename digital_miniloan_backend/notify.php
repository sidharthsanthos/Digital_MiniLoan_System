<?php
include('heade.php');
include('conn.php');
include('send_alerts.php');

$req = file_get_contents("php://input");
$data = json_decode($req);

$user_id=$data->uid;
$req_id=$data->req_id;
$bid=$data->bor_id;
$bname=$data->bname;
$email=$data->email;
$amt=$data->amt;
$total=$data->total;
$due=$data->due;
$approved=$data->approved;

$intrest_amount=$total-$amt;

$sql="select username from authentication where user_id=$user_id";
$res=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($res);
$uname=$row['username'];

$message="You have a pending loan repayment of ₹$total due on $due to $uname. Please ensure timely repayment to avoid penalties.";
$sql1="insert into notifications(uid,message) values($bid,'$message')";

$email_message="Dear $bname,

I hope this message finds you well. This is a friendly reminder regarding the loan of ₹$amt you borrowed on $approved through our system. As per the agreed terms, the repayment, including interest of ₹$intrest_amount, is due on $due.

We kindly request you to ensure that the total amount of ₹$total is repaid on or before the due date. Timely repayment helps maintain the trust and reliability of our platform and ensures smooth operations for all users.

If you have already made the repayment or have any concerns about the payment process, please feel free to reach out. We're here to assist you.

Thank you for your prompt attention to this matter.

Best regards,
DIGITAL MINILOAN";

try{
    if(mysqli_query($conn,$sql1)){
        send_alerts($email,$email_message);
        echo "success";
    }
    else{
        echo "failed";
    }
}catch(Exception $e){
    echo $e;
}
?>