<?php
include('heade.php');
include('conn.php');
include('loan_setting.php');
$intrest_rate=System_intrest_rate;
$credit=minimum_credit_score;

$req=file_get_contents("php://input");
$data=json_decode($req);

$new_intrest=$data->intrest;
$new_credit=$data->credit;

$new_intrest=(int)$new_intrest;
$new_credit=(int)$new_credit;

$updated_content = "<?php\n";
$updated_content .= "define('System_intrest_rate', $new_intrest);\n";
$updated_content .= "define('minimum_credit_score', $new_credit);\n?>";

if($new_intrest!==0){
    $message="Digital Miniloan Admin updated intrest rate to $new_intrest";
    if(file_put_contents('loan_setting.php', $updated_content) !== false){
    $sql="select user_id from authentication";
    $res=mysqli_query($conn,$sql);
    if(mysqli_num_rows($res)>0){
        $all_notifications_sent=true;
        while($row=mysqli_fetch_assoc($res)){
            $uid=$row['user_id'];
            $sql2="insert into notifications(uid,message) values($uid,'$message')";
            $res2=mysqli_query($conn,$sql2);
            if(!$res2){
                $all_notifications_sent=false;
            }
        }
        if($all_notifications_sent){
            echo json_encode(["status"=>"success"]);
        }else{
            echo json_encode(["status"=>"failed"]);
        }
    }
    }else{
    echo json_encode(["status"=>"failed"]); 
    }
}
?>