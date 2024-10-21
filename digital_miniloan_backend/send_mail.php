<?php
include('conn.php');
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function debit($uid,$amt,$balance,$email){
    $message="Dear Customer, Your Account having account number $uid has been debited with amount:$amt. Your Final Balance is $balance";
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

            $mail->Subject="ACCOUNT DEBIT ALERT";
            $mail->Body=$message;
            $mail->send();

        }catch(Exception $e){
            echo $e;
        }
}

function credit($uid,$amt,$balance,$email){
    $message="Dear Customer, Your Account having account number $uid has been debited with amount:$amt. Your Final Balance is $balance";
            
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

            $mail->Subject="ACCOUNT DEBIT ALERT";
            $mail->Body=$message;
            $mail->send();

        }catch(Exception $e){
            echo $e;
        }
}
?>