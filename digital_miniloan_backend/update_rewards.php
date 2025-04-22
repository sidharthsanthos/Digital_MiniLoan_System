<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$uid=$data->uid;
$rwon=$data->rwon;
$lpoints=$data->lpoints;
$reward=$data->reward;
$balance=$data->balance;

if($reward===""){
    $sql="update rewards set loyalty_points=$lpoints,num_of_rewards=$rwon where user_id=$uid";
    try{
        if(mysqli_query($conn,$sql)){
            echo "success";
        }else{
            echo "failed";
        }
    }catch(Exception $e){
        echo $e;
    }
}else{
    $new_rwon=$rwon+1;
    $sql2="update rewards set loyalty_points=$lpoints,num_of_rewards=$new_rwon where user_id=$uid";
    try{
        if(mysqli_query($conn,$sql2)){
            $new_balance=$balance+$reward;
            $sql3="update bank set balance=$new_balance where user_id=$uid";
            try{
                if(mysqli_query($conn,$sql3)){
                    echo "success";
                }else{
                    echo "failed";
                }
            }catch(Exception $e){
                echo $e;
            }
        }
    }catch(Exception $e){
        echo $e;
    }
}

?>