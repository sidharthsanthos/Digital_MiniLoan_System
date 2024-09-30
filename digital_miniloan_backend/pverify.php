<?php
include('heade.php');
include('conn.php');
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;

$req= file_get_contents("php://input");
$data=json_decode($req);

$phno=$data->phno;
$uid=$data->uid;

$sql="select acct_no,phone_number,email,name from bank where phone_number=$phno";
$res=mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    $min=1000;
    $max=9999;
    $otp=rand($min,$max);

    $row=mysqli_fetch_assoc($res);
    $email=$row['email'];
    $acct=$row['acct_no'];
    $name=$row['name'];
    $sql2="update bank set otp=$otp where acct_no=$acct";

    try{
        if(mysqli_query($conn,$sql2)){
            require 'PHPMailer/src/Exception.php';
            require 'PHPMailer/src/PHPMailer.php';
            require 'PHPMailer/src/SMTP.php';
            $mail = new PHPMailer(true);                              
        try {
            $mail->isSMTP(); // using SMTP protocol                                     
            $mail->Host = 'smtp.gmail.com'; // SMTP host as gmail 
            $mail->SMTPAuth = true;  // enable smtp authentication                             
            $mail->Username = 'sidharthsanthosh121@gmail.com';  // sender gmail host              
            $mail->Password = 'qxbj kbsb tyxm gfzh'; // sender gmail host password                          
            $mail->SMTPSecure = 'tls';  // for encrypted connection                           
            $mail->Port = 587;   // port for SMTP     

            $mail->setFrom('sidharthsanthosh121@gmail.com', "Sender"); // sender's email and name
            $mail->addAddress($email,"Receiver");

            $mail->Subject="Your OTP for Linking Bank Account to Mini Loan Application";
            $mail->Body="Dear".$name.",

            We hope this message finds you well!
            
            To link your bank account to your Mini Loan Application, please use the One-Time Password (OTP) provided below:
            
            Your OTP: *".$otp."*
            
            To complete the linking process, follow these simple steps:
            
            Log in to your Mini Loan Application account.
            Go to the 'Link Bank Account' section.
            Input the OTP above to confirm the linking.
            
            Please note that this OTP is valid for a limited time only, so ensure to use it as soon as possible.
            
            If you have any questions or need assistance, don’t hesitate to contact our support team.
            
            Thank you for choosing our services!
            
            Best regards,
            Digital Miniloan 
            digitalminloan@oml.org";
            $mail->send();

            echo json_encode(array("status"=>"success","email"=>$email));  
        }catch(Exception $e){
            echo $e;
        }
    }
}catch(Exception $e){
    echo $e;
}       
}
else{
    echo json_encode(array("status"=>"no records"));
}
?>