<?php
include('heade.php');
include('conn.php');

$sql="select * from loan where status='approved'";
$res=mysqli_query($conn,$sql);
$flag=false;

if(mysqli_num_rows($res)>0){
    while($row=mysqli_fetch_assoc($res)){
        $amt=$row['total_amount'];
        $intrest=$row['intrest_rate'];
        $last=$row['last_updated_date'];
        $due=$row['due_date'];
        $rid=$row['req_id'];

        $today=date('Y-m-d');

        if($last!=null){
            $amt_int=($amt*$intrest)/100;
            $total=$amt+$amt_int;

            $due_date=new DateTime($due);
            $due_date->modify('+2 days');
            $new_due=$due_date->format('Y-m-d');

            $sql1="update loan set last_updated_date='$today',total_amount=$total,due_date='$new_due' where req_id=$rid";
            try{
                if(!mysqli_query($conn,$sql1)){
                    $flag=true;
                }
            }catch(Exception $e){
                echo $e;
            }
        }
    }
}

if($flag){
    echo "Interest did not update";
}else{
    echo "Success";
}

?>