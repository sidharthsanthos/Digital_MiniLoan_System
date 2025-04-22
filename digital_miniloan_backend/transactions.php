<?php
include('heade.php');
include('conn.php');

$req=file_get_contents("php://input");
$data=json_decode($req);

$action=$data->action;

if($action===""){
    $sql="select * from transaction";
    $res=mysqli_query($conn,$sql);

    $transactions=array();

    if(mysqli_num_rows($res)>0){
        while($row=mysqli_fetch_assoc($res)){
            $user_id=$row['borrower_id'];
            $inv_id=$row['investor_id'];

            if(!empty($user_id)&&!empty($inv_id)){
                $sql1="select username as bname from authentication where user_id=$user_id";
                $sql2="select username as iname from authentication where user_id=$inv_id";

                $res1=mysqli_query($conn,$sql1);
                $res2=mysqli_query($conn,$sql2);

                if(mysqli_num_rows($res1)>0 && mysqli_num_rows($res2)>0){
                    $row1=mysqli_fetch_assoc($res1);
                    $row2=mysqli_fetch_assoc($res2);

                    $combinedRow=array_merge($row,$row1,$row2);

                    $transactions[]=$combinedRow;
                }
            }
        }
        echo json_encode($transactions);
    }else{
        echo "zero";
    }
}else if($action==="investment"){
    $sql="select * from transaction where type='investment'";
    $res=mysqli_query($conn,$sql);

    $transactions=array();

    if(mysqli_num_rows($res)>0){
        while($row=mysqli_fetch_assoc($res)){
            $user_id=$row['borrower_id'];
            $inv_id=$row['investor_id'];

            if(!empty($user_id)&&!empty($inv_id)){
                $sql1="select username as bname from authentication where user_id=$user_id";
                $sql2="select username as iname from authentication where user_id=$inv_id";

                $res1=mysqli_query($conn,$sql1);
                $res2=mysqli_query($conn,$sql2);

                if(mysqli_num_rows($res1)>0 && mysqli_num_rows($res2)>0){
                    $row1=mysqli_fetch_assoc($res1);
                    $row2=mysqli_fetch_assoc($res2);

                    $combinedRow=array_merge($row,$row1,$row2);

                    $transactions[]=$combinedRow;
                }
            }
        }
        echo json_encode($transactions);
    }else{
        echo "zero";
    }
}else if($action==='repayment'){

    $sql="select * from transaction where type='repayment'";
    $res=mysqli_query($conn,$sql);

    $transactions=array();

    if(mysqli_num_rows($res)>0){
        while($row=mysqli_fetch_assoc($res)){
            $user_id=$row['borrower_id'];
            $inv_id=$row['investor_id'];

            if(!empty($user_id)&&!empty($inv_id)){
                $sql1="select username as bname from authentication where user_id=$user_id";
                $sql2="select username as iname from authentication where user_id=$inv_id";

                $res1=mysqli_query($conn,$sql1);
                $res2=mysqli_query($conn,$sql2);

                if(mysqli_num_rows($res1)>0 && mysqli_num_rows($res2)>0){
                    $row1=mysqli_fetch_assoc($res1);
                    $row2=mysqli_fetch_assoc($res2);

                    $combinedRow=array_merge($row,$row1,$row2);

                    $transactions[]=$combinedRow;
                }
            }
        }
        echo json_encode($transactions);
    }else{
        echo "zero";
    }
}


?>